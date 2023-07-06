import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import {
  Container,
  Typography,
  Hidden,
  Link,
  Button,
} from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import Image from 'next/image'
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    background: '#F03E1B',
    transform: "scale(1)",
    flexDirection: 'column',
    alignItems: 'center',
    justifyItems: 'center',
    height: theme.spacing(115),
  },
  content: {
    maxWidth: '654px',
    zIndex: 3,
    display: 'flex',
    transform: "scale(1)",
    flexDirection: 'column',
    alignItems: 'center',
    justifyItems: 'center',
    marginTop: theme.spacing(13),
    marginBottom: theme.spacing(12),
    [theme.breakpoints.down('md')]: {
      padding: '30px 32px',
      flexDirection: 'column',
      margin: '0px',
    }

  },
  title: {
    fontFamily: "Suisse Int\\'l",
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: theme.spacing(7),
    lineHeight: '80px',
    color: '#EBE9DF',
    marginBottom: theme.spacing(3),
    textAlign: 'center',
  },
  text: {
    fontFamily: "Suisse Int\\'l",
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: theme.spacing(2.5),
    lineHeight: '32px',
    color: '#EBE9DF',
    textAlign: 'center',
    marginBottom: theme.spacing(5),
  },
  button: {
    color: '#FFFFFF',
    border: '1px solid #FFFFFF',
    '&:hover': {
      backgroundColor: '#C1BBA7',
      color: '#1D1D1F',
    },
    '&:active': {
      backgroundColor: '#EBE9DF',
      color: '#1D1D1F',
    }
  },
  topLeftImage:{
    position: 'fixed',
    top: 0,
    left: theme.spacing(17),
    zIndex: 2,
  },
  topRightImage:{
    position: 'fixed',
    top: 0,
    right: 0,
    zIndex: 2,
  },
  leftImage:{
    position: 'fixed',
    top: theme.spacing(30),
    left: '0px',
    opacity: 0.6,
    zIndex: 1,
  },
  rightImage:{
    position: 'fixed',
    top: theme.spacing(36),
    right: theme.spacing(20),
    opacity: 0.6,
    zIndex: 1,
  },
  bottomLeftImage:{
    position: 'fixed',
    top: theme.spacing(61),
    left: theme.spacing(36),
    zIndex: 2,
  },
  bottomRightImage:{
    position: 'fixed',
    bottom: '-10px',
    right: theme.spacing(72),
    opacity: 0.4,
    zIndex: 2,
  },
  imagesBg: {
    position: 'fixed',
  }

}))
interface AboutBannerProps {
  className?: string,
}

const AboutBanner = (props: AboutBannerProps) => {
  const { className, ...rest } = props
  const classes = useStyles()

  return (
    <Container className={clsx(className, classes.root)} maxWidth={false} >
      
      <div className={classes.content}>
        <Typography className={classes.title}> Nossa curadoria </Typography>
        <Typography className={classes.text}> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus non sit risus gravida tempor magnis. A in aliquet dignissim augue sit donec. Netus eget magna eu eleifend nullam pulvinar dignissim. Sit sit felis ullamcorper suspendisse leo diam. A nunc luctus nibh volutpat pellentesque turpis lectus aenean. Sapien in vitae magna nibh.</Typography>
        <Button variant='outlined' className={classes.button}>ver todas as marcas</Button>
      </div>
      <Hidden mdDown>
        <div className={classes.imagesBg}>
          <div className={classes.topLeftImage}>
            <Image
              src={'/brand/brand8.svg'}
              layout='fixed'
              width="354px"
              height="334px"
            />
          </div>
          <div className={classes.leftImage}>
            <Image
              src={'/brand/brand4.svg'}
              layout='fixed'
              width="354px"
              height="334px"
            />
          </div>
          <div className={classes.bottomLeftImage}>
            <Image
              src={'/brand/brand1.svg'}
              layout='fixed'
              width="354px"
              height="334px"
            />
          </div>
          <div className={classes.topRightImage}>
            <Image
              src={'/brand/brand6.svg'}
              layout='fixed'
              width="354px"
              height="334px"
            />
          </div>
          <div className={classes.rightImage}>
            <Image
              src={'/brand/brand2.svg'}
              layout='fixed'
              width="354px"
              height="334px"
            />
          </div>
          <div className={classes.bottomRightImage}>
            <Image
              src={'/brand/brand9.svg'}
              layout='fixed'
              width="354px"
              height="334px"
            />
          </div>
        </div>
      </Hidden>
    </Container>
  )
}


export default AboutBanner
