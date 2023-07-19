/**
 * Author: Lakshman Veti
 * Type: Component
 * Objective: To render Power BI reports using powerbi-client-react
 * Associated Route/Usage: /dashboard
*/

import React from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import authService from '../../services/authService';
import config from "../../config";

class Report extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            accessToken: "",
            user: authService.getUser()
        };
    }
    componentDidMount(){
       authService.authorizePowerBi().then((data)=>{
        if(data){
            const toknResp = JSON.parse(data);
            this.setState({ accessToken: toknResp.access_token});
        }
      });
    }
    render() {
        if (!this.state.accessToken) {
            return <span>Loading...</span>
        }

        return (
            <PowerBIEmbed
                embedConfig={{
                    type: 'report',   // Supported types: report, dashboard, tile, visual and qna
                    id: config.powerBIReport.reportId,
                    embedUrl: config.powerBIReport.embedUrl,
                    accessToken: this.state.accessToken,
                    tokenType: models.TokenType.Aad,
                    settings: {
                        panes: {
                            filters: {
                                expanded: false,
                                visible: true
                            }
                        },
                    }
                }}

                eventHandlers={
                    new Map([
                        ['loaded', function () { console.log('Report loaded'); }],
                        ['rendered', function () { console.log('Report rendered'); }],
                        ['error', function (event) { console.log(event.detail); }]
                    ])
                }

                cssClassName={"Embed-container"}

                getEmbeddedComponent={(embeddedReport) => {
                    window.report = embeddedReport;
                }}
            />
        );
    }
}

export default Report;