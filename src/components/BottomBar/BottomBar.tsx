/* eslint-disable no-unused-vars */
import React from 'react'

import { Hidden } from '@material-ui/core'

import { Footer, FooterMobile } from './components'

const BottomBar = (props: any) => {
  return (
    <div>
      <Hidden smDown>
        <Footer />
      </Hidden>

      <Hidden mdUp>
        <FooterMobile />
      </Hidden>
    </div>
  )
}

export default BottomBar
