/**
 * Author: Lakshman Veti
 * Type: Component
 * Objective: To render the list of Searches
 * Associated Route/Usage: /search
*/

import React from 'react'
import {
  CCard,
  CCol, CRow
} from '@coreui/react';
import JSONTree from 'react-json-tree';
import SowAutoSuggest from './SowAutoSuggest';
import { Scrollbars } from 'react-custom-scrollbars';
import searchService from '../../services/searchService';
import SearchResults from './SearchResults';
import Loader from "../../containers/Loader";

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

class SearchSow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sowList:[],
      searchResults:[],
      jsonTree:{},
      selectedSow:'',
      selectedSowObj:{},
    };
    this.selectSow = this.selectSow.bind(this);
    this.markMatches = this.markMatches.bind(this);
    this.getSelectedSow = this.getSelectedSow.bind(this);
    this.getSimilarSearches = this.getSimilarSearches.bind(this)
    //console.log(this.props.match.params);
  }

  componentDidMount(){  
    //this.getSearchedFile(this.props);
    if(this.props.match && this.props.match.params && this.props.match.params.sow){
      this.setState({selectedSow:this.props.match.params.sow});
      this.loadSowList(); //fetch list of sows
      this.getSelectedSow(this.props.match.params.sow);
      this.getSimilarSearches(this.props.match.params.sow)
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps && nextProps.match && nextProps.match.params && nextProps.match.params.sow){
      this.setState({selectedSow:nextProps.match.params.sow});
      this.getSelectedSow(nextProps.match.params.sow);
      this.getSimilarSearches(nextProps.match.params.sow)
    }
  }
  

  markMatches(ev) {
    this.setState({
     searchValue:ev.target.value.replace(/^[nlu]/ig,'')
    });
  }

  selectSow(item){
    //console.log(item)
    window.location = "/#/sow/"+item.NumberSOW
    //this.setState({selectedSow:item?item.no:"", selectedSowObj:item})
  }

  loadSowList(){
    this.setState({loading:true});
    searchService.search({type:'contacts', params:{}}).then(res => {
      //console.log(res);
      if(res.length == 0){
        this.setState({}, () => this.setState({sowList:[]}));
      }else{
        this.setState({}, () => this.setState({sowList:res}));
      } 
    })
    .catch(err => {
      console.log(err);
      this.setState({}, () => this.setState({loading:false}));
    });
  }
  getSimilarSearches(numberSow){
    this.setState({loading:true});
    searchService.getSimilarSearches(numberSow).then(res => {
        if(res && res.length>0){
          this.setState({}, () => this.setState({searchResults:res, loading:false}));
        }else{
          this.setState({}, () => this.setState({searchResults:{}, loading:false}));
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
          this.setState({}, () => this.setState({jsonTree:res, loading:false}));
        }else{
         
          this.setState({}, () => this.setState({jsonTree:{}, loading:false}));
        } 
    })
    .catch(err => {
      console.log(err);
      this.setState({}, () => this.setState({loading:false}));
    });
  }

  renderHighlight(){
    try{
      return <SearchResults params={{searchResults:this.state.searchResults, keyword: this.state.searchValue?this.state.searchValue.split(' '):[]}}/>
    }catch(e){}
    }
  
  
  render() {
  const {loading,jsonTree} = this.state;
  //console.log(searchResults)
  return (
    <>
    <Loader params={{loading}}/>
    <CRow className="">
    <CCol xs="12" sm="12">
      <CCard>
      <CRow style={{margin: 0}}>
        <CCol md="3" className="json-tree" style={{padding: 0,borderRight: '#ccc solid 2px'}}> 
          <div className="justify-content-center sow-auto">
          <SowAutoSuggest params={{slug:'search-similar'}}/>
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
            
            <div style={{marginTop:20}} className="search-hint">
                 About {this.state.searchResults.length} {this.state.selectedSow} like results found
            </div>

            <br />
            <Scrollbars style={{ height: 500, marginTop:10 }}>
            {this.state.searchResults && 
             <SearchResults params={{searchResults:this.state.searchResults, keyword: this.state.searchValue?this.state.searchValue.split(' '):[]}}/>
            }
             </Scrollbars>
            {/* <p dangerouslySetInnerHTML={{ __html: this.state.content }} /> */}
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

export default SearchSow
