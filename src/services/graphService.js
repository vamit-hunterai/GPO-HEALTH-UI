/**
 * Author: Lakshman Veti
 * Type: Service
 * Objective: Serves graph functional services
 * Associated Route/Usage: "dashboard"
*/

import config from '../config';
import commonService from './commonService';

const graphService = {
  sowGraph,
};

/**
 * 
 * @param {period} number; ex: 6|12|18
 * @returns promise
 */
function sowGraph(params) {
    return commonService.restCall({
        url:`${config.apiUrl.node}/search/sow-invoice-graph?period=${params && params.period?params.period:6}`,
        method:'GET'
    });
}


export default graphService;
