/**
 * Author: Lakshman Veti
 * Type: Component
 * Objective: To render searh results grid
 * Associated Route/Usage: /#search
*/


import React, { Component } from 'react';

import {Table} from 'antd';
// import Pagination from './Pagination';
import fields from 'src/data/fields';
import {connect} from 'react-redux';
import "../../antd.css";

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

class TableData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: fields[props.params.segment+'Items']||[],
      list: props.params.list,
      pageOfItems:[],
      paginationItems: [...Array(props.params.count).keys()].map(i => ({ id: (i+1), name: 'Item ' + (i+1) })),
      count:props.params.count,
      page:props.params.page
    };
    this.onChangePage = this.onChangePage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    console.log(props.params.segment, fields[props.params.segment+'Items'])
  }

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
  }

  handleChange(pagination, filters, sorters){
    if(this.props && this.props?.onTableChange){
      this.props.onTableChange(pagination, filters, sorters);
    }
  }

  render() {
    const {fields, list, count, page} = this.state;
    return (
      <>
        <Table 
        dataSource={list} 
        columns={fields} 
        onChange={this.handleChange} 
        pagination={{
          total:count,
          current:page
        }}
        />
      
      {/* <CDataTable
          items={list}
          fields={fields}
          // columnFilter
          tableFilter
          //footer
          itemsPerPageSelect
          itemsPerPage={10}
          hover
          striped
          sorter
          pagination
          scopedSlots = {{
            'show_details':
              (item, index)=>{
                return (
                  <td className="py-2 action">
                    <CButton
                      color="primary"
                      size="sm"
                      onClick={()=>{this.searchSelect()}}>
                    </CButton>
                   
                  </td>
                  )
              }
          }}
      /> */}
      {/* <Pagination items={this.state.paginationItems} onChangePage={this.onChangePage} /> */}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    page: state.page
  }
}

export default connect(mapStateToProps)(TableData);