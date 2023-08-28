/* eslint-disable no-unused-vars */
import React from 'react'
import { makeStyles } from '@mui/styles'
import { Button, Hidden, Typography } from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  backMobile: {
    color: '#6F6C6B',
    margin: '8px 6px',
    fontFamily: "Akshar",
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',

    lineHeight: '18px',
    /* identical to box height, or 150% */

    textAlign: 'center',
    fontFeatureSettings: "'liga' off, 'kern' off",
  },
  backButton: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  infoText: {
    margin: '8px 8px',
    fontFamily: 'DM Sans',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '24px',
    /* identical to box height, or 150% */

    letterSpacing: '0.24em',
    textTransform: 'uppercase',
    color: '#6F6C6B',
  },
}))

interface BackToMenuMobileProps {
  className?: string
  title: string
  backToMenu: Function
}

const BackToMenuMobile = (props: any) => {
  const { backToMenu, title, className, ...rest } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Hidden lgUp>
        <Button className={classes.backButton} onClick={() => backToMenu()}>
          {' '}
          <KeyboardBackspaceIcon fontSize='inherit' /> <Typography className={classes.backMobile}> Voltar </Typography>
        </Button>
        <Typography className={classes.infoText}> {title} </Typography>
      </Hidden>
    </div>
  )
}

export default BackToMenuMobile
