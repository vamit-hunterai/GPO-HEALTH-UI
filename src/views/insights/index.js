/**
 * Author: Lakshman Veti
 * Type: Component
 * Objective: To render Insightns page
 * Associated Route/Usage: /insights
*/


import React,{useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CContainer,CRow,CCol, CNav, CNavItem, CNavLink, CTabContent, CTabPane
} from '@coreui/react'

import { FaFileInvoiceDollar,FaDollarSign,FaFilePowerpoint,FaDatabase } from "react-icons/fa";
import ProgressLine from "../../reusable/ProgressLine"
import Search from "../search/search"
import Loader from "../../containers/Loader";
import commonService from '../../services/commonService';
import searchService from '../../services/searchService';
import './insights.scss'

 const dataOverviewMap=[
  {
    name:"No of Suppliers",
    aggregateField: 'No_of_suppliers'
  },
  {
    name:"Distinct item descriptions",
    aggregateField: 'No_of_distinct_item_descriptions'
  },
  {
    name:"No of Segments",
    aggregateField: 'No_of_Segments'
  },
  {
    name:"No of Families",
    aggregateField: 'No_of_Families'
  },
  {
    name:"No of classes",
    aggregateField: 'No_of_classes'
  },
  {
    name:"No of commodities",
    aggregateField: 'No_of_commodities'
  }
];

const dataMap = {
  "PO": "Purchase Orders",
  "AP": "AP Spend",
  "Invoice": "Invoices"
}

const dataAggregates = {
  PO : [{
    name:"Total PO Amount",
    aggregateField: 'Total_txn_amt'
    },
    {
    name:"PO Amount",
    aggregateField: 'with_amount'
    },
    {
      name:"Non PO Amount",
      aggregateField: 'without_amount'
      },
    {
      name:"Count of POs",
      aggregateField: 'Uniq_PO'
  }],
  Invoice:[{
    name:"Total Invoice Amount",
    aggregateField: 'Total_txn_amt'
    },
    {
      name:"With Invoice Amount",
      aggregateField: 'with_amount'
    },
    {
      name:"Without Invoice Amount",
      aggregateField: 'without_amount'
    },
    {
      name:"Count of POs",
      aggregateField: 'Uniq_PO'
    },{
      name: "Count of Invoices",
      aggregateField: "Uniq_invoices"
    }
  ],
  AP:[{
    name:"Total Invoice Amount",
    aggregateField: 'Total_txn_amt'
    },
    {
      name:"With Invoice Amount",
      aggregateField: 'with_amount'
    }]
}

const dqMap = {
  "INVC_LINE_QUANTITY":"Total Invoice quantity",
  "INVC_LINE_VALUE":"Total invoice value",
  "CNT_INV_NMBR":"Unq Invoice count",
  "CNT_PO_NMBR":"Unq PO count",
  "cnt_small_inv":"Unq small Invoice Count",
  "total_small_inv":"Total Small  invoice value",
  "cnt_tail_inv":"Unq Tail Invoice Count",
  "total_tail_inv":"Total Tail  invoice value",
  "model_cnt":"Unq Model Count",
  "UNQ_CNT_INV_Description":"Unq inv desc count"
}

const segmentMap = {
  1:"po-details",
  2:"invoices",
  3:"ap-details",
  4:"po-invoices",
  5:"data-quality",
  6:"invoice-pdf",
};

const colorMap = {
  0:"",
  1:"normal",
  2:"moderate",
  3:"high"
};

