/**
 * Author: Amit Vishwakarma
 * Type: Component
 * Objective: To render shared file list view.
 * Associated Route/Usage: /customer/files
*/

import React, { Component } from "react";
import { CCollapse, CButtonGroup, CLink, CCard, CCardHeader, CCardBody, CDataTable, CButton } from '@coreui/react';
import customerFileService from '../../services/customerFileService';
import Loader from "../../containers/Loader";
import config from '../../config';
import CIcon from '@coreui/icons-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fields from '../../data/fields';
import authService from '../../services/authService';

class Output extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fileList: [],
            loading: false
        }
        this.downloadFile = this.downloadFile.bind(this);
    }
    componentDidMount() {
        this.loadFiles();
    }
    componentWillUnmount() { }
    loadFiles() {
        this.setState({ loading: true });
        customerFileService.getFiles().then(function (data) {
            this.setState({ fileList: data.response.files, loading: false });
        }.bind(this)).catch(function () {
            this.setState({ fileList: [], loading: false });
        }.bind(this));
    }
    downloadFile(item) {
        this.setState({ loading: true });
        customerFileService.downloadFile(item.name).then(res => {
            return res.blob();
        }).then(blob => {
            this.setState({ loading: false });
            require("downloadjs")(blob, item.name);
        }).catch(err => {
            console.log(err);
        });;
    }
    render() {
        const { loading, fileList } = this.state;

        return (
            <div id="customer-output-files">
                <Loader params={{ loading }} />
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <CCard style={{ width: "100%", border: 'none' }}>
                    <CCardBody>
                        <CCollapse show={true}>
                            <CDataTable
                                items={fileList}
                                fields={fields.customerFileListFields}
                                // columnFilter
                                tableFilter
                                //footer
                                itemsPerPageSelect
                                itemsPerPage={10}
                                hover
                                //striped
                                sorter
                                pagination
                                scopedSlots={{
                                    'download_btn': (item) => (
                                        <td>
                                            <CButton size="sm"
                                                color="success"
                                                onClick={() => { this.downloadFile(item) }} >
                                                <CIcon name="cil-cloud-download" />
                                            </CButton>
                                        </td>
                                    )
                                }} />
                        </CCollapse>
                    </CCardBody>
                </CCard>

            </div>


        );
    }

}

export default Output;