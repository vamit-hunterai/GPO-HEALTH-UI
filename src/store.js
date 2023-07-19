/**
 * Author: Lakshman Veti
 * Type: Store
 * Objective: To fecilitate redux store
 * Associated Route/Usage: App
*/

import { createStore } from 'redux';

const initialState = {
  sidebarShow: true,
  sowGraphToggle: false,
  averageGraphToggle: false,
  spendsGraphToggle: false,
  shareGraphToggle: false,
  vendorAvgGraphToggle: false,
  showHeader: true,
  page: {
  },
  searchList:[]
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return {...state, ...rest }
    case "PAGE":
      return {
        ...state,
        page: rest.page
     };
     case "SEARCH_RESULTS":
      return {
        ...state,
        searchList: rest.res?rest.res:[],
        filters: rest.filters?rest.filters:{},
     };
    default:
      return state
  }
}

const store = createStore(changeState)
export default store