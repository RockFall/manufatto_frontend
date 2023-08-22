/* eslint-disable no-unused-vars */
import React from 'react'
import { makeStyles } from '@mui/styles'
import { Button, Hidden, Typography } from '@mui/material'
import Image from 'next/image'
//import { HighlightBanner } from '../../../../generated/graphql'
import { HighlightBanner } from '../../../../util/custom_types'
import { useRouter } from 'next/router'
const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
  },
  mobileCentering: {
    width: '100%',
    paddingTop: '140%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryImage: {
    width: '25.5%',
    height: '66%',
    position: 'absolute',
    top: '10%',
    left: '35%',
    zIndex: 3,
  },
  tertiaryImage: {
    width: '25.5%',
    height: '66%',
    position: 'absolute',
    top: '66%',
    left: '62%',
    zIndex: 2,
  },
  secondaryImage: {
    width: '25.5%',
    height: '66%',
    position: 'absolute',
    top: '43%',
    left: '15%',
    zIndex: 1,
  },
  primaryMobile: {
    width: '87%',
    paddingTop: '116%',
    position: 'absolute',
    top: '1.5%',
    left: '5%',
    zIndex: 3,
  },
  secondaryMobile: {
    width: '84%',
    paddingTop: '110%',
    position: 'absolute',
    top: '1%',
    left: '2%',
    zIndex: 2,
  },
  tertiaryMobile: {
    width: '84%',
    paddingTop: '110%',
    position: 'absolute',
    top: '4%',
    left: '10%',
    zIndex: 1,
  },
  backgroundMosaic: {
    width: '100%',
    paddingTop: '48.6%',
    initialScale: 1,
    maxWidth: '1920px',
    maxHeight: '934px',
  },
  title: {
    fontFamily: "Suisse Int\\'l",
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '72px',
    lineHeight: '80px',
  },
  subtitle: {
    fontFamily: "Suisse Int\\'l",
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '32px',
  },
  imageText: {
    padding: '0px',
    position: 'absolute',
    top: '27%',
    left: '62%',
    width: '438px',
    zIndex: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'justify',
  },
  mobileText: {
    position: 'absolute',
    bottom: '1%',
    padding: '0px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleMobile: {
    fontFamily: "Suisse Int\\'l",
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '40px',
    lineHeight: '48px',
  },
  subtitleMobile: {
    fontFamily: "Suisse Int\\'l",
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '32px',
  },
  bttnShopnow: {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    position: 'absolute',
    left: '42%',
    bottom: '20%',
    zIndex: 4,
  },
}))

interface MosaicBannerProps {
  item: HighlightBanner
  className?: string
}

const MosaicBanner = (props: MosaicBannerProps) => {
  const { item, className, ...rest } = props
  const classes = useStyles()
  const router = useRouter()

  return (
    <div className={classes.root}>
      <Hidden smDown>
        <div className={classes.backgroundMosaic}>
          <Image src={`/${item.background}`} layout='fill' alt="" />
          <div className={classes.primaryImage}>
            <Image src={item.images[0].image.originalWbp} width={488.15} height={615.81} layout='responsive' alt="" />
          </div>
          <div className={classes.secondaryImage}>
            <Image src={item.images[1].image.originalWbp} width={620} height={720} layout='responsive' alt="" />
          </div>
          <div className={classes.tertiaryImage}>
            <Image src={item.images[2].image.originalWbp} width={588} height={633} layout='responsive' alt="" />
          </div>
          <Button variant='outlined' className={classes.bttnShopnow} onClick={()=> router.push(item.links[0].url)}>
            {' '}
            Shop Now
          </Button>
          <div className={classes.imageText}>
            <Typography className={classes.title}>{item.title}</Typography>
            <Typography className={classes.subtitle}> {item.links[0].text} </Typography>
          </div>
        </div>
      </Hidden>
      <Hidden smUp>
        <div className={classes.mobileCentering}>
          <div className={classes.primaryMobile}>
            <Image src={item.images[0].image.originalWbp} layout='fill' alt="" />
          </div>
          <div className={classes.secondaryMobile}>
            <Image src={item.images[1].image.originalWbp} layout='fill' alt=""  />
          </div>
          <div className={classes.tertiaryMobile}>
            <Image src={item.images[2].image.originalWbp} layout='fill' alt=""  />
          </div>
        </div>
        <div className={classes.mobileText}>
          <Typography className={classes.titleMobile}>{item.title}</Typography>
          <Typography className={classes.subtitleMobile}> {item.links[0].text} </Typography>
        </div>
      </Hidden>
    </div>
  );
}

export default MosaicBanner
