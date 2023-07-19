/**
 * Author: Lakshman Veti 
 * Type: Component
 * Objective: To render toast messages
 * Associated Route/Usage: Global
*/

import React from 'react';
import {
    CToast,
    CToastBody,
    CToastHeader,
    CToaster,
  } from '@coreui/react'
  
class Toast extends  React.Component{  
    constructor(props) {
      super(props);
      //console.log(props)
      this.state = {
        show: props.params.show,
        autohide: props.params.autohide?props.params.autohide:3000,
        message: props.params.message,
        status: props.params.status
      }
      
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
          show:     nextProps.params.show,
          autohide: nextProps.params.autohide?nextProps.params.autohide:3000,
          message: nextProps.params.message,
          status: nextProps.params.status
        });
    }

    render() {
        const { show, autohide, message, status } = this.state;
        return (
        <CToaster
            position={"top-right"}>
                <CToast 
                  show={show}
                  autohide={autohide}
                  fade={true}>
                  <CToastHeader className={status} closeButton={true}>
                    {status}
                  </CToastHeader>
                  <CToastBody>
                    {message}
                  </CToastBody>
                </CToast>
          </CToaster>
        )
    }    
}

export default Toast;
