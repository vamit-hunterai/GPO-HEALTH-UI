
/**
 * Author: Lakshman Veti
 * Type: Component
 * Objective: To render header element for layout
 * Associated Route/Usage: Layout
*/

import React, { useState , useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CHeader,
  CToggler,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
} from '@coreui/react';
import Autocomplete from 'react-autocomplete';
// routes config
import searchService from '../services/searchService';
import { getOptions } from 'src/helpers/common';
import routes from '../routes'
import CIcon from '@coreui/icons-react'

//import authService from '../services/authService';
//authService.throwBack();

import { 
  TheHeaderDropdown,
}  from './index'
import { zIndex } from '@mui/styles';

const TheHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.sidebarShow)
  const showHeader = useSelector(state => state.showHeader)
  const [selectedCustomer, setSelectedCustomer] = useState(localStorage.getItem("selectedCustomer"));
  const [customers, setCustomers] = useState([]);

  useEffect(()=>{
    fetchCUstomers();
  },[]);

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  const fetchCUstomers =()=>{
    searchService.search({type:"customers"}).then(res => {
      if(res.length != 0){
        setCustomers(getOptions(res.map((item) =>item.Customer), {label:'PARTY_GROUP_NAME', key:'PARTY_GROUP_KEY', value:'PARTY_GROUP_NAME'}));
      }
    })
    .catch(err => {
      console.log(err);
      
    }).finally(()=>{
      if(customers.length > 0){
        let defaultCustomer = customers[0];
        selectCustomer(defaultCustomer);
      }
    });
  }

  const selectCustomer =(cust, obj)=>{
    localStorage.setItem("selectedCustomer", cust);
    if(obj && obj.key)
      localStorage.setItem("selectedCustomerKey", obj.key);
    setSelectedCustomer(cust);
      
    if(window.location.hash && window.location.hash.indexOf('insights')!=-1){
      window.location.reload();
    }else{
      window.location = "#/insights/po-details";
    }
    // window.location.reload();
  }

  return (
    <CHeader withSubheader style={{display:showHeader?'':'none'}}>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
          <img src="logo-full-black.png" alt="logo" className="mx-auto d-lg-none"/>
      <CHeaderNav className="d-md-down-none mr-auto" style={{flex:1}}>
      {customers && customers.length>0 &&
      <Autocomplete
        getItemValue={(item) => item.label}
        items={customers}
        renderItem={(item, isHighlighted) =>
          <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
            {item.label}
          </div>
        }
        value={selectedCustomer}
        onChange={(e) => selectCustomer(e.target.value)}
        onSelect={(val, obj) => selectCustomer(val, obj)}
        menuStyle={{
          zIndex:999,
          borderRadius: '3px',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '2px 0',
          fontSize: '90%',
          position: 'fixed',
          overflow: 'auto',
          maxHeight: '50%',
          position: "fixed"
        }}
        wrapperStyle={{
          display:'block',
          width: '300px',
        }}
        inputProps={{placeholder:"Search Customer"}}
      />
    }
        {/* <CHeaderNavItem  className="px-3">
          <CHeaderNavLink to="/upload">Upload</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/search/segment-resources">Search</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>
        </CHeaderNavItem> */}

      </CHeaderNav>

      <CHeaderNav className="px-3">
      <CHeaderNavLink to="/upload"><CIcon name="cil-cloud-upload" size='lg'/></CHeaderNavLink>
        <TheHeaderDropdown/>
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter 
          className="border-0 c-subheader-nav m-0 px-0 px-md-3" 
          routes={routes} 
        />
      </CSubheader>
    </CHeader>
  )
}

export default TheHeader
