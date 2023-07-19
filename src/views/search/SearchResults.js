/**
 * Author: Lakshman Veti
 * Type: View Component
 * Objective: To render search results for similar-search page
 * Associated Route/Usage: /#search-similar
*/


import { CLink } from '@coreui/react';
import React from 'react';
import Highlighter from "react-highlight-words";
const SearchResults = ({params}) => {
  if (!params) {
    return null;
  }
  if (!params.searchResults) {
    return <p></p>;
  } 
  
  return (
    <>
     {
        params.searchResults.map((item,index) =>
        <li key={'heading'+index} className="similar-s-results">
        <h4 style={{textTransform: 'capitalize'}}>
          <CLink to={"/sow/"+item.NumberSOW}>
          <Highlighter
                highlightClassName="YourHighlightClass"
                searchWords={params.keyword?params.keyword:[]}
                autoEscape={true}
                textToHighlight={item.NameFile}
              />
            </CLink>
          </h4>
          <div>
          <Highlighter
                highlightClassName="YourHighlightClass"
                searchWords={params.keyword?params.keyword:[]}
                autoEscape={true}
                textToHighlight={item.NumberSOW}/>, &nbsp;&nbsp;
          <Highlighter
                highlightClassName="YourHighlightClass"
                searchWords={params.keyword?params.keyword:[]}
                autoEscape={true}
                textToHighlight={item.PlatSystemsArea}/>, &nbsp;&nbsp;      
          <Highlighter
              highlightClassName="YourHighlightClass"
              searchWords={params.keyword?params.keyword:[]}
              autoEscape={true}
              textToHighlight={item.NameCustomer}/>, &nbsp;&nbsp;
          <Highlighter
              highlightClassName="YourHighlightClass"
              searchWords={params.keyword?params.keyword:[]}
              autoEscape={true}
              textToHighlight={item.IdContract}/>, &nbsp;&nbsp;
            <Highlighter
              highlightClassName="YourHighlightClass"
              searchWords={params.keyword?params.keyword:[]}
              autoEscape={true}
              textToHighlight={item.NameSupplier}/>,&nbsp;&nbsp;
            <Highlighter
              highlightClassName="YourHighlightClass"
              searchWords={params.keyword?params.keyword:[]}
              autoEscape={true}
              textToHighlight={item.NameProject}/>
            </div>
        
        </li>

     )}
    </>
  )
}

export default SearchResults
