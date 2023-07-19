
/**
 * Author: Lakshman Veti
 * Type: Component
 * Objective: To render dropdown options in header
 * Associated Route/Usage: Header
*/
import React from 'react'
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import testData from '../data/testData';
import authService from '../services/authService';
import Avatar from 'react-avatar';

authService.throwBack();

const logout = ()=>{
  authService.logout();
}
var userObj = authService.getUser();


var selTheme = localStorage.getItem('theme');
if(selTheme){
  var el = document.getElementById('theme_css');
  el.setAttribute('href', '/'+selTheme+'.css');
}

const TheHeaderDropdown = () => {
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <Avatar name={userObj?userObj.username:'User'} size="40" rround={true}/>
          {/* <CImg
            src={"avatars/"+(userObj?testData.profilePics[userObj.username]:testData.profilePics.A1)}
            className="c-avatar-img"
            alt="avtar"
          /> */}
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>{userObj?userObj.userName:""}</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-user" className="mfe-2" />Profile
        </CDropdownItem>
        <CDropdownItem onClick={logout}>
          <CIcon name="cil-ban" className="mfe-2" />
          Logout
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-settings" className="mfe-2" />
          Settings
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}
export default TheHeaderDropdown
