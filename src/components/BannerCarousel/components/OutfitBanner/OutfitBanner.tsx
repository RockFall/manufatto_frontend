/* eslint-disable no-unused-vars */
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link, Hidden } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import Image from 'next/image'

//import { HighlightBanner } from '../../../../generated/graphql'
import { HighlightBanner } from '../../../../util/custom_types'
const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
  },
  link: {
    fontFamily: "Suisse Int\\'l",
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '1rem',
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
    bottom: '50px',
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
    fontSize: theme.spacing(1.2),
    marginLeft: '5px',
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
    top: '0',
    width: '100%',
    height: 'auto',
    minHeight: '100%',
    minWidth: '100%',
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
        <Image src={`/${item.background}`} width={1920} height={934} layout='responsive' objectFit='cover' alt="Croqui Background" />
        <div className={classes.croqui}>
          <Image src={item.images[0].image.original} layout='fill' objectFit='contain' alt="Croqui image" />
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
              <Image src={`/${item.background}`} layout='fill' objectFit='contain' alt=""  />
            </div>
            <div className={classes.mobileCroqui}>
              <Image src={item.images[0].image.original} layout='fill' objectFit='contain' alt=""  />
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
