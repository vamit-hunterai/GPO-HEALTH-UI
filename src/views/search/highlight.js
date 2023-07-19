/**
 * Author: Lakshman Veti
 * Type: Component
 * Objective: To render hightlighted search items
 * Associated Route/Usage: /search
*/

import React from 'react';
import Highlighter from "react-highlight-words";
import commonService from "../../services/commonService"
import fields from "../../data/fields"

const Highlight = ({params}) => {
  if (!params) {
    return null;
  }
  if (!params.obj) {
    return <p></p>;
  } 
  delete params.obj.sow;
  return (
    <>
     {
        Object.keys(params.obj).map((key,index) =>
        <div key={'heading'+index}>
        <h3 style={{textTransform: 'capitalize'}}>{key}</h3>
        {
            Object.keys(params.obj[key]).map((item,index) =>
                <div key={'child'+index}>
                    <div><strong>{commonService.getOptionFromList(fields[key+'Items'], 'name', item, 'title', 'value')}</strong></div>
                    <div><Highlighter
                        highlightClassName="YourHighlightClass"
                        searchWords={params.keyword?params.keyword:[]}
                        autoEscape={true}
                        textToHighlight={params.obj[key][item]}
                    /></div>
                </div>    
            )
        }
        </div>

     )}
    </>
  )
}

export default Highlight
