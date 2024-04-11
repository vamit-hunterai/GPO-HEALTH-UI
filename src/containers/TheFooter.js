
/**
 * Author: Lakshman Veti
 * Type: Component
 * Objective: To render footer element for layout
 * Associated Route/Usage: Layout
*/

import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="https://www.hunterai.com/" target="_blank" rel="noopener noreferrer">HunterAI</a>
        <span className="ml-1">&copy; 2024 all rights reserved.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
