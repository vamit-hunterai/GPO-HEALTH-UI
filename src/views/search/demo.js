import React, { useState, useCallback, useRef } from 'react';
import { CButton} from '@coreui/react'
import Paper from '@material-ui/core/Paper';
import CIcon from '@coreui/icons-react';
import { EditingState, SortingState, IntegratedSorting ,
    PagingState,
    SearchState,
    IntegratedFiltering,
    IntegratedPaging,} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  Toolbar,
  SearchPanel,
  ExportPanel,
  VirtualTable
} from '@devexpress/dx-react-grid-material-ui';
import { GridExporter } from '@devexpress/dx-react-grid-export';
import saveAs from 'file-saver';
import fields from 'src/data/fields';
import searchService from '../../services/searchService';
let zoomArr = [0.5,0.75,0.85,0.9,1];
let marArr = [180,140,80,50,0];
let indexofArr = 4;

function zoomIn(){
    var element = document.querySelector('[class*="TableContainer-root"]>div');
    //console.log(element);
    if(element){
      let value = element.getBoundingClientRect().width / element.offsetWidth;
      if(indexofArr < zoomArr.length-1){
        indexofArr += 1;
        value = zoomArr[indexofArr]?zoomArr[indexofArr]:value;
        element.style['transform'] = `scale(${value})`;
        element.style['margin-left'] = "-"+marArr[indexofArr]+"px";
        
      }
    }
    
  }
  
function zoomOut(){
    var element = document.querySelector('[class*="TableContainer-root"]>div');
    //console.log(element);
    if(element){
      let value = element.getBoundingClientRect().width / element.offsetWidth;
      if(indexofArr >0){
        indexofArr -= 1;
        value = zoomArr[indexofArr]?zoomArr[indexofArr]:value;
        element.style['margin-left'] = "-"+marArr[indexofArr]+"px";
        element.style['transform'] = `scale(${value})`
    }
    }
}

const onSave = (workbook) => {
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'SearchGrid.xlsx');
    });
  };

  
const getRowId = row => row.id;

const updateSearch = (data)=>{
    searchService.updateSearch(data).then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
    });
}

export default ({params}) => {
  console.log(params);

  const [columns] = useState(fields[params.segment+'Items']?fields[params.segment+'Items']:fields.resourcesItems);
  const [rows, setRows] = useState(params.data?params.data:[]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [pageSizes] = useState([5, 10, 15]);
  const [editingStateColumnExtensions] = useState([
    { columnName: 'id', editingEnabled: false },
    { columnName: 'sow', editingEnabled: false },
  ]);
  const [sorting, setSorting] = useState([{ columnName: 'sDate', direction: 'asc' }]);

  const commitChanges = ({ added, changed, deleted }) => {

    let changedRows;
    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = rows.filter(row => !deletedSet.has(row.id));
    }
    
    var tmpChanged = [],_id;
    if(changed){
        try{
            _id = Object.keys(changed)[0];
            tmpChanged.push({
                id: _id,
                values: changed[_id]
               })
        }catch(e){
            console.log(e)
        }
       
    }
    updateSearch({type:params.segment, changed:tmpChanged, deleted:deleted?deleted.join(','):""});
      
    setRows(changedRows);
  };
  const exporterRef = useRef(null);
  const startExport = useCallback(() => {
    exporterRef.current.exportGrid();
  }, [exporterRef]);


  return (
      <>
      <div style={{position:'relative'}}>
        <div className="zoom-controls">
        <CButton onClick={zoomIn}> <CIcon name="cil-plus"/></CButton>
        <CButton onClick={zoomOut}> <CIcon name="cil-minus"/></CButton>
        </div>     
             
    <Paper>
      <Grid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
      >
        <PagingState
        currentPage={currentPage}
        onCurrentPageChange={setCurrentPage}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
        />
        <IntegratedPaging />

        <SortingState
          sorting={sorting}
          onSortingChange={setSorting}
        />
        <EditingState
          onCommitChanges={commitChanges}
          defaultEditingRowIds={[0]}
          columnExtensions={editingStateColumnExtensions}
        />
        <IntegratedSorting />
        <SearchState defaultValue="" />
        <IntegratedFiltering />
        <Table />
        <VirtualTable />
        <TableHeaderRow showSortingControls />
        
        {/* <TableEditRow /> */}
        <Toolbar />
        <ExportPanel startExport={startExport} />
        <SearchPanel />
        {/* <TableEditColumn
          showAddCommand
          showEditCommand
          showDeleteCommand
        /> */}
        <GridExporter
            ref={exporterRef}
            rows={rows}
            columns={columns}
            onSave={onSave}
        />
        <PagingPanel
          pageSizes={pageSizes}
        />
      </Grid>
    </Paper>
    </div>
    </>
  );
};
