/* eslint-disable no-unused-vars */
import React from 'react'

import { Hidden } from '@mui/material'

import { Footer, FooterMobile } from './components'

const BottomBar = (props: any) => {
  return (
    <div>
      <Hidden mdDown>
        <Footer />
      </Hidden>

      <Hidden mdUp>
        <FooterMobile />
      </Hidden>
    </div>
  );
}

export default BottomBar
