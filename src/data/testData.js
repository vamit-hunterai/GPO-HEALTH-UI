/**
 * Author: Lakshman Veti
 * Type: Data
 * Objective: To provide mock test data
 * Usage: Global
*/


const data = {
  profilePics:{
    "lveti":'1.jpg',
    "rdwivedi":'5.jpg',
    "clientC":'1.jpg',
	"test01":'1.jpg'
  },
  sowList:{
    test01:[
      {no: 'SOW10102', uuid:'SOW10087', fileName: "SOW10102-DOC-V1.doc", uploadedBy: "clientA", createDate: "12/12/2012"},
      {no: 'SOW10103', uuid:'SOW10103', fileName: "SOW10103-Dev_SRS.doc", uploadedBy: "clientA", createDate: "22/12/2012"},
      {no: 'SOW10105', uuid:'SOW10105', fileName: "SOW10105-9475734V.doc", uploadedBy: "clientA", createDate: "29/12/2012"}
    ],
    lveti:[
      {no: 'SOW10102', uuid:'SOW10102', fileName: "SOW10102-DOC-V1.doc", uploadedBy: "clientB", createDate: "12/12/2012"},
      {no: 'SOW10103', uuid:'SOW10103', fileName: "SOW10103-Dev_SRS.doc", uploadedBy: "clientB", createDate: "22/12/2012"},
      {no: 'SOW10105', uuid:'SOW10105', fileName: "SOW10105-9475734V.doc", uploadedBy: "clientB", createDate: "29/12/2012"}
    ],
    clientC:[
      {no: 'SOW10257', uuid:'SOW10087', fileName: "SOW10087-DOC-V1.doc", uploadedBy: "clientC", createDate: "12/12/2012"},
      {no: 'SOW10359', uuid:'SOW10359', fileName: "SOW10359-Dev_SRS.doc", uploadedBy: "clientC", createDate: "22/12/2012"},
      {no: 'SOW10251', uuid:'SOW10251', fileName: "SOW10251-9475734V.doc", uploadedBy: "clientC", createDate: "29/12/2012"}
    ]
  },
  jsonDocument:{
	SOW10102:{
		objective:'Describes what is to be achieved or delivered by the completion of the contract. It also identifies the intended use of the completed requirement.',
		introduction:`Provides a brief description of the tasks or services required`,
		requirements: `The requirements describe the tasks or activities to be performed by the Contractor. It also includes a detailed description of what is required for each of the identified deliverables. The description will provide sufficient information so that all parties will be able to understand what will signal completion of a phase or milestone in the work. In most situations, this Section will identify what methodology and sequence each of the deliverables will need to meet, how the deliverable will need to be delivered and what will be the relationship of one deliverable with another. This section will provide information on the language, format, version and content requirements for each task or activity and each deliverable or milestone in the work.`
	},
	SOW10103:{
		objective:'Lorem ipsum dolor sit amet consectetuer adipiscing elit',
		introduction:`Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. 
		Cum sociis natoque penatibus et magnis dis parturient 
		montes, nascetur ridiculus mus. Donec quam felis, 
		ultricies nec, pellentesque eu, pretium quis, sem.`,
		requirements: `Lorem ipsum dolor sit amet, consectetuer adipiscing 
		elit. Aenean commodo ligula eget dolor. Aenean massa. 
		Cum sociis natoque penatibus et magnis dis parturient 
		montes, nascetur ridiculus mus. Donec quam felis, 
		ultricies nec, pellentesque eu, pretium quis, sem.`
	},
	SOW10105:{
		objective:'Aenean commodo ligula eget dolor aenean massa',
		introduction:`Aenean massa. 
		Cum sociis natoque penatibus et magnis dis parturient 
		montes, nascetur ridiculus mus. Donec quam felis, 
		ultricies nec, pellentesque eu, pretium quis`,
		requirements: `Donec pede justo, fringilla vel, aliquet nec, 
		vulputate eget, arcu. In enim justo, rhoncus ut, 
		imperdiet a, venenatis vitae, justo. Nullam dictum 
		felis eu pede `
	}
  },
  jsonTree:{
	SOW10102:{
		title: "SOW10087-DOC-V1",
		introduction: "Brief description",
		objective: "Describe the obective...",
		delivarables: { "Task1": 'UI Mockups' , "Task2": 'UI Designs' },
		requirements: "Describe requirements ...",
		contacts: { "Contact1": 'Contact One' , "Contact2": 'Contact Two' }
	},
	SOW10103:{
		title: "SOW10103-DOC-V1",
		introduction: "Provides a brief description",
		objective: "Describe obective",
		requirements: "The requirements describe ...",
		delivarables: { "Task1": 'UI Mockups' , "Task2": 'UI Designs' },
		contacts: { "Contact1": 'Contact One' , "Contact2": 'Contact Two' }
	},
	SOW10105:{
		title: "SOW10105-DOC-V1",
		introduction: "Description here",
		requirements: "The requirements describe ...",
		objective: "Describe obective here..",
		contacts: { "Contact1": 'Contact One' , "Contact2": 'Contact Two' },
		delivarables: { "Task1": 'UI Mockups' , "Task2": 'UI Designs' },
	}
  },
  deliverableItems: [{
    "id": 12194,
    "type":"",
    "name": "strategic development and executive recommondation",
    "description": "as per exhibit of the agreement",
    "amount": 20000,
    "sDate": "6/28/18",
    "eDate": "3/1/2019"
  },
  {
    "id": 12195,
    "type":"",
    "name": "development estimate and capacity plan",
    "description": "resource plan for developmentefforts for onshore/offshore deployment",
    "amount": 70000 ,
    "sDate": "8/1/2018",
    "eDate": "9/15/2018"
  },
  {
    "id": 12196,
    "type":"",
    "name": "location analysis and assessment for deployment",
    "description": "multy-variate analysis recommendations for site location and development based on requirements per section 3.2 of the agreement",
    "amount": 40000 ,
    "sDate": "7/31/2018",
     "eDate": "9/30/2018"
  },
  {
    "id": 12198,
    "type":"",
    "name": "regulatory assessment and recommendation",
    "description": "detailed assessment of regulatory,taxiation, data privacy and other items as per section 4.4 of the agreement",
    "amount": 125000 ,
    "sDate": "9/1/2018",
    "eDate": "12/1/2018"
  },
  {
    "id": 12199,
    "type":"",
    "name": "technology assessmment and selection criteria development",
    "description": "detailed recommendations for hardware,software and infrastructure as per section 5.1 of the agreement",
    "amount": 75000,
    "sDate": "10/1/2018",
    "eDate": "2/1/2019"
  },
  {
    "id": 12100,
    "type":"",
    "name": "suply base analaysis phase 1",
    "description": "analysis as per section 7.1 of the agreement",
    "amount": 30000,
    "sDate": "1/15/19",
    "eDate": "3/1/2019"
  }
],
resourceItems:[{
	"id": 18178,
	"resourceUnits": 1,
	"maximumUinits": "",
	"role": "technical consultant",
	"level": "",
	"description": "",
	"name": "asleycarver",
	"email": "",
	"phone": "",
	"jobtitle": "",
	"location": "",
	"rate": "$125.00",
	"rateUnit": "",
	"sDate": "",
	"eDate": "",
	"totalCost": 135000
}, {
	"id": 18187,
	"resourceUnits": 1,
	"maximumUinits": "",
	"role": "database analyst",
	"level": "",
	"description": "",
	"name": "",
	"email": "",
	"phone": "",
	"jobtitle": "",
	"location": "",
	"rate": "50",
	"rateUnit": "",
	"sDate": "",
	"eDate": "",
	"totalCost": 48000
}, {
	"id": 20113,
	"resourceUnits": 1,
	"rmaximumUinits": "",
	"role": "database analyst",
	"level": "senior",
	"description": "",
	"name": "",
	"email": "",
	"phone": "",
	"jobtitle": "",
	"location": "sanfrancisco ca",
	"rate": "75.00",
	"rateUnit": "",
	"sDate": "",
	"eDate": "",
	"totalCost": 72000
}, {
	"id": 20114,
	"resourceUnits": 1,
	"rmaximumUinits": "",
	"role": "business analyst",
	"level": "",
	"description": "",
	"name": "",
	"email": "",
	"phone": "",
	"jobtitle": "",
	"location": "offsite",
	"rate": "80.00",
	"rateUnit": "",
	"sDate": "",
	"eDate": "",
	"totalCost": 38400
}, {
	"id": 20115,
	"resourceUnits": 1,
	"rmaximumUinits": "",
	"role": "business analyst",
	"level": "senior",
	"description": "",
	"name": "",
	"email": "",
	"phone": "",
	"jobtitle": "",
	"location": "offsite",
	"rate": "90.00",
	"rateUnit": "",
	"sDate": "",
	"eDate": "",
	"totalCost": 43200
}, {
	"id": 20117,
	"resourceUnits": 1,
	"rmaximumUinits": "",
	"role": "QA teater",
	"level": "",
	"description": "",
	"name": "",
	"email": "",
	"phone": "",
	"jobtitle": "",
	"location": "offshore",
	"rate": "40.00",
	"rateUnit": "",
	"sDate": "",
	"eDate": "",
	"totalCost": 19200
}, {
	"id": 20118,
	"resourceUnits": 1,
	"rmaximumUinits": "",
	"role": "developer",
	"level": "",
	"description": "",
	"name": "",
	"email": "",
	"phone": "",
	"jobtitle": "",
	"location": "sanfrancisco ca",
	"rate": "50.00",
	"rateUnit": "",
	"sDate": "",
	"eDate": "",
	"totalCost": 24000
}],  
fileList: [
    {sNo: 1, fileName: "iSMS-SOW-V1.doc", uploadedBy: "John", uploadDate: "28/12/2012"},
    {sNo: 2, fileName: "Software_Dev_SRS.doc", uploadedBy: "Wills", uploadDate: "28/12/2012"},
    {sNo: 3, fileName: "Invoice-9475734V.doc", uploadedBy: "Dev", uploadDate: "28/12/2012"}
  ],
  userList : [
    {userName: 'A1', name: "Alpha 1", password: "(#$(#*))", email:'john@abc.com', createDate: "28/12/2012", updateDate: "28/12/2012"}
  ],
  resourceRoles:[
    {label:'Technical Consultant', value:'technical consultant'},
    {label:'Business Analyst', value:'business analyst'},
    {label:'Database Analyst', value:'database analyst'},
    {label:'QA Teater', value:'qa teater'}
  ],
  roles:[
      {id:1, role:'Admin'},
      {id:2, role:'User'}
  ],
  userRoles : [
    {userName: 'A1', roleId:1, createDate: "28/12/2012", updateDate: "28/12/2012"}
  ]
};

export default data;