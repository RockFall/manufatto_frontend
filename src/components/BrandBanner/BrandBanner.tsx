import React from 'react'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'
import { Container, Typography, Link, Hidden } from '@mui/material'
import Image from "next/legacy/image"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Shop } from '../../generated/graphql'
import Breadcrumbs from '../Breadcrumbs'
const useStyles = makeStyles(theme => ({
  root: {
    zIndex:-2,
    background: '#EBE9DF',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3),
    paddingLeft: 0,
  },
  content: {
    zIndex:1,
    width: '100%',
    display: 'flex',
    transform: 'scale(1)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyItems: 'center',
    padding: '0px 128px 0px 0px',
    margin: '21px 188px 51px 188px',
    [theme.breakpoints.down('lg')]: {
      padding: '30px 32px',
      flexDirection: 'column',
      margin: '0px',
    },
  },
  history: {
    zIndex:1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: '0px 188px',
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      margin: '18px 28px',
    }
  },
  rootMobileDirection: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  brandInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    maxWidth: '756px',
    padding: '52px 32px',
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
  shopName: {
    fontFamily: "Suisse Int\\'l",
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '72px',
    lineHeight: '80px',
    color: '#1D1D1F',
    paddingBottom: '32px',
  },
  brandText: {
    fontFamily: "Suisse Int\\'l",
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '20px',
    lineHeight: '32px',
    color: '#6F6C6B',
  },
  prod: {
    fontSize: '12px',
    fontWeight: 600,
  },
  arrowIcon: {
    fontSize: '8px',
    margin: '0px 8px',
    color: '#6F6C6B',
  },
  link: {
    fontSize: '12px',
    fontWeight: 200,
    color: '#6F6C6B',
  },
  backgroundImage: {
    position: 'absolute',
    zIndex: 0,
    width: '100%',
  },
}))
interface BrandsBannerProps {
  className?: string
  shop?: any
}

const BrandsBanner = (props: BrandsBannerProps) => {
  const { className, shop, ...rest } = props
  const classes = useStyles()
  return (
    <Container className={clsx(className, classes.root)} maxWidth={false}>
      <Breadcrumbs path={[{name: 'Marcas', url: '/marcas'}]} page={shop?.name.text} className={classes.history}/>
      <Hidden lgDown>
        <div className={classes.backgroundImage}>
          <img src={shop?.background? `/${shop.background.text}.png` : '/Bg-cold4.png'} width='100%' height='934px'/>
        </div>
      </Hidden>
      <div className={classes.content}>
        <div>
          <Image src={'/brand/brand9.svg'} layout='fixed' width={620} height={586} alt=""  />
        </div>
        <div className={classes.brandInfo}>
          <Typography className={classes.shopName}> {shop?.name.text || ""}</Typography>
          <Typography className={classes.brandText}> {shop?.small_description.text || ""} </Typography>
        </div>
      </div>
    </Container>
  );
}

export default BrandsBanner
