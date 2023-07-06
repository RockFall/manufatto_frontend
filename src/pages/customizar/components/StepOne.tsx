import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { Link, Typography, Divider } from '@material-ui/core'
import { useRouter } from 'next/router'
import { CustomizationStepper } from '../../../components'
import { CustomizedProductType } from '../../../actions'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  text: {
    display: 'block',
    width: '500px',
    margin: '2% auto',

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
    [theme.breakpoints.down('sm')]: {
      margin: '2.3% 20.7% 0 17%',
    },
  },
  divider: {
    margin: '2% 6% 4.2% 4%',
    [theme.breakpoints.down('sm')]: {
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

interface Art {
  path: string,
  smallPrice: string,
  mediumPrice: string,
  largePrice: string
}

interface ArtList {
  artist: {
    name: string,
    avatar: string
  },
  images: Art[]
};

interface stepOneProps{
  artData: ArtList[]
}

export default function Index(props: stepOneProps) {
    const classes = useStyles()
    const router = useRouter()
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
            <Typography className={classes.prod}> Escolher artista </Typography>
        </div>

        <Divider className={classes.divider} />

        <CustomizationStepper step={0} artData={artData}/>
      </div>
    )
};

