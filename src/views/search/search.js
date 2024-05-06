/**
 * Author: Lakshman Veti
 * Type: Component
 * Objective: To render search page
 * Associated Route/Usage: /#search
*/

import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import commonService from '../../services/commonService';
import searchService from '../../services/searchService';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import SowAutoSuggest from './SowAutoSuggest';
import TableData from "./TableData";
import Loader from "../../containers/Loader";
import Autocomplete from "./AutoComplete";
// import authService from '../../services/authService';
// import {connect} from 'react-redux';
//const userObj = authService.getUser();

const zoomArr = [0.5,0.75,0.85,0.9,1];
const marArr = [{left:280, top:140},{left:140, top:70},{left:80, top:40},{left:50, top:28},{left:0, top:0}];
let indexofArr = 4;

const animatedComponents = makeAnimated();

class Search extends React.Component {
  constructor(props) {
    super(props);
    //default state object for both view and create
    let backDate = new Date();
    backDate.setDate(backDate.getDate() - 90);
    
    this.state = {
      list:[],
      sowList:[],
      fields: {},
      search:{
        page:1,
        startDate: commonService.getFormattedDate(backDate,'yyyymmdd'),
        endDate: commonService.getFormattedDate(new Date(),'yyyymmdd'),
        invoice:"",
        po:"",
        supplier:""
      },
      roles:[],
      suppliers:[],
      roleSelectedOption:null,
      searchValue:"",
      segment:"",
      type:"",
      loading: false,
      toggleFileListModal:false,
      toggleSearchResults:false,
      error:{},
      noresults: false,
      count: 0,
      selectedSowObj:{},
      toast:{
        show:false,
        message:"",
        status: "Success"
      }
    };
    this.searchSelect = this.searchSelect.bind(this);
    this.toggleFileModal = this.toggleFileModal.bind(this);
    this.search = this.search.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onTableChange = this.onTableChange.bind(this);
    this.supplierSelect = this.supplierSelect.bind(this);
    //this.getSearchedFile(props);
    //originalObj = commonService.clone(this.state); 
}

componentDidMount(){  
  this.getSearchedFile(this.props);
  indexofArr = 4;
  // searchService.getRoles().then((data)=>{
  //   this.setState({}, () => this.setState({ roles:data}));
  // });
  // searchService.getSupplies().then((data)=>{
  //   this.setState({}, () => this.setState({ suppliers:data}));
  // });
  // searchService.getLocations().then((data)=>{
  //   this.setState({}, () => this.setState({ locations:data}));
  // });
  // searchService.getTechStack().then((data)=>{
  //   this.setState({}, () => this.setState({ techStack:data}));
  // });
  // searchService.getFullList('sow').then((data)=>{
  //   this.setState({}, () => this.setState({ sowOptionList:data}));
  // });
  // searchService.getEngagements().then((data)=>{
  //   this.setState({}, () => this.setState({ contractType:data}));
  // });
  // searchService.getFullList('invoice').then((data)=>{
  //   this.setState({}, () => this.setState({ invoiceOptionList:data}));
  // });
    // this.getMasterList({type:'po-list'});
  // console.log(this.props?.segment)
  if(this.props?.segment){
    this.state.segment = this.props?.segment;
    this.state.search = {};
    this.handleSubmit(null);
  }
}

toggleFileModal(){
  this.state.toggleFileListModal = !this.state.toggleFileListModal;
 // this.forceUpdate();
 
}

handleChange (option,obj){
  if(obj.name.indexOf('.')!= -1){
    var name = obj.name.split('.');
    if(name.length>0) {
      //set the Selected Option object in sate
      this.state[name[1]+'SelectedOption'] = option;
      this.state[name[0]][name[1]] = option?option.value:''
  }else{
    //if form element is direct object in state; ex: state.name, state.value
      this.state.search[obj.name] = option?option.value:'';
      this.state[obj.name+'SelectedOption'] = option;
  }
  this.forceUpdate();
  }else{
    if(obj.name == 'selectSow'){
      window.location = "/#/sow/"+(option?option.value:'');
    }
  }
}

/**
   * event method on component reload
*/
 componentWillReceiveProps(nextProps) {
  //this.setState({toggleFileListModal: false});
  this.clearSearch();
  this.getSearchedFile(nextProps);
}


getMasterList(params){
  searchService.search(params).then(res => {
    console.log(res);
  });
}

search(targetKey, obj){
  targetKey = targetKey?targetKey:'list';
  this.setState({}, () => this.setState({[targetKey]:[], filters:obj, loading:true}));
  //this.props.dispatch({type: 'SEARCH_RESULTS', res:[], filters:obj });
  searchService.count(obj).then(count => {
    //console.log(count)
     if(count && count.target_cnt){
      this.state.count = count.target_cnt;
      // console.log(count[0].count)
      this.setState({count:count.target_cnt});
     }
     else if(count && count.recordset && count.recordset.length>0){
      this.state.count = count.recordset[0].total;
      // console.log(count[0].count)
      this.setState({count:count.recordset[0].total});
     }
     

  });
  
  searchService.search(obj).then(res => {
    if(res.length == 0){
      this.setState({}, () => this.setState({noresults:true, loading:false}));
    }else{
      if(this.state.searchSelectedValue){
          for(var i in res){
            res[i].sow = this.state.searchSelectedValue;
          }
      }
      //console.log(res)
      this.setState({[targetKey]:res, noresults:false});
      //this.props.dispatch({type: 'set', showHeader: true})
     // this.props.dispatch({type: 'SEARCH_RESULTS', res, filters:obj });
    } 
    setTimeout(()=>{
      this.setState({loading:false});
    },2000);
  })
  .catch(err => {
    console.log(err);
    this.setState({loading:false,noresults:false});
  });
}

clearSearch(){
  var tmpData = commonService.clone(this.state.search);
  for (let [key, value] of Object.entries(this.state.search)){
    tmpData[key] = '';
  }
  this.setState({}, () => this.setState({ 
    search:tmpData, noresults:false, list:[], 
    roleSelectedOption:null,
    supplierSelectedOption:null,
    techStackSelectedOption:null,
    contractTypeSelectedOption:null,
    locationSelectedOption:null
  }));
  indexofArr = 4;
}

getSearchedFile(obj){
  try{
    const queryPage = obj.location.pathname.match(/SOW([0-9]+)/g);
   
    const querySegment = obj.location.pathname.match(/segment-([a-z]+)/gi);
    //console.log(querySegment)
    if(querySegment && querySegment.length>0){
      var segmentObj = querySegment[0].split('-');
      //console.log(segmentObj)
      if(segmentObj && segmentObj.length>0){
        this.state.segment = segmentObj[1];
        //this.setSegmentList(this.state.segment);
        //this.forceUpdate();
      }
        
    }
    if(queryPage && queryPage.length>0){
      var searchObj = commonService.getOptionFromList(this.state.sowList, queryPage[0],'obj','no'); 
      this.searchSelect({value:searchObj});
    }
  }catch(e){}
  
}

setSearchLabel(){
  var keyword = "Search";
  if(this.state.segment){
    keyword+=" <span class='liteblue'>"+this.state.segment+"</span>";
  } 
  if(this.state.searchSelectedValue){
    keyword = keyword.replace('Search','Searching');
    keyword+=" in <span class='liteblue'>"+this.state.searchSelectedValue+"</span>";
  }
  return keyword;
}

searchSelect(item){
   //this.state.searchSelectedValue = item?item.value.no:"";
   //this.setState({}, () => this.setState({ searchSelectedValue:item?item.value.NumberSOW:""}));
   //this.forceUpdate();
   window.location = "/#/sow/"+item.value.NumberSOW
   //console.log(item)
}


onChange(e) {
  var { name, value } = e.target;
   //set the form element value to state.data object
  var tmpData = commonService.clone(this.state.search);
  tmpData[name]=value;
  this.setState({}, () => this.setState({ search:tmpData}));
}

handleSubmit(e){
  if(e)e.preventDefault();
  this.setState({loading:true});
  var tmpData = commonService.clone(this.state.search);
  for (let [key, value] of Object.entries(tmpData)){
    if(!tmpData[key])
        delete tmpData[key];
  }
  tmpData.type = this.state.segment;

  let selectedCustomer = localStorage.getItem('selectedCustomer');

  tmpData.customer = ((selectedCustomer)?JSON.parse(selectedCustomer).value:null);
  console.log(tmpData);
  this.search('list', tmpData);
}

zoomIn(){
  var element = document.querySelector('[class*="search-grid-div"] .position-relative >.table-striped');
  if(element){
    let value = element.getBoundingClientRect().width / element.offsetWidth;
    if(indexofArr < zoomArr.length-1){
      indexofArr += 1;
      value = zoomArr[indexofArr]?zoomArr[indexofArr]:value;
      element.style['transform'] = `scale(${value})`;
      element.style['margin-left'] = "-"+marArr[indexofArr].left+"px";
      element.style['margin-top'] = "-"+marArr[indexofArr].top+"px";
    }
  }
  
}

zoomOut(){
  var element = document.querySelector('[class*="search-grid-div"] .position-relative >.table-striped');
  if(element){
    let value = element.getBoundingClientRect().width / element.offsetWidth;
    if(indexofArr >0){
      indexofArr -= 1;
      value = zoomArr[indexofArr]?zoomArr[indexofArr]:value;
      element.style['margin-left'] = "-"+marArr[indexofArr].left+"px";
      element.style['margin-top'] = "-"+marArr[indexofArr].top+"px";
      element.style['transform'] = `scale(${value})`
  }
  }
}

onTableChange(pagination, filters, sorters){
  if(pagination);
    this.state.search.page = pagination.current;
  this.handleSubmit(null);
}

supplierSelect(obj){
  this.state.search.supplier = obj.VENDOR_NAME;
}

render() {
  const {roleSelectedOption, supplierSelectedOption, loading, list, count, page, segment} = this.state;
  //console.log(this.props.searchList);
  return (
    <>
      <Loader params={{loading}}/>
      {/* <Toast params={{show:toast.show, message:toast.message, status:toast.status }}/> */}
      <CRow className="search" style={{width: "100%"}}>
      <CCol xs="12" sm="12">
          <CCard>
          
          {/* <CCardHeader>
          <div className="action-header">
              <h5 dangerouslySetInnerHTML={{ __html: this.setSearchLabel()}} style={{display:'inline'}}/>
              {this.state.sowList && 
                  <div className="card-header-actions" style={{width:150, fontWeight:'normal'}}>
                    <SowAutoSuggest params={{slug:'sow'}}/>
                  </div>
              }
              
              </div>
          </CCardHeader>  */}
          <CCardBody style={{paddingTop:8}} className="search">
          <CForm name="form" onSubmit={this.handleSubmit} className="form">
          <CRow>
            <CCol xs="2">
                  <CLabel htmlFor="sDateFrom">Start Date</CLabel>
                  <CInput type="date" id="startDate" placeholder="Enter Date" name="startDate" value={this.state.search.startDate} onChange={this.onChange}/>
            </CCol>
            <CCol xs="2">
                  <CLabel htmlFor="eDateFrom">End Date</CLabel>
                  <CInput type="date" id="endDate" placeholder="Enter Date" name="endDate" value={this.state.search.endDate} onChange={this.onChange}/>
            </CCol>
            <CCol xs="2">
                    <CLabel htmlFor="po">Vendor</CLabel>
                    {/* <CInput type="text" id="supplier" placeholder="Supplier" name="supplier" value={this.state.search.supplier} onChange={this.onChange}/> */}
                    <Autocomplete onSelect={this.supplierSelect}/>
                </CCol>
            {(this.state.segment === 'invoices' || this.state.segment === 'po-details' || this.state.segment === 'ap-details') &&
                <>
                {(this.state.segment === 'invoices' || this.state.segment === 'ap-details') &&
                <CCol xs="2">
                      <CLabel htmlFor="invoice">Invoice</CLabel>
                      <CInput type="text" id="invoice" placeholder="Invoice number" name="invoice" value={this.state.search.invoice} onChange={this.onChange}/>
                </CCol>
                }
                 {(this.state.segment === 'invoices' || this.state.segment === 'po-details') &&
                <CCol xs="2">
                    <CLabel htmlFor="po">PO</CLabel>
                    <CInput type="text" id="po" placeholder="po number" name="po" value={this.state.search.po} onChange={this.onChange}/>
                </CCol>
                }
              </>
              }
              <CCol xs="2" style={{textAlign:'left'}}>
                  <CFormGroup style={{marginTop: "14px"}}>
                    <CButton size="sm" color="success"shape="round" type="submit" style={{marginLeft:10}}><CIcon name="cil-search" /></CButton>
                    <CButton size="sm" color="danger"shape="round" type="button" onClick={this.clearSearch} style={{marginLeft:10}}><CIcon name="cil-x" /></CButton>
                </CFormGroup>
                </CCol>
            </CRow>
           
            
          {/* <CFormGroup  row className="my-0 row-add">
                <CCol xs="2">
                  <CFormGroup>
                  {this.state.segment == 'invoices' &&
                    <>
                    <CLabel htmlFor="name">Invoice</CLabel>
                    <Select
                    name="search.invoice"
                    isClearable={true}
                    components={animatedComponents}
                    value={this.state.invoiceSelectedOption}
                    onChange={this.handleChange}
                    options={this.state.invoiceOptionList}/>
                    </>
                  }
                  {this.state.segment != 'invoices' &&
                    <>
                    <CLabel htmlFor="name">SOW</CLabel>
                    <Select
                    name="search.sow"
                    isClearable={true}
                    components={animatedComponents}
                    value={this.state.sowSelectedOption}
                    onChange={this.handleChange}
                    options={this.state.sowOptionList}/>
                    </>
                  }
                  
                  </CFormGroup>
                </CCol>
                
                <CCol xs="2">
                <CFormGroup>
                    <CLabel htmlFor="sDateFrom">Start Date</CLabel>
                    <CInput type="date" id="StartDateSOW" placeholder="Enter Date" name="StartDateSOW" value={this.state.search.StartDateSOW} onChange={this.onChange}/>
                    </CFormGroup>
                </CCol>
                <CCol xs="2">
                <CFormGroup>
                  {/* <CRow>
                  <CCol xs="6"> 
                    <CLabel htmlFor="eDateFrom">End Date</CLabel>
                    <CInput type="date" id="EndDateSOW" placeholder="Enter Date" name="EndDateSOW" value={this.state.search.EndDateSOW} onChange={this.onChange}/>
                  </CFormGroup>
                </CCol>
                {(this.state.segment == 'milestones'  || this.state.segment == 'commercials' || this.state.segment == 'invoices') && 
                <>
                <CCol xs="2">
                  <CFormGroup>
                  <CLabel htmlFor="supplier">Vendor</CLabel>
                  <Select
                      name="search.supplier"
                      isClearable={true}
                      components={animatedComponents}
                      value={supplierSelectedOption}
                      onChange={this.handleChange}
                      options={this.state.suppliers}/>
                  </CFormGroup>
                </CCol>
                </>
                }
                {
                this.state.segment == 'commercials' && 
                <CCol xs="2">
                  <CFormGroup>
                  <CLabel htmlFor="tech-stack">Tech Stack</CLabel>
                  <Select
                      name="search.techStack"
                      isClearable={true}
                      components={animatedComponents}
                      value={this.state.techStackSelectedOption}
                      onChange={this.handleChange}
                      options={this.state.techStack}/>
                  </CFormGroup>
                </CCol>
                }
                {(this.state.segment == 'resources' || this.state.segment == 'invoices' || this.state.segment == 'contacts') && 
                <CCol xs="2">
                  <CFormGroup>
                  <CLabel htmlFor="tech-stack">Contract Type</CLabel>
                  <Select
                      name="search.contractType"
                      isClearable={true}
                      components={animatedComponents}
                      value={this.state.contractTypeSelectedOption}
                      onChange={this.handleChange}
                      options={this.state.contractType}/>
                  </CFormGroup>
                </CCol>
                }
                {this.state.segment == 'resources' && 
                 <>
                  <CCol xs="2">
                  <CFormGroup>
                    <CLabel htmlFor="role">Role</CLabel>
                    <Select
                        name="search.role"
                        isClearable={true}
                        components={animatedComponents}
                        value={roleSelectedOption}
                        onChange={this.handleChange}
                        options={this.state.roles}/>
                    </CFormGroup>
                  </CCol>
                  
                  </>
                }
                <CCol xs="2" style={{textAlign:'left'}}>
                  <CFormGroup style={{marginTop: "14px"}}>
                    <CButton size="sm" color="success"shape="round" type="submit" style={{marginLeft:10}}><CIcon name="cil-search" /></CButton>
                    <CButton size="sm" color="danger"shape="round" type="button" onClick={this.clearSearch} style={{marginLeft:10}}><CIcon name="cil-x" /></CButton>
                </CFormGroup>
                </CCol>
            </CFormGroup> */}
            </CForm>
            
            {list && list.length>0 &&
              <div className="search-grid-div">
                <div style={{position:'relative'}}>
                  {/* <div className="zoom-controls">
                  <CButton onClick={this.zoomIn}> <CIcon name="cil-plus"/></CButton>
                  <CButton onClick={this.zoomOut}> <CIcon name="cil-minus"/></CButton>
                  </div>   */}
                </div>
                <TableData params={{list, count, segment, page}} key={segment+count+page+list.length} onTableChange={this.onTableChange}/>
              </div>
              
             } 
             {this.state.noresults && 
             <div className="text-center my-5"><h2>No items <svg width={30} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="c-icon c-icon-custom-size text-danger mb-2" role="img"><path fill="var(--ci-primary-color, currentColor)" d="M425.706,86.294A240,240,0,0,0,86.294,425.705,240,240,0,0,0,425.706,86.294ZM256,48A207.1,207.1,0,0,1,391.528,98.345L98.345,391.528A207.1,207.1,0,0,1,48,256C48,141.309,141.309,48,256,48Zm0,416a207.084,207.084,0,0,1-134.986-49.887l293.1-293.1A207.084,207.084,0,0,1,464,256C464,370.691,370.691,464,256,464Z" className="ci-primary" /></svg></h2></div>
             }
            </CCardBody>
           
          </CCard>
      </CCol>
      </CRow>
    </>
  );
}
}


// function mapStateToProps(state) {
//   //console.log(state)
//   return {
//     filters: state.filters,
//     searchList: state.searchList
//   }
// }

//export default connect(mapStateToProps)(Search);
export default Search;