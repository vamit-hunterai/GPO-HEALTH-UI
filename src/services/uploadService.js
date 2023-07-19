/**
 * Author: Lakshman Veti
 * Type: Service
 * Objective: Serves upload file functional services
 * Associated Route/Usage: "*"
*/

import config from '../config';
import commonService from './commonService';
import authService from '../services/authService';

const uploadService = {
  //uploadFile,
  getFile,
  getFiles,
  downloadFile,
  deleteFile
};


/**
   * Get files list service call
   * @data : object
*/
function getFiles() {
    var user = authService.getUser();
    //console.log(user)
    if(!user) return Promise.reject("error");;
    return commonService.restCall({
        url:`${config.apiUrl.node}/file/list`,
        method:'GET',
        //data:{username:user.userName}
    });
}

/**
   * Get file service call
   * @id : number/string (requisition id)
*/
function getFile(uuid) {
  return commonService.restCall({
      url:`${config.apiUrl}/fileDownload`,
      data:{uuid},
      method:'POST'
  });

}


/**
   * Download file
   * @id : number/string (requisition id)
*/
function downloadFile(uuid) {
  return commonService.restCall({
      url:`${config.apiUrl.node}/file/download/${uuid}`,
      method:'POST'
  });
}

/**
   * delete file service call
   * @id : number/string (requisition id)
*/
function deleteFile(uuid) {
  return commonService.restCall({
      url:`${config.apiUrl.node}/file/delete/${uuid}`,
      method:'DELETE'
  });
}

export default uploadService;
