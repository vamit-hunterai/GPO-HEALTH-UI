/**
 * Author: Lakshman Veti
 * Type: Component
 * Objective: To render search results pagination
 * Associated Route/Usage: /search
*/

import React from 'react';
import PropTypes from 'prop-types';
import "./search.css";
import { connect } from "react-redux";
import searchService from '../../services/searchService';
import commonService from '../../services/commonService';
// import _ from 'underscore';

const propTypes = {
    items: PropTypes.array.isRequired,
    onChangePage: PropTypes.func.isRequired,
    initialPage: PropTypes.number,
    pageSize: PropTypes.number
}

const defaultProps = {
    initialPage: 1,
    pageSize: 10
}

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { page: 1, pager: {} };
        this.setPage(this.props.initialPage);
        console.log(this.state.pager)
    }

    paginateResults(){
        var page = 1;
        if(this.props.page && this.props.page.pager){
            page = this.props.page.pager.currentPage;
        }

        if(page == 1) return;
        
        var filters = commonService.clone(this.props.filters);
        if(filters !=null && filters.params) filters.params.offset = page;
        else filters ={params:{offset:page}}
        //console.log(filters)
        searchService.search(filters).then(res => {
            // if(this.props.searchList && this.props.searchList.length){
            //     if(res && res.length && _.isMatch(res[0], this.props.searchList[0]))
                 this.props.dispatch({type: 'SEARCH_RESULTS', res:[], filters });
            // } 
            if(res.length){
              this.props.dispatch({type: 'SEARCH_RESULTS', res, filters });
            } 
        })
    }

    componentWillMount() {
        // set page if items array isn't empty
        console.log('component will mounth')
        if (this.props.items && this.props.items.length) {
          // this.setPage(this.props.page && this.props.page.pager?this.props.page.pager.currentPage:this.props.initialPage ); 
        }
       // this.paginateResults();
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('component did mounth')
        // reset page if items array has changed
        if (this.props.items !== prevProps.items) {
           // this.setPage(this.props.initialPage);
        }
        //this.paginateResults();
    }

    setPage(page) {
        var { items, pageSize } = this.props;
        var pager = this.state.pager;

        if (page < 1 || page > pager.totalPages) {
            return;
        }

        // get new pager object for specified page
        pager = this.getPager(items.length, page, pageSize);

        // get new page of items from items array
        var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        //dispatch({type: 'set', currentPage: page})
        // update state
        this.setState({ pager: pager, page:page });
        //this.props.dispatch(updatePage(pager))
        this.props.dispatch({ type: 'PAGE', page:pager });
        // call change page function in parent component
        this.props.onChangePage(pageOfItems);

    }

    getPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        pageSize = pageSize || 10;

        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);

        var startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    render() {
        var pager = this.state.pager;
        console.log(pager)
        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }

        return (
            <ul className="pagination">
                <li className={"page-item "+(pager.currentPage === 1 ? 'disabled' : '')}>
                    <a className="page-link"  onClick={() => this.setPage(1)}>First</a>
                </li>
                <li className={"page-item "+(pager.currentPage === 1 ? 'disabled' : '')}>
                    <a className="page-link"  onClick={() => this.setPage(pager.currentPage - 1)}>Previous</a>
                </li>
                {pager.pages.map((page, index) =>
                    <li key={index} className={"page-item "+(pager.currentPage === page ? 'active' : '')}>
                        <a className="page-link"  onClick={() => this.setPage(page)}>{page}</a>
                    </li>
                )}
                <li className={"page-item "+(pager.currentPage === pager.totalPages ? 'disabled' : '')}>
                    <a className="page-link"  onClick={() => this.setPage(pager.currentPage + 1)}>Next</a>
                </li>
                <li className={"page-item "+(pager.currentPage === pager.totalPages ? 'disabled' : '')}>
                    <a className="page-link" onClick={() => this.setPage(pager.totalPages)}>Last</a>
                </li>
            </ul>
        );
    }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

function mapStateToProps(state) {
  // console.log(state)
    return {
      page: state.pager,
      searchList: state.searchList,
      filters: state.filters
    };
  }
  
export default connect(mapStateToProps)(Pagination);