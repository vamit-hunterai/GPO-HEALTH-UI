/**
 * Author: Lakshman Veti
 * Type: Component
 * Objective: To render Power BI reports
 * Associated Route/Usage: /dashboard
*/


import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Report from './Report'

const Dashboard = () => {
  const dispatch = useDispatch();
  const showHeader = useSelector(state => state.showHeader);

  const toggleHeader = () => {
    dispatch({ type: 'set', showHeader: !showHeader })
  }

  return (
    <>
      <CLink style={{ position: 'absolute' }} className="card-header-action" onClick={() => toggleHeader()}>
        <CIcon name={showHeader ? 'cil-chevron-bottom' : 'cil-chevron-top'} />
      </CLink>
      {/*  power bi report */}
      <Report />
    </>
  )
}

export default Dashboard
