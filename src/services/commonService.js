/**
 * Author: Lakshman Veti
 * Type: Service
 * Objective: Serve common functionality accross applicaion
 * Associated Route/Usage: Global
*/

const commonService = {
   loading:false,
   restCall,
   getJsonHeaders,
   handleResponse,
   getOptionFromList,
   clone,
   getFormattedDate,
   constructListOptions,
   objToParams,
   isPastDate,
   isDirty,
   removeExtension,
   sumarray,
   abbreviateNumber
};


/**
   * common REST call
   * @options : object (properties needed for REST call)
*/
function restCall(options) {
   const requestOptions = {
       method: options.method,
       headers: commonService.getJsonHeaders(options.headers),
       body: JSON.stringify(options.data),
       redirect: 'follow'
   };

   return fetch(options.url,requestOptions)
   .then(commonService.handleResponse)
   .then((data) =>  {
      // console.log(data);
     return data;
   });
}

/**
   * REST response handler
   * @response : xhr object
*/
function handleResponse(response) {
   if(response.url.lastIndexOf('file/download')!=-1){
      return response
   }else{
      return response.text().then(text => {
         const data = text && JSON.parse(text);
        if(response.status == 401){
           window.location = "/#/login"
           return;
        }
        else if(response.status == 500){
         return {respStatus: response.status} 
        }
        if(data !== null){
           return data.data?data.data:data;
        }else{
           //if(doLogOut) logout();
           
           //const error = (data && data.error && data.error.message) || response.statusText;
           return Promise.reject(new Error("Error while makign request"));
        }
     });
   }
   
}

/**
   * Construct HTTP headers
   * @void
*/
function getJsonHeaders(customHeaders){
   let headers = new Headers();
   headers.append("Content-Type", "application/json");
   headers.append("Access-Control-Allow-Headers", "Authorization");
   headers.append("Access-Control-Allow-Origin", "*");
   headers.append("mode", "no-cors");
   if(customHeaders){
      for (let [key, value] of Object.entries(customHeaders)){
         var el = Object.keys(value);
         for(var i=0; i<=el.length;i++){
            headers.append(el[i], value[el]);
         }
         //
      }
   }
   if(localStorage.getItem('user')){
      var user = JSON.parse(localStorage.getItem('user'));
      headers.append('x-access-token', user.token);
   }
   return headers;
}

/**
   * Return index/object from array list based on passed value
   * @list  : array
   * @matchKey : match & find a key from object
   * @matchValue : match the value for selected key
*/
function getOptionFromList(list, matchKey, matchValue, targetKey, retType){
   var opt,ind, matchKey = matchKey?matchKey:'value'
   for(var i in list){
      //if(key == 'requestedUOMId')
      // console.log(list[i], matchKey, matchValue)
      if(list[i][matchKey] == matchValue){
        // if(key == 'requestedUOMId')
        
         opt = list[i];
         //console.log(opt)
         ind = i;
         break;
      }
   }
   switch(retType){
      case 'index': return ind; break;
      case 'obj': return opt; break;
      case 'value': 
      if(opt)
         return opt[targetKey]; 
      else return  matchValue 
      break;
   }
}

/**
   * Deep clone object
   * @obj  : obj
*/
function clone(obj){
   return JSON.parse(JSON.stringify(obj));
}


/**
   * Format date to dd/mm/yyyy
   * @date  : Date
*/
function getFormattedDate(date, format) {
   var fdate ="";
   switch(format){
      case 'yyyymmdd':
         fdate = [
            date.getFullYear(),
            ('0' + (date.getMonth() + 1)).slice(-2),
            ('0' + date.getDate()).slice(-2)
          ].join('-');
      break;
      case 'ddmmyyyy': 
         var year = date.getFullYear();

         var month = (1 + date.getMonth()).toString();
         month = month.length > 1 ? month : '0' + month;
      
         var day  = date.getDate().toString();
         day = day.length > 1 ? day : '0' + day;
   
         fdate = month + '/' + day +  '/' + year + " " + date.getHours() + ':' + date.getMinutes();
      break;
   }
   return fdate;
 }

 /**
   * Construct list options from passed array
   * @list   : Arra   y
   * @fields : Array
   *  Ex fields: {label:impaCode, value:impaName}
*/

function constructListOptions(list, fields){
   var obj = [];
   //list = list.data;
   for(var i in list){
      var item = {};
      for (const [ key, value ] of Object.entries(fields)) {
         item[key] = list[i][value];
      }
      obj.push(item);
   }
   return obj;
}


 /**
   * Constructs query params from an object
   * @obj   : object
*/
function objToParams( obj ) {
   let str = '?' + Object.keys(obj).reduce(function(a, k){
       a.push(k + '=' + encodeURIComponent(obj[k]));
       return a;
   }, []).join('&');
   return str;
}


 /**
   * Returns boolean if the given date is past
   * @selectedDate   : date in string
   * #comparableDate : date in string
*/
function isPastDate(selectedDate, comparableDate){
   var CurrentDate = new Date();
   if(comparableDate) CurrentDate = new Date(comparableDate);
   selectedDate = new Date(selectedDate);
   selectedDate.setHours(0,0,0,0);
   CurrentDate.setHours(0,0,0,0);
   return selectedDate<CurrentDate?true:false;
}

function isDirty(oldArray, newArray) {
   var changes = 0, i, item, j, len;
   if (JSON.stringify(oldArray) === JSON.stringify(newArray)) { 
     return false;
   }
   for (i = j = 0, len = newArray.length; j < len; i = ++j) {
     item = newArray[i];
     //console.log(item, oldArray[i])
     if (JSON.stringify(item) !== JSON.stringify(oldArray[i])) {
       changes++;
     }
   }
   //console.log(newArray,changes)
   return changes>0?true:false;
 };


 function removeExtension(filename){
   var lastDotPosition = filename.lastIndexOf(".");
   if (lastDotPosition === -1) return filename;
   else return filename.substr(0, lastDotPosition);
}

function sumarray (array, prop) {
   var total = 0
   for ( var i = 0, _len = array.length; i < _len; i++ ) {
       total += array[i][prop]
   }
   return total
}

const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];
export function abbreviateNumber(number){

      // what tier? (determines SI symbol)
      var tier = Math.log10(Math.abs(number)) / 3 | 0;
   
      // if zero, we don't need a suffix
      if(tier == 0) return number;
   
      // get suffix and determine scale
      var suffix = SI_SYMBOL[tier];
      var scale = Math.pow(10, tier * 3);
   
      // scale the number
      var scaled = number / scale;
   
      // format number and add suffix
      return scaled.toFixed(1) + suffix;
}

export default commonService;
