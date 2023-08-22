import React, { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Link, Typography, Divider } from '@mui/material'
import { CustomizationStepper } from '../../../components'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  text: {
    display: 'block',
    width: '500px',
    margin: '2% auto 0',

    textAlign: 'center'
  },
  text2: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#999999',
    marginBottom: '4%',

    textAlign: 'center'
  },
  history: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,

    position: 'relative',
    padding: '0 6% 0 4%',
    margin: '2% 50% 0 0',
    [theme.breakpoints.down('md')]: {
      margin: '2.3% 20.7% 0 17%',
    },
  },
  divider: {
    margin: '2% 6% 4.2% 4%',
    [theme.breakpoints.down('md')]: {
      margin: '3% 20.7% 4.2%',
    },
  },
  arrowIcon: {
    fontSize: '8px',
    margin: '0px 8px',
  },
  prod: {
    fontSize: '12px',
    fontWeight: 600,
  },  
  link: {
    fontSize: '12px',
    color: '#6F6C6B',
    fontWeight: 400,
  },
}));

interface stepTwoProps{
  artData: any
}

export default function Index(props: stepTwoProps) {
    const classes = useStyles()
    const { artData } = props

    return (
      <div className={classes.root}>
        <div className={classes.history}>
            <Link href='#' className={classes.link}>
                {' '}
                Home{' '}
            </Link>
            <ArrowForwardIosIcon className={classes.arrowIcon} />
            <Link href='#' className={classes.link}>
                {' '}
                Customização{' '}
            </Link>
            <ArrowForwardIosIcon className={classes.arrowIcon} />
            <Typography className={classes.prod}> Escolha da arte </Typography>
        </div>

        <Divider className={classes.divider} />

        <CustomizationStepper step={1} artData={artData}/>
        
      </div>
    )
};

