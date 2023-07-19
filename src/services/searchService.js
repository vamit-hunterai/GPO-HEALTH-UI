/**
 * Author: Lakshman Veti
 * Type: Service
 * Objective: Serves search functional services
 * Associated Route/Usage: /search
*/

import config from '../config';
import commonService from './commonService';
import authService from './authService';
const userObj = authService.getUser();

const searchService = {
  search,
  getSow,
  getRoles,
  getSupplies,
  getSimilarSearches,
  getLocations,
  getTechStack,
  getSowAutoSuggestions,
  getFullList,
  count,
  getEngagements
};

/**
 To perform search operation
 * @data {obj} search filters
 * @returns promise
 */
function search(data) {
  console.log(window.userDetails)
  let _userObj = window.userDetails || authService.getUser();
  if(_userObj) data.actor = _userObj.id;
    return commonService.restCall({
        url:`${config.apiUrl.node}/search${commonService.objToParams(data)}`,
        method:'GET',
        // data
    });
}

/**
 * Feciliates search counts
 * @data {obj} search filters
 * @returns promise
 */
function count(data) {
  let _userObj = authService.getUser();
  if(_userObj) data.actor = userObj.id;
    return commonService.restCall({
        url:`${config.apiUrl.node}/search/count`,
        method:'POST',
        data
    });
}

/**
 * Fetch sow by number
 * @numberSow 
 * @returns promise
 */
function getSow(numberSow) {
    return commonService.restCall({
        url:`${config.apiUrl.node}/search/sow/${numberSow}`,
        method:'GET'
    });
}


/**
 * Fetch type-ahead sow list seach suggestions 
 * @sow 
 * @returns promise
 */
function getSowAutoSuggestions(sow){
  return commonService.restCall({
      url:`${config.apiUrl.node}/search/auto-suggestions/${sow}`,
      method:'GET'
  });
}

/**
 * Fetch list of roles
 * @returns promise
 */
function getRoles(){
    return commonService.restCall({
        url:`${config.apiUrl.node}/search/roles`,
        method:'GET'
    });
}

/**
 * Fetch list of suppliers
 * @returns promise
 */
function getSupplies(keyword){
  return commonService.restCall({
      url:`${config.apiUrl.node}/search/suppliers?keyword=${keyword}&timestamp=${Date.now()}`,
      method:'GET'
  });
}

/**
 * Fetch list of locations
 * @returns promise
 */
function getLocations(){
  return commonService.restCall({
      url:`${config.apiUrl.node}/search/locations`,
      method:'GET'
  });
}

/**
 * Fetch list of engagements/contract types
 * @returns promise
 */
function getEngagements(){
  return commonService.restCall({
      url:`${config.apiUrl.node}/search/engagements`,
      method:'GET'
  });
}

/**
 * Fetch list of tech-stacks
 * @returns promise
 */
function getTechStack(){
  return commonService.restCall({
      url:`${config.apiUrl.node}/search/tech-stack`,
      method:'GET'
  });
}

function getSimilarSearches(sow){
  return commonService.restCall({
      url:`${config.apiUrl.node}/search/similar/${sow}`,
      method:'GET'
  });
}

/**
 * Fetch list of sows/invoices
 * @returns promise
 */
function getFullList(type){
  return commonService.restCall({
      url:`${config.apiUrl.node}/search/full-list/${type}`,
      method:'GET'
  });
}

export default searchService;
