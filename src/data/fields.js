/**
 * Author: Lakshman Veti
 * Type: Modal
 * Objective: To render fields and labels in search tables
 * Usage: Search
*/

import { Button } from "@coreui/coreui";

const fields = {
  "invoicesItems":[{
    title: 'Vendor',
    dataIndex: 'invhdrNameSupplier',
    key: 'invhdrNameSupplier',
  }, {
    title: 'PO No',
    dataIndex: 'invhdrNumberPO',
    key: 'invhdrNumberPO',
  },{
    title: 'PO Date',
    dataIndex: 'invpricLineNbrPo',
    key: 'invpricLineNbrPo',
  },{
    title: 'Invoice No',
    dataIndex: 'invhdrNumberInvoice',
    key: 'invhdrNumberInvoice',
  },{
    title: 'Invoice Date',
    dataIndex: 'invhdrDateInvoice',
    key: 'invhdrDateInvoice',
  },{
    title: 'Description',
    dataIndex: 'invpriccDescription',
    key: 'invpriccDescription',
  },{
    title: 'Base Product',
    dataIndex: 'invpricSegmentLevel4',
    key: 'invpricSegmentLevel4',
  },{
    title: 'Qty',
    dataIndex: 'invpricQtyDerived',
    key: 'invpricQtyDerived',
  },{
    title: 'Unit Price',
    dataIndex: 'invpricRate',
    key: 'invpricRate',
  },{
    title: 'Line Amount',
    dataIndex: 'invpricLineAmount',
    key: 'invpricLineAmount',
  },{
    title: 'Actions',
    dataIndex: 'invoice_pdf_url',
    key: 'invoice_pdf_url',
    render:(rec, obj)=>{
       return <button disabled={!rec?true:false} onClick={()=>{
        downloadURI(rec, obj.Filename)
       }}>Open</button> 
    }
  },],
  "po-detailsItems":[
    {
      title: 'Vendor',
      dataIndex: 'pohdrNameSupplier',
      key: 'pohdrNameSupplier',
    }, {
      title: 'PO No',
      dataIndex: 'pohdrNumberPo',
      key: 'pohdrNumberPo',
    },{
      title: 'PO Date',
      dataIndex: 'pohdrDatePo',
      key: 'pohdrDatePo',
    },{
      title: 'Description',
      dataIndex: 'popricDescription',
      key: 'popricDescription',
    },{
      title: 'Qty',
      dataIndex: 'popricQty',
      key: 'popricQty',
    },,{
      title: 'Unit Price',
      dataIndex: 'popricRate',
      key: 'popricRate',
    },,{
      title: 'Line Amount',
      dataIndex: 'popricLineAmount',
      key: 'popricLineAmount',
    }
  ],

  "ap-detailsItems":[
    {
      title: 'Vendor',
      dataIndex: 'HCO_VNDR_NM',
      key: 'HCO_VNDR_NM',
    },
    {
      title: 'GL Code',
      dataIndex: 'HCO_GL_ACCT_DESC',
      key: 'HCO_GL_ACCT_DESC',
    },
    {
      title: 'PO No.',
      dataIndex: 'HCO_PO_NBR',
      key: 'HCO_PO_NBR',
    } ,
    {
      title: 'Invoice No',
      dataIndex: 'HCO_INVC_NBR',
      key: 'HCO_INVC_NBR',
    },
    {
      title: 'Invoice Line No',
      dataIndex: 'HCO_INVC_LN_NBR',
      key: 'HCO_INVC_LN_NBR',
    } ,
    {
      title: 'AP Date',
      dataIndex: 'POST_DATE_YEAR_MM_SKEY',
      key: 'POST_DATE_YEAR_MM_SKEY',
    },
    {
      title: 'Line Amount',
      dataIndex: 'HCO_DISTRBTN_AMT',
      key: 'HCO_DISTRBTN_AMT',
    }   
  ],
  "po-invoicesItems":[
    {
      title: 'PO No',
      dataIndex: 'PO_NUMBER',
      key: 'PO_NUMBER',
    },
    {
      title: 'PO Date',
      dataIndex: 'PO_LINE_NUMBER',
      key: 'PO_LINE_NUMBER',
    },
    {
      title: 'Invoice No',
      dataIndex: 'INVOICE_NUMBER',
      key: 'INVOICE_NUMBER',
    }, 
    {
      title: 'PO Qty',
      dataIndex: 'PO_LINE_QUANTITY',
      key: 'PO_LINE_QUANTITY',
    }, 
    {
      title: 'Invoice Qty',
      dataIndex: 'INVC_LINE_QUANITY2',
      key: 'INVC_LINE_QUANITY2',
    }, 
    {
      title: 'PO Line amount',
      dataIndex: 'PO_LINE_VALUE',
      key: 'PO_LINE_VALUE',
    }, 
    {
      title: 'Invoice line amount',
      dataIndex: 'INVC_LINE_VALUE2',
      key: 'INVC_LINE_VALUE2',
    }, 
    {
      title: 'PO Invoice Diff amount',
      dataIndex: 'excess_value',
      key: 'excess_value',
    }, 
    {
      title: 'PO_Invoice Diff Qty',
      dataIndex: 'excess_QUANITY',
      key: 'excess_QUANITY',
    },
    {
      title: 'PO_Invoice Missing flag',
      dataIndex: 'PO_INV_Missing_flag',
      key: 'PO_INV_Missing_flag',
    }
  ],
  "invoice-pdfItems":[
    {
      title: 'Invoice Key',
      dataIndex: 'Invoice_key',
      key: 'Invoice_key',
    },
    {
      title: 'File Name',
      dataIndex: 'Filename',
      key: 'Filename',
    },
    {
      title: 'Actions',
      dataIndex: 'invoice_pdf_url',
      key: 'invoice_pdf_url',
      render:(rec, obj)=>{
         return <button onClick={()=>{
          downloadURI(rec, obj.Filename)
         }}>Open</button> 
      }
    },
  ],
  fileListFields : [
    { key: 'row', label:'S.no' },
    { key: 'filename', label:'Filename' },
    { key: 'user', label:'Uploaded By' },
    { key: 'createdAt', label:'Upload Date' },
    {
      key: 'show_details',
      label: '',
      sorter: false,
      filter: false
    }
  ],
  _invoicesItems:[
    { key: 'NameSupplier',label:'Vendor' },
    { key: 'NumberSOW',label:'SOW' },
    { key: 'IdContract',label:'Contract Id' },
    { key: 'NumberPO',label:'PO Number' },
    { key: 'NumberInvoice',label:'Invoice No' },
    { key: 'DateInvoice',label:'Invoice Date'},
    { key: 'invpricRoleIdentifierMilestone',label:'Milestone/Role Flag'},
    { key: 'invpricEmpTitle',label:'Milestone/Role' },
    { key: 'invpricDescription',label:'Description',_style: { width: '20%'}},
    { key: 'engagement_type', label:'Contract Type' },
    { key: 'invpricQty', label:'Qty' },
    { key: 'invpricRate', label:'Price' },
    { key: 'invpricUom', label:'UOM' },
    { key: 'invpricLineAmount', label:'Line Amount' },
     { key: 'invpricTotalAmount', label:'Total' }
  ],
  contactsItems:[
    { key: 'NameSupplier',label:'Vendor' },
    { key: 'NumberSOW',label:'SOW' },
    { key: 'NumberAmendment',label:'Amendment' },
    { key: 'IdContract',label:'Contract Id' },
    { key: 'CustRepName',label:'Customer Rep' },
    { key: 'CustRepTitle',label:'Cust Role'},
    { key: 'CustRepSignDate',label:'Cust Sign Date'},
    { key: 'VendorRepName',label:'Vendor Rep'},
    { key: 'VendorRepTitle',label:'Vendor Role'},
    { key: 'VendorRepSignDate',label:'Vendor Sign Date'},
  ],
  commercialsItems:[
    { key: 'NameSupplier',label:'Vendor' },
    { key: 'NumberSOW',label:'SOW' },
    { key: 'NumberAmendment',label:'Amendment' },
    { key: 'IdContract',label:'Contract Id' },
    { key: 'NameProject',label:'Project' },
    { key: 'SowValue',label:'Sow Value'},
    { key: 'PlatSystemsArea',label:'Tech Stack'},
  ],
  milestonesItems:[
    { key: 'NameSupplier',label:'Vendor' },
    { key: 'NumberSOW',label:'SOW' },    
    { key: 'milRoleIdentifierMilestone', label:'Milestone Flag' },
    { key: 'milEmpTitle', label:'Milestone' },
    { key: 'milLineAmount', label:'Line Amount' },
  ],
  resourcesItems:[
    { key: 'NameSupplier',label:'Vendor' },
    { key: 'NumberSOW',label:'SOW' },
    { key: 'NumberAmendment',label:'Amendment' },
    { key: 'IdContract',label:'Contract Id' },
    { key: 'NameProject',label:'Project' },
    { key: 'prcRoleIdentifierMilestone', label:'Role Flag' },
    { key: 'prcEmpTitle', label:'Role' },
    { key: 'prcRate', label:'Rate' },
    { key: 'prcLineAmount', label:'Line Tot' },
    //  key: 'prcDescription',label:'Description',_style: { width: '30%'}},
    { key: 'SowValue',label:'Sow Value'},
    { key: 'prcLocation', label:'Location' }
    
  ]
};


export default fields;


function downloadURI(uri, name) 
{
    var link = document.createElement("a");
    // If you don't know the name or want to use
    // the webserver default set name = ''
    link.setAttribute('download', name);
    link.href = uri;
    link.target = "_blank";
    document.body.appendChild(link);

    link.click();
    link.remove();
}