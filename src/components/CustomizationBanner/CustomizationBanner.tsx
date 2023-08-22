/* eslint-disable no-unused-vars */
import React from 'react'

import { makeStyles } from '@mui/styles'
import { Hidden } from '@mui/material'

import { Banner, BannerMobile } from './components'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    background: '#F03E1B',
    flexGrow: 1,
    width: '100%',
  },
}))

const CustomizationBanner = (props: any) => {
  const { className, ...rest } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Hidden mdDown>
        <Banner />
      </Hidden>

      <Hidden mdUp>
        <BannerMobile />
      </Hidden>
    </div>
  );
}

export default CustomizationBanner
