import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import {
  Container,
  Typography,
  Hidden,
  Link,
} from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import Image from 'next/image'
import {Breadcrumbs} from '../'
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    transform: "scale(1)",
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    }
  },
  content: {
    width: '100%',
    display: 'flex',
    transform: "scale(1)",
    flexDirection: 'row',
    justifyItems: 'center',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(12),
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      margin: '0px',
      marginTop: theme.spacing(3),
      alignItems: 'center',
    }

  },
  about: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    margin: theme.spacing(2),
    marginLeft: theme.spacing(9),
    marginRight: '20%',
    width: '100%',
    maxWidth: theme.spacing(82),
    [theme.breakpoints.down('md')]: {
      margin: '0px',
    }
  },
  aboutTitle: {
    fontFamily: "Suisse Int\\'l",
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: theme.spacing(9),
    lineHeight: '80px',
    color: '#1D1D1F',
    paddingBottom: '32px',
  },
  aboutText: {
    fontFamily: "Suisse Int\\'l",
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: theme.spacing(2.5),
    lineHeight: '32px',
    color: '#6F6C6B',
  },
  bg: {
    width: '100vw',
    height: '100%',
    position: 'absolute',
    top: '0px',
    left: '0px',
    zIndex: -1,
  },prod: {
    fontSize: '12px',
    fontWeight: 600,
  },
  spacing: {
    paddingLeft: theme.spacing(24),
    [theme.breakpoints.down('md')]: {
      padding: 0,
      flexDirection: 'column',
      margin: '0px',
    }
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
      <Hidden mdDown>
        <div className={classes.bg}>
          <img src='/light1.png' width='100%' height='934px'/>
        </div>
      </Hidden>
      <div className={classes.spacing}>
        <Breadcrumbs page='Sobre'/>
        <div className={classes.content}>
        
          <div>
            <Image
              src={'/About.svg'}
              layout='fixed'
              width={577}
              height={676}
              alt=""
            />
          </div>
          <div className={classes.about}>
            <Typography className={classes.aboutTitle}> Somos a manufatto</Typography>
            <Typography className={classes.aboutText} gutterBottom> 
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus non sit risus gravida tempor magnis. A in aliquet dignissim augue sit donec. Netus eget magna eu eleifend nullam pulvinar dignissim. Sit sit felis ullamcorper suspendisse leo diam. A nunc luctus nibh volutpat pellentesque turpis lectus aenean. Sapien in vitae magna nibh. Aliquam id arcu quam viverra consequat, adipiscing. 
              <br/> <br/>
              Maecenas consectetur tellus aliquam nunc et cursus. Ultrices maecenas imperdiet facilisis viverra. Ut tellus sit quis aenean diam neque, commodo tempor, libero. Sem turpis eget lorem et. Non viverra quam ornare facilisis. Iaculis tincidunt porttitor lacus lacus habitant leo. Maurorais metus, aliquam mus aliquam est pellentesque lacus. Etiam enim loegestas nunc mi sagittis adipiscing.
            </Typography>
          </div>
        </div>
      </div>
    </Container>
  )
}


export default AboutBanner
