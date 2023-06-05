/* eslint-disable no-unused-vars */
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link, Hidden } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import Image from 'next/image'

import { HighlightBanner } from '../../../../generated/graphql'
const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
  },
  link: {
    fontFamily: "Suisse Int\\'l",
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '32px',
    textAlign: 'right',
    padding: '10px 0px',
  },
  mobileLink: {
    fontFamily: "Suisse Int\\'l",
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '20px',
    lineHeight: '32px',
  },
  mobileSlide: {
    position: 'absolute',
    bottom: '5px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    position: 'absolute',
    top: '25%',
    left: '60%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  croqui: {
    position: 'absolute',
    top: '2%',
    left: '30%',
    height: '88%',
    width: '25%',
  },
  mobileCroqui: {
    position: 'absolute',
    top: '0.5%',
    left: '17.5%',
    width: '65%',
    height: '80%',
  },
  arrowIcon: {
    color: '#6F6C6B',
    fontSize: theme.spacing(2),
  },
  mobileImages: {
    paddingTop: '86.60%',
    width: '100%',
    maxHeight: '478px',
    height: '80%',
  },
  mobileCentering: {
    width: '100%',
    maxHeight: '100%',
    height: '130vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileBackgroundPosition: {
    position: 'absolute',
    top: '20%',
    width: '100%',
    height: '42%',
  },
}))

interface OutfiBannerProps {
  item: HighlightBanner
  className?: string
}
// `/${item?.background}`
const OutfiBanner = (props: OutfiBannerProps) => {
  const { item, className, ...rest } = props
  const classes = useStyles()

// TODO: Change Croqui Image back to Webg
  return (
    <div className={classes.root}>
      <Hidden xsDown>
        <Image src={`/BackgroundGreen.png`} width='1920px' height='934px' layout='responsive' />
        <div className={classes.croqui}>
          <Image src={item.images[0].image.original} layout='fill' />
        </div>
        <div className={classes.slide}>
          {item.links.map((link, i) => (
            <Link href={link.url} className={classes.link} key={i}>
              {link.text} <ArrowForwardIosIcon className={classes.arrowIcon}></ArrowForwardIosIcon>{' '}
            </Link>
          ))}
        </div>
      </Hidden>
      <Hidden smUp>
        <div className={classes.mobileCentering}>
          <div className={classes.mobileImages}>
            <div className={classes.mobileBackgroundPosition}>
              <Image src={`/BackgroundGreen.png`} layout='fill' />
            </div>
            <div className={classes.mobileCroqui}>
              <Image src={item.images[0].image.original} layout='fill' />
            </div>
          </div>
          <div className={classes.mobileSlide}>
            {item.links.map((link, _i) => (
              <Link key={_i} href={link.url} className={classes.mobileLink}>
                {link.text} <ArrowForwardIosIcon className={classes.arrowIcon}></ArrowForwardIosIcon>{' '}
              </Link>
            ))}
          </div>
        </div>
      </Hidden>
    </div>
  )
}

export default OutfiBanner
