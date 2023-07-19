/**
 * Author: Lakshman Veti
 * Type: Component
 * Objective: To render the search classification
 * Associated Route/Usage: /search
*/

import React from 'react'
import {
  CLink,
  CCard,
  CCol, CRow
} from '@coreui/react'
import JSONTree from 'react-json-tree';
import { Scrollbars } from 'react-custom-scrollbars';
import searchService from '../../services/searchService';
import SowAutoSuggest from './SowAutoSuggest';
import Loader from "../../containers/Loader";
import commonService from '../../services/commonService';
import _ from 'underscore';


const theme = {
  scheme: 'monokai',
  author: 'wimer hazenberg (http://www.monokai.nl)',
  base00: '#fff',
  base01: '#660708',
  base02: '#49483e',
  base03: '#75715e',
  base04: '#a59f85',
  base05: '#f8f8f2',
  base06: '#f5f4f1',
  base07: '#f9f8f5',
  base08: '#f92672',
  base09: '#fd971f',
  base0A: '#f4bf75',
  base0B: '#0b090a',
  base0C: '#a1efe4',
  base0D: '#BA181B',
  base0E: '#ae81ff',
  base0F: '#cc6633',
};

class SearchClassification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sowList:[],
      jsonTree:{},
      selectedSow:'',
      selectedSowObj:{},
      cloneJsonTree:{
      }
    };
    this.selectSow = this.selectSow.bind(this);
    this.markMatches = this.markMatches.bind(this);
    this.getSelectedSow = this.getSelectedSow.bind(this);
    
  }

  componentDidMount(){
    if(this.props.match && this.props.match.params && this.props.match.params.sow){
      this.loadSowList(); //fetch list of sows
      this.getSelectedSow(this.props.match.params.sow);
      this.setState({selectedSow:this.props.match.params.sow});
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps && nextProps.match && nextProps.match.params && nextProps.match.params.sow){
      this.getSelectedSow(nextProps.match.params.sow);
      this.setState({selectedSow:nextProps.match.params.sow});
    }
  }
  

  markMatches(ev) {
    let str = ev.target.value;
    if(!str) {
      this.setState({}, () => this.setState({cloneJsonTree:this.state.jsonTree}));
      //this.setState({cloneJsonTree:this.state.jsonTree})
      return;
    }
    var tmpObj = commonService.clone(this.state.jsonTree);
    for (const [key, value] of Object.entries(tmpObj)) {
      if(_.isObject(value)){
        if(value.length){
          for(var i in value){
            for (const [k, v] of Object.entries(value[i])) {
              try{
                tmpObj[key][i][k] = v.toString().replace(
                  new RegExp(str, 'gi'),
                  match =>
                    `<mark style="background: #2769AA;">${match}</mark>`
                )
              }catch(e){}
            }
          }
        }else{
          for (const [k, v] of Object.entries(value)) {
           
            try{
            tmpObj[key][k] = v.toString().replace(
              new RegExp(str, 'gi'),
              match =>
                `<mark style="background: #2769AA;">${match}</mark>`
            )
            }catch(e){}
          }
        }
        
      }else{
        try{
        tmpObj[key] = value.toString().replace(
          new RegExp(str, 'gi'),
          match =>
            `<mark style="background: #2769AA;">${match}</mark>`
        )
        }catch(e){}
      }
    }
    //console.log(tmpObj);
    this.setState({cloneJsonTree:tmpObj})
  }

  selectSow(option,obj){
    //console.log(option)
    window.location = "/#/sow/"+(option?option.value:'');
    //this.setState({selectedSow:item?item.no:"", selectedSowObj:item})
  }

  createMarkup = html => {
    return { __html: html }
  }

  loadSowList(){
    this.setState({loading:true});
    searchService.search({type:'contacts', params:{}}).then(res => {
      //console.log(res);
      if(res.length == 0){
        this.setState({}, () => this.setState({sowList:[]}));
      }else{
        this.setState({}, () => this.setState({sowList:res, sowOptionList: commonService.constructListOptions(res, {label:'NumberSOW', value:'NumberSOW'})}));
      } 
    })
    .catch(err => {
      console.log(err);
      this.setState({}, () => this.setState({loading:false}));
    });
  }

  getSelectedSow(numberSow){
    this.setState({loading:true});
    searchService.getSow(numberSow).then(res => {
      //console.log(res)
        if(res.sow){
         // console.log(res)
          this.setState({}, () => this.setState({jsonTree:res,cloneJsonTree:res,loading:false}));
        }else{
         
          this.setState({}, () => this.setState({jsonTree:{},cloneJsonTree:res,loading:false}));
        } 
    })
    .catch(err => {
      console.log(err);
      this.setState({}, () => this.setState({loading:false}));
    });
  }

  renderDeliverables(){
    try{
      let content=``;
      if(this.state.cloneJsonTree.deliverables){
        content=`<tr><th>Vendor</th><th>Deliverable</th><th>Description</th><th>Start Date</th><th>End Date</th></tr>`;
        for(var i in this.state.cloneJsonTree.deliverables){
          content+=`<td>${this.state.cloneJsonTree.deliverables[i].NameSupplier}</td>
          <td>${this.state.cloneJsonTree.deliverables[i].delDeliverable}</td>
          <td>${this.state.cloneJsonTree.deliverables[i].delDescription}</td>
          <td>${this.state.cloneJsonTree.deliverables[i].delStartDate}</td>
          <td>${this.state.cloneJsonTree.deliverables[i].delEndDate}</td>
          </tr>`;
        }
      }
      return content;
    }catch(e){}
  }
  
  
  render() {
  const {loading,jsonTree} = this.state;
  //console.log(requisitionDetails)
  return (
    <>
    <Loader params={{loading}}/>
    <CRow className="">
    <CCol xs="12" sm="12">
      <CCard>
      <CRow style={{margin: 0}}>
      
        <CCol md="3" className="json-tree" style={{padding: 0,borderRight: '#ccc solid 2px'}}> 
         
          <div className="justify-content-center sow-auto">
            <SowAutoSuggest params={{slug:'sow'}}/>
            </div>      
          <hr/>
          <div className="node">
            <JSONTree data={jsonTree} theme={theme} invertTheme={false} />
          </div>
        </CCol>
        <CCol md="9" style={{padding: 20}} className="search-body"> 
         
          <div style={{position:'relative'}}>
            <div className="search-header">
              <h3>{jsonTree.commercials ? jsonTree.commercials.NameFile:''}</h3>
              <div className="search-bar"><input type="text" onChange={this.markMatches} /></div>
            </div>

            <div style={{marginTop:20}}>
                 <CLink to={"/search-similar/"+this.state.selectedSow}>Show Similar SOWs with tech-stak {jsonTree.resourcess?jsonTree.resourcess.PlatSystemsArea:''}</CLink>
            </div>

            <Scrollbars style={{ height: 500, marginTop:10 }}>
            {
              <div>
                {this.state.cloneJsonTree && this.state.cloneJsonTree.resources &&
                  <>
                  <h3 style={{textTransform: 'capitalize'}}>Scope</h3>
                  <p dangerouslySetInnerHTML={this.createMarkup(this.state.cloneJsonTree.resources.TextScopeSummary)}></p>
                  </>
                }
                {this.state.cloneJsonTree && this.state.cloneJsonTree.deliverables && this.state.cloneJsonTree.deliverables.length>0 &&
                 <>
                  <h3 style={{textTransform: 'capitalize'}}>Deliverables</h3>
                  <br/>
                  <table style={{width:'100%'}} dangerouslySetInnerHTML={this.createMarkup(this.renderDeliverables())}></table>
                  
                </>
                }

                {this.state.cloneJsonTree && this.state.cloneJsonTree.commercials &&
                 <>
                  <h3 style={{textTransform: 'capitalize'}}>Commercials </h3>
                  <p>
                    <span style={{fontWeight:'bold'}}>SOW Value: </span> <span dangerouslySetInnerHTML={this.createMarkup(this.state.cloneJsonTree.commercials.SowValue)}></span>
                  </p>
                  </>
                }

                {this.state.cloneJsonTree && this.state.cloneJsonTree.milestones &&
                <>
                  <h3 style={{textTransform: 'capitalize'}}>Milestones </h3>
                  <p>
                    <span style={{fontWeight:'bold'}}>Milestone: </span> <span dangerouslySetInnerHTML={this.createMarkup(this.state.cloneJsonTree.milestones.milRoleIdentifierMilestone)}></span>
                  </p>
                  <p>
                    <span style={{fontWeight:'bold'}}>Line Amount: </span> <span dangerouslySetInnerHTML={this.createMarkup(this.state.cloneJsonTree.milestones.milLineAmount)}></span>
                  </p>
                </>
                }

                {this.state.cloneJsonTree && this.state.cloneJsonTree.contacts &&
                <>
                  <h3 style={{textTransform: 'capitalize'}}>Contact Info </h3>
                  <div style={{float:'left'}}>
                    <span style={{paddingRight:5}} dangerouslySetInnerHTML={this.createMarkup(this.state.cloneJsonTree.contacts.VendorRepName)}></span>
                     - <span style={{paddingLeft:5}} dangerouslySetInnerHTML={this.createMarkup(this.state.cloneJsonTree.contacts.VendorRepTitle)}></span>
                    <br/>
                    <span dangerouslySetInnerHTML={this.createMarkup(this.state.cloneJsonTree.contacts.VendorRepSignDate)}></span>
                  </div>
                  <div style={{float:'right'}}>
                    <span style={{paddingRight:5}} dangerouslySetInnerHTML={this.createMarkup(this.state.cloneJsonTree.contacts.CustRepName)}></span>
                     - <span style={{paddingLeft:5}} dangerouslySetInnerHTML={this.createMarkup(this.state.cloneJsonTree.contacts.CustRepTitle)}></span>
                    <br/>
                    <span dangerouslySetInnerHTML={this.createMarkup(this.state.cloneJsonTree.contacts.CustRepSignDate)}></span>
                  </div>
                </>
                }
                <p></p>
              </div>
            }
             </Scrollbars>
            
          </div>
         
        </CCol>
        </CRow>
      </CCard>
     </CCol> 
    </CRow>
    </>
  );
}
}

export default SearchClassification
