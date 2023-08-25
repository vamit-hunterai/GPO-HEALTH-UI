/**
 * Author: Lakshman Veti
 * Type: Service
 * Objective: Serve common functionality for auth/login
 * Associated Route/Usage: "#/login"
*/

import config from '../config';
import commonService from './commonService';
import {authHeader} from '../helpers/common';

// const mockUsers = [{
//     username: "512019120001",
//     password: "s2HVZKJPV6s="
// }];


const authService = {
    login,
    logout,
    clear,
    hasLoggedIn,
    throwBack,
    getAll,
    getUser,
    authorizePowerBi,
    getMockUser
};

export default authService;


/**
   * User login method
   * @userCode : string
   * @password : string
   * @remeber  : boolean
*/
function login(credentials, remember) {
    return commonService.restCall({
        url: `${config.apiUrl.node}/user/login`,
        method:'POST',
        data:{...credentials, authType:config.authType}
    });
}


/**
   * User initiate silent powerBI login and get the token
*/
function authorizePowerBi() {
    return commonService.restCall({
        url: `${config.apiUrl.node}/user/powerbi-auth`,
        method:'GET'
    });
}

/**
   * User logout method, removes user object from browser localstorage and reloads page
   * @void
*/
function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.clear();
    //window.location.reload();
    window.location = '#/login'
}

/**
   * Removes user object from browser localstorage
   * @void
*/
function clear() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

/**
   * Returns flag if the user is already logged in
   * @void
*/
function hasLoggedIn(){
  return localStorage.getItem('user')?true:false;
}

/**
   * Removes user object from browser localstorage and redirects to login page
   * @void
*/
function throwBack(){
    if(!localStorage.getItem('user')){
        window.location = '#/login';
    }
}


function getUser(){
    if(localStorage.getItem('user'))
        return JSON.parse(localStorage.getItem('user'));
    return null;    
}


function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users`, requestOptions).then(commonService.handleResponse);
}


/**
   * User login bypass method to validate user locally
   * @username : string
*/
function getMockUser(username){
    var usr = null
    const mockUsers =[{username:'test'}];
    for(var i=0; i<=mockUsers.length; i++){
        if(mockUsers[i].username === username){
            usr = mockUsers[i];
            break;
        }
    }
    return usr;
}