import React from 'react'
import { makeStyles } from '@mui/styles'
import {AboutBanner, AboutFooter, AboutHighlight} from '../components'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    background: '#EBE9DF',
    zIndex: 1,
    marginTop: theme.spacing(2)
  },
  whiteBg: {
    backgroundColor: '#ffffff',
    zIndex: 2
  }
}))

export default function Index() {
    const classes = useStyles()
  
    return (
      <div className={classes.root}>
        <AboutBanner />
        <div className={classes.whiteBg}>
          <AboutHighlight/>
        </div>
        <AboutFooter />
      </div>
    )
}