const Insights = () => {
  const dispatch = useDispatch();
  const [activeKey, setActiveKey] = useState(1)
  const showHeader = useSelector(state => state.showHeader);
  const [selectedSegment, setSelectedSegment] = useState(segmentMap["1"]);
  const [insightData, setInsightData] = useState([]);
  const [insightLoader, setInsightLoader] = useState(true);
  const [dqLoader, setDqLoader] = useState(false);
  const [insightOverViewData, setInsightOverViewData] = useState([]);
  const [dqData, setDqData] = useState({});
 
  useEffect(()=>{
    getInsights();
  },[]);

  const toggleHeader = () => {
    dispatch({ type: 'set', showHeader: !showHeader })
  }


  const changeSearchTab = (key) => {
    
    setActiveKey(key);
    if(segmentMap[key])
    setSelectedSegment(segmentMap[key]);
    if(key ==5){
      getDataQuality();
    }
  }

  const getRowData=(rows, arr)=>{

    const data = [];
    rows.forEach(element => {
      const _agg = commonService.sumarray(arr, element.aggregateField)
        data.push({
          name:element.name,
          percentage: "10%",
          color: "#118cb1",
          [element.aggregateField]:_agg,
          label:_agg// + (element.aggregateField.includes('amt')?"$":"")
        });
    });
   
    
    data.forEach(element => {
      const _sum = commonService.sumarray(data, "label");
      const per = String(_sum * element.label / 100).substring(0,2);
      element.percentage = per+"%";
      element.color = getColor(per);
      //element.label = element.label (element.name.toLowerCase().includes('amount')?"$":"");
    });
    return data;
  }

  const getColor=(val)=>{
    val = Number(val);
    if(val<=30) return "#2eb85c";
    else if(val<=60) return "#f14d45";
    else if(val<=80) return "#02b7c5";
    else return "#f9931d"
  }

  const getInsights=()=>{
    const _insightData = [];
    let overViews = [];
    setInsightLoader(true);
    searchService.search({type:'insights', customer:localStorage.getItem('selectedCustomer')}).then(res => {
      
      if(res && res.length>0){
        try{  
        overViews = res[3]; //to get data overview
        }catch(e){
          console.log(e)
        }

        res.forEach(main => {
            if(main && main.length>0){
              if(main[0].source_type)
                _insightData.push({title:dataMap[main[0].source_type] , data: getRowData(dataAggregates[main[0].source_type], main) })

              // try{
              // overViews.push(getRowData(dataOverviewMap, main)[0])
              // }catch(e){}
            }
        });
      }
      
      setInsightOverViewData(getRowData(dataOverviewMap, overViews) );
     setInsightData([..._insightData]);
     setInsightLoader(false)
    })
  }

  const getDataQuality=()=>{
    setDqLoader(true);
    searchService.search({type:'data-quality', customerKey:localStorage.getItem('selectedCustomerKey')}).then(res => {
      if(res && res.length>0){
        console.log(res[0])
       setDqData(res[0]);
      }
      setDqLoader(false)
    })
  }

  return (
    <CContainer fluid={true} className="insights">
      <CRow> <CCol ><h2>HunterAI Insights</h2></CCol></CRow>
      <CRow className="insight-headers">
        <CCol lg="3">
          <CRow>
            <CCol sm="1"><FaDatabase/></CCol>
            <CCol>Data Overview</CCol>
          </CRow> 
        </CCol>
        <CCol md="3">
          <CRow>
            <CCol sm="1"><FaFilePowerpoint/></CCol>
            <CCol> Purchase Orders</CCol>
          </CRow>
        </CCol>
        <CCol sm="3">
          <CRow>
          <CCol sm="1"><FaFileInvoiceDollar/></CCol>
            <CCol>Invoices</CCol>
            
          </CRow>
        </CCol>
        <CCol sm="3">
        <CRow>
            <CCol sm="1"><FaDollarSign/></CCol>
            <CCol>AP Spend</CCol>
          </CRow>
        </CCol>
      </CRow>

      <CRow>
        <CCol lg="3">
        <ul className='aggregates'>
          {insightOverViewData?.map((item, index)=>(<li>
            <span className={`dot`}><i style={{backgroundColor:item.color}}></i></span> <span style={{textAlign:"left"}}>{item.name}</span> <span>{item.label}</span>
          </li>))}
          </ul>
        </CCol>
        <CCol lg="9">
        <CRow className="insight-headers" style={{marginBottom:5}}>
        {insightData?.map((item, index)=>(
        <CCol lg="4">
          <CRow>
          <ProgressLine
            visualParts={item.data}
          />
          </CRow> 
        </CCol>
        ))
        }
      </CRow>
      <CRow style={{marginBottom:20}}>
        {insightData?.map((item, index)=>(
        <CCol lg="4">
          <ul className='aggregates'>
          {item?.data?.map((item, index)=>(<li>
            <span className={`dot`}><i style={{backgroundColor:item.color}}></i></span> <span style={{textAlign:"left"}}>{item.name}</span> <span>{item.label}{item.name.toLowerCase().includes('amount')?"$":""}</span>
          </li>))}
          </ul>
        </CCol>
        ))
        }
      </CRow>
        </CCol>
      </CRow>

      <CNav variant="tabs" role="tablist">
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 1}
            onClick={() => changeSearchTab(1)}
          >
            Purchase Orders
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 2}
            onClick={() => changeSearchTab(2)}
          >
            Invoices
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 3}
            onClick={() => changeSearchTab(3)}
          >
            AP Spend
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 4}
            onClick={() => changeSearchTab(4)}
          >
            Audit Insights
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 5}
            onClick={() => changeSearchTab(5)}
          >
            Data Quality
          </CNavLink>
        </CNavItem>
        {/* <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 6}
            onClick={() => changeSearchTab(6)}
          >
            Invoice PDF
          </CNavLink>
        </CNavItem> */}
        
      </CNav>
      
      <CRow>
        
         {!insightLoader && activeKey!=5 &&
          <Search style={{width: "100%"}} segment={selectedSegment} key={selectedSegment}/>
         }
        {activeKey == 5 &&

          <div className='tile-root'>
            <Loader params={{loading:dqLoader}}/>
            {Object.keys(dqData).map((key)=> dqMap[key] &&
            <div className={`tile ${colorMap[Math.floor(Math.random()*3)]}`}>
              <h2>{commonService.abbreviateNumber(dqData[key])}</h2>
              <div>{ dqMap[key]}</div>
            </div>  
            )}
          </div>
        }
      </CRow>
     
    </CContainer>
    
  )
}

export default Insights
