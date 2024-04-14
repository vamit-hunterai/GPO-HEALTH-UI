
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
    
  },[]);

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
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
