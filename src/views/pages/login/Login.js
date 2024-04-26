/**
 * Author: Lakshman Veti
 * Type: Component
 * Objective: To render login page
 * Associated Route/Usage: /login
*/
import config from '../../../config';
import React from 'react'
import OAuth2Login from 'react-simple-oauth2-login';
import { StrictMode } from 'react';
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

class Login extends React.Component {
  constructor(props) {
    super(props)
    authService.clear();

    this.state = {
      username: '',
      password: '',
      oauth2code: '',
      oauth2state: '',
      remember: false,
      submitted: false,
      error: '',
      loading: false,
      collapsed: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLoginFailure = this.onLoginFailure.bind(this);
    this.setCollapsed = this.setCollapsed.bind(this);
  }
  setCollapsed() {
    this.setState({ collapsed: !this.state.collapsed });
    //this.forceUpdate();
  }
  onLoginSuccess(e) {
    console.log(e);

    //e.preventDefault();

    this.setState({ submitted: true });
    const oauth2code = this.state.oauth2code = e.code;
    const oauth2state = this.state.oauth2state = e.session_state;
    

    // stop here if form is invalid
    if (!(oauth2code && oauth2state)) {
      return;
    }

    this.state.loading = true;
    var it = this;

    authService.login({code:oauth2code, state:oauth2state }, false)
      .then(
        user => {
         // if (remember) localStorage.setItem('remember', true);

          if (user && user.username) {
            localStorage.setItem('user', JSON.stringify(user));
            setTimeout(() => {
              window.location = "#/";
              window.userDetails = user;
              // const { from } = it.props.location.state || { from: { pathname: "/insights/po-details" } };
              // it.props.history.push(from);
            }, 1000);

          } else {
            it.setState({ error: true, loading: false });
          }

        },
        error => {
          it.setState({ error, loading: false });
        }
      );
  }
  onLoginFailure(e) {
    this.setState({ error: true, loading: false });
  }
  handleChange(e) {
    var { name, value } = e.target;

    if (name == 'remember') {
      this.state.remember = !this.state.remember;
      console.log(this.state)
    } else {
      this.setState({ [name]: value });
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password, remember } = this.state;

    // stop here if form is invalid
    if (!(username && password)) {
      return;
    }
    this.state.loading = true;
    var it = this;
    authService.login({username:username, password:password}, remember)
      .then(
        user => {
          if (remember) localStorage.setItem('remember', true);

          if (user && user.username) {
            localStorage.setItem('user', JSON.stringify(user));
            setTimeout(() => {
              window.location = "#/insights/po-details";
              window.userDetails = user;
              // const { from } = it.props.location.state || { from: { pathname: "/insights/po-details" } };
              // it.props.history.push(from);
            }, 1000);

          } else {
            it.setState({ error: true, loading: false });
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
        background: 'url(lbg.png) no-repeat center center',
        backgroundSize: '100% 110%'
      }}>
        <CContainer>
          <CRow className="justify-content-center logn">
            <CCol md="5">
              <CCardGroup>
                <CCard className="p-4 no-radius box-shadow">
                  <CCardBody>
                    <CRow className="justify-content-center">
                      <img src="logo.svg" className="login-logo" />
                    </CRow>
                    <CRow>
                      <StrictMode>
                        <OAuth2Login
                          buttonText='Login'
                          className='login-btn'
                          authorizationUrl="https://login.microsoftonline.com/1685ee7a-5191-4b15-b097-af0b89a8832c/oauth2/v2.0/authorize"
                          responseType="code"
                          clientId="c51c7675-0d50-4371-ae35-86e610d4f72d"
                          redirectUri={config.redirectURL}
                          scope='offline_access email openid profile api://e8d3f1dc-f415-4d19-af55-7397008c63b0/AccessAPP'
                          onSuccess={this.onLoginSuccess}
                          onFailure={this.onLoginFailure} />
                      </StrictMode>
                    </CRow>

                    {/*<CForm name="form" onSubmit={this.handleSubmit}>
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
                    </CRow>
                  </CForm>*/}

                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
          <div className="d-flex justify-content-center bd-highlight mb-3 footer">
            <div className=" bd-highlight">&copy; HunterAI 2024 <span className="ruler">|</span></div>
            <div className="bd-highlight"><CLink to="/terms" target="_blank">Terms & Conditions</CLink> <span className="ruler">|</span></div>
            <div className=" bd-highlight"><CLink to="/privacy" target="_blank">Privacy</CLink> <span className="ruler">|</span></div>
            <div className=" bd-highlight"><CLink to="/browser-support" target="_blank">Browser Support</CLink> <span className="ruler">|</span></div>
            <div className=" bd-highlight"><a href="mailto:support@gpo-health.com">Help : support@huneterai.com</a></div>
          </div>
        </CContainer>
      </div>
    )
  }
}

export default Login
