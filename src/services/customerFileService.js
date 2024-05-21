/**
 * Author: Amit Vishwakarma
 * Type: Service
 * Objective: Serves customer output file functional services
 * Associated Route/Usage: "*"
*/

import config from '../config';
import commonService from './commonService';
import authService from '../services/authService';

const customerFileService = {
  getFiles,
  downloadFile
};

/**
   * Get files
*/
function getFiles(){
    var user = authService.getUser();
    if(!user) return Promise.reject("error");

    return commonService.restCall({
        url:`${config.apiUrl.node}/file/list/output`,
        method:'GET'
    });
}

/**
   * Download file
   * @id : number/string (requisition id)
*/
function downloadFile(fileName) {
    return commonService.restCall({
        url:`${config.apiUrl.node}/file/download/customer/output/?fileName=${fileName}`,
        method:'POST'
    });
  }


export default customerFileService;