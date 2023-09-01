/**
 * Author: Lakshman Veti
 * Type: Configuration
 * Objective: To access global variables accross application
 * Usage: Accross application
*/

var configuration = {
    "appName": "GPO-Health-ReactUI",
    "redirectURL": "https://ca.gpo-health.com/?authredirect=true",
    "apiUrl": {
        // node: '/api/v1', 
        // node: 'http://18.207.124.230:3000/api/v1',
        node: 'https://ca.gpo-health.com/api/v1',
    },
    "filesAutoRefresh": 5000, //ms
    "authType": "oauth2", //ads, rest
    "snapshot": {
    },
    allowedExt: ['csv','tab','rtf','ods ','html','htm','xml','jp2','tiff','gif','png','jpg','jpeg','txt','doc','docx', 'xls', 'xlsx','pdf','ppt','pptx','frm', 'myd','mdb','accdb'],
    "appSetting": {
        "headingDateFormat": "DD-MMM-YYYY",
        "globelDateFormat": "DD/MM/YYYY",
        "dashboardDefaultRange": "Year"
    },
    "powerBIReport": {
        scopes: ["https://analysis.windows.net/powerbi/api/Report.Read.All"],
        // clientId: "6854b857-3971-46a1-a507-683701540b48",
        // workspaceId: "d26b7ef2-95b9-4b75-b439-aa4c3cdaca26",
        // reportId: "75d1dbcc-c585-4c5c-8c90-1d0e15f3aede",
        // embedUrl: "https://app.powerbi.com/reportEmbed?reportId=75d1dbcc-c585-4c5c-8c90-1d0e15f3aede&groupId=d26b7ef2-95b9-4b75-b439-aa4c3cdaca26&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXdlc3QtdXMtYy1wcmltYXJ5LXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0LyJ9npm"
    
        clientId: "6854b857-3971-46a1-a507-683701540b48",
        workspaceId: "d26b7ef2-95b9-4b75-b439-aa4c3cdaca26",
        reportId: "482077ed-f723-49e1-8b2f-af9dfd6fa53a",
        embedUrl: "https://app.powerbi.com/reportEmbed?reportId=482077ed-f723-49e1-8b2f-af9dfd6fa53a&d26b7ef2-95b9-4b75-b439-aa4c3cdaca26&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXdlc3QtdXMtYy1wcmltYXJ5LXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0LyJ9npm"

    }
}

module.exports = configuration;
