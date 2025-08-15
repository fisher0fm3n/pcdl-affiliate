import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div className="text-xs">
        PCDL Affiliate
        {/* <span className="ms-1">&copy; 2024 New Media Technologies</span> */}
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
