/**
 * Author: Lakshman Veti
 * Type: Component
 * Objective: To render login page
 * Associated Route/Usage: /login
*/

import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CInvalidFeedback,
  CLink, CTooltip
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import authService from '../../../services/authService';

class Login extends  React.Component{  
  constructor(props) {
    super(props)
    authService.clear();

    this.state = {
      username: '',
      password: '',
      remember: false,
      submitted: false,
      error: '',
      loading: false,
      collapsed:false
    };

  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.setCollapsed = this.setCollapsed.bind(this);
  }
  setCollapsed(){
    this.setState({collapsed: !this.state.collapsed});
    //this.forceUpdate();
}

handleChange(e) {
  var { name, value } = e.target;
  
  if(name == 'remember'){
    this.state.remember = !this.state.remember;
    console.log(this.state)
  }else{
    this.setState({ [name]: value });
  }
}

handleSubmit(e) {
  e.preventDefault();

  this.setState({ submitted: true });
  const { username, password, remember} = this.state;

  // stop here if form is invalid
  if (!(username && password)) {
      return;
  }
  this.state.loading = true;
  var it = this;
  authService.login(username, password, remember)
      .then(
          user => {
            if(remember) localStorage.setItem('remember', true);
            
            if(user && user.username){
              localStorage.setItem('user', JSON.stringify(user));
              setTimeout(()=>{
                window.location = "#/insights/po-details";
                window.userDetails = user;
                // const { from } = it.props.location.state || { from: { pathname: "/insights/po-details" } };
                // it.props.history.push(from);
              },1000);
              
            }else{
              it.setState({ error:true, loading: false });  
            }
              
          },
          error => {
            it.setState({ error, loading: false });
          }
      );
}

render() {
  const { username, password, submitted, loading, error } = this.state;
  return (
    <div className="c-app login c-default-layout flex-row align-items-center" style={{
      background:'url(lbg.png) no-repeat center center',
      backgroundSize: '100% 110%'
    }}>
      <CContainer>
        <CRow className="justify-content-center logn">
          <CCol md="5">
            <CCardGroup>
              <CCard className="p-4 no-radius box-shadow">
                <CCardBody>
                  <CForm name="form" onSubmit={this.handleSubmit}>
                    {/* <img src="logo-full-black.png" className="login-logo"/> */}
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                        <CTooltip
                            content="Enter valid username"
                            placement="top"
                          >
                          <CIcon name="cil-user" />
                          </CTooltip>
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Username" autoComplete="username" name="username" value={username} tabIndex="1" onChange={this.handleChange}/>
                      {submitted && !username &&
                            <CInvalidFeedback style={{display:'block'}}>Username cannot be blank</CInvalidFeedback>
                      }
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                        <CTooltip
                            content="Enter valid password"
                            placement="top"
                          >
                          <CIcon name="cil-lock-locked" />
                          </CTooltip>
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" autoComplete="current-password" tabIndex="2" name="password" value={password} onChange={this.handleChange} />
                      {submitted && !password &&
                            <CInvalidFeedback style={{display:'block'}}>Password cannot be blank</CInvalidFeedback>
                      }
                      {submitted && error &&
                        <CInvalidFeedback style={{display:'inline'}}>Username / Password Incorrect</CInvalidFeedback>
                      }   
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" type="submit" tabIndex="3" disabled={loading}>Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        {/* <CButton color="link" className="px-0 gray-link">Forgot password?</CButton> */}
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              </CCardGroup>
          </CCol>
        </CRow>
        <div className="d-flex justify-content-center bd-highlight mb-3 footer">
          <div className=" bd-highlight">&copy; GPO Health 2021 <span className="ruler">|</span></div>
          <div className="bd-highlight"><CLink to="/terms" target="_blank">Terms & Conditions</CLink> <span className="ruler">|</span></div>
          <div className=" bd-highlight"><CLink to="/privacy" target="_blank">Privacy</CLink> <span className="ruler">|</span></div>
          <div className=" bd-highlight"><CLink to="/browser-support" target="_blank">Browser Support</CLink> <span className="ruler">|</span></div>
          <div className=" bd-highlight"><a href="mailto:support@gpo-health.com">Help : support@gpo-health.com</a></div>
        </div>
      </CContainer>
    </div>
  )
}
}

export default Login
