/**
 * Author: Lakshman Veti
 * Type: Component
 * Objective: To render Power BI reports using powerbi-client-react
 * Associated Route/Usage: /dashboard
*/

import React from 'react';
import {
    CLink
} from '@coreui/react'
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import authService from '../../services/authService';
import config from "../../config";

class Report extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            accessToken: "",
            //Amit
            //user: authService.getUser() // TODO Amit
        };
    }
    componentDidMount() {
        // Amit
        /*authService.authorizePowerBi().then((data)=>{
         if(data){
             const toknResp = JSON.parse(data);
             this.setState({ accessToken: toknResp.access_token});
         }
       });*/
    }
    render() {
        /*if (!this.state.accessToken) {
            return <span>Loading...</span>
        }*/

        return (
            /*<PowerBIEmbed
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
            />*/
            <div>
                <CLink href="https://app.powerbi.com/reportEmbed?reportId=84687048-4007-4e83-a84d-5b428a0e2e82&autoAuth=true&ctid=1685ee7a-5191-4b15-b097-af0b89a8832c" target='_blank'>Workspace: F&B</CLink><br/>
                <CLink href="https://app.powerbi.com/reportEmbed?reportId=d54d6457-7eee-4161-91d3-785cc993c9ae&autoAuth=true&ctid=1685ee7a-5191-4b15-b097-af0b89a8832c" target='_blank'>Workspace: IT</CLink><br/>
                <CLink href="https://app.powerbi.com/reportEmbed?reportId=a9712282-ea35-47b7-95c9-da5796820b0f&autoAuth=true&ctid=1685ee7a-5191-4b15-b097-af0b89a8832c" target='_blank'>Workspace: Medical equipment</CLink>
            </div>
        );
    }
}

export default Report;