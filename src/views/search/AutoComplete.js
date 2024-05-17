import  React, { useState } from  'react';
import  useDebouncedEffect  from  'use-debounced-effect';
import searchService from '../../services/searchService';
import './search.css';

export  default  function  Autocomplete(props) {
	const [term, setTerm] = useState('');
    const [value, setValue] = useState('');
    const [data, setData] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [mouseHover, setMouseHover] = useState(false);

	useDebouncedEffect(()=>{
	searchService.getSupplies(term).then((data)=>{
        setData([...data]);
        if(data && data.length>0) setShowResults(true);
    });
	}, 1000 ,[term]);

    const onSearchChange = (val)=>{
        setTerm(val);
        setValue(val);
    }

    const onSelect = (obj)=>{
        setValue(obj.VENDOR_NAME);
        setShowResults(false);
        if(props.onSelect){
            props.onSelect(obj);
        }
    }
	return (
        <div className='auto-complete'>
            <input  onChange={(e) => onSearchChange(e.target.value)} className={"form-control"} value={value} onBlur={(e) => { if(!mouseHover) setShowResults(false)}} />
            {showResults &&
                <ul className='list' onMouseEnter={ (e) => {setMouseHover(true); setShowResults(true)}} onMouseLeave={ (e) => {setMouseHover(false); setShowResults(false)}} > 
                    {data.map((item)=><li onClick={()=>onSelect(item)}>{item.VENDOR_NAME}</li>)}
                </ul>
            }
        </div>
	);
}