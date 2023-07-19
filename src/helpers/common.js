/**
 * Author: Lakshman Veti
 * Type: Utility
 * Objective: To provide utility functions
 * Associated Route/Usage: Global
*/

/**
 *  return authorization header with basic auth credentials
 */
export function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.authdata) {
        return { 'Authorization': 'Basic ' + user.authdata };
    } else {
        return {};
    }
}

//{label:value}
export function getOptions(data, labelOpts) {
    if(!data)return [];
    const compiledObj = [];
    data.forEach(element => {
        let _temp = {}
        for(let [key,val] of Object.entries(labelOpts)){
            if(element[val]) _temp[key] =  element[val];
        }
        compiledObj.push(_temp);
    });
    return compiledObj;
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