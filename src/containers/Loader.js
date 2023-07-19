/**
 * Author: Lakshman Veti 
 * Type: Component
 * Objective: To render common loader
 * Associated Route/Usage: Global
*/

import React from 'react';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  position: absolute;
  top: 2%;
  right: 2%;
  border-color: #fff;
`;

class Loader extends React.Component{  
    constructor(props) {
      super(props);
      this.state = {
        loading: props.params.loading
      }

    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        loading: nextProps.params.loading
      });
    }

    render() {
        const { loading } = this.state;
        return (
            <ClipLoader color={"#fff"} loading={loading} css={override} size={150} />
        )
    }    
}

export default Loader;
