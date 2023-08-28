/* eslint-disable no-unused-vars */
import React from 'react'
import clsx from 'clsx'

import { makeStyles } from '@mui/styles'
import {
  Box,
  Typography,
  Button,
  Hidden,
  Container,
} from '@mui/material'
import Image from "next/legacy/image"
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    margin: '40px 0px',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: '0px',
    maxWidth: theme.spacing(65),
    margin: '0px 100px',
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(5),
      maxWidth: '348px',
    }
  },
  button: {
    margin: '15px 0px',
    [theme.breakpoints.down('md')]: {
      width: '200px',
    }
  },
  textTitle: {
    fontWeight: 600,
    fontSize: '72px',
    lineHeight: '80px',
    margin: '15px 0px',
  },
  text: {
    fontSize: '20px',
    lineHeight: '32px',
    margin: '15px 0px',
  },
}))

interface AboutHighlightProps {
  className?: string,
}



const AboutHighlight = (props: AboutHighlightProps) => {
  const { className, ...rest } = props
  const classes = useStyles()
  const croquiText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus non sit risus gravida tempor magnis. A in aliquet dignissim augue sit donec. Netus eget magna eu eleifend nullam pulvinar dignissim. Sit sit felis ullamcorper suspendisse leo diam. A nunc luctus nibh volutpat pellentesque turpis lectus aenean. Sapien in vitae magna nibh. Aliquam id arcu quam viverra consequat, adipiscing. Maecenas consectetur tellus aliquam nunc et cursus.'
  const costumizationText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus non sit risus gravida tempor magnis. A in aliquet dignissim augue sit donec. Netus eget magna eu eleifend nullam pulvinar dignissim. Sit sit felis ullamcorper suspendisse leo diam. A nunc luctus nibh volutpat lorem pellentesque turpis lectus aenean.'
  return (
    <Container className={classes.container}{...rest}>
      <Hidden mdDown>
        <Box className={clsx(className, classes.root)}>
          <Box className={classes.info}>
            <Typography variant='h4' className={classes.textTitle}> Estilo feito a mão </Typography>
            <Typography> {croquiText} </Typography>
            <Button variant='outlined' className={classes.button}> ver todos croquis </Button>
          </Box>
          <Image
            src={'/croqui1.png'}
            width={482}
            height={829}
            layout="intrinsic"
            alt=""
          />
        </Box>
      </Hidden>
      <Hidden mdUp>
        <Box className={clsx(className, classes.root)}>
          <Image
            src={'/croqui1.png'}
            width={354}
            height={609}
            layout="fixed"

            alt=""
          />
          <div className={classes.info}>
            <Typography variant='h4' className={classes.textTitle}> Estilo feito a mão </Typography>
            <Typography> {croquiText} </Typography>
            <Button variant='outlined' className={classes.button}> ver todos croquis </Button>
          </div>
          
        </Box>
      </Hidden>


      <Hidden mdDown>
        <Box className={clsx(className, classes.root)}>
          <Image
            src="/CustomBanner.svg"
            width={750}
            height={750}
            layout="fixed"
            alt=""
          />
          <Box className={classes.info}>
            <Typography variant='h4' className={classes.textTitle}> Customize os produtos com os nossos artistas </Typography>
            <Typography> {costumizationText} </Typography>
            <Button variant='outlined' className={classes.button}> Ver produtos </Button>
          </Box>
        </Box>
      </Hidden>
      <Hidden mdUp>
        <Box className={clsx(className, classes.root)}>

          <Image
            src="/CustomBanner.svg"
            width={480}
            height={480}
            layout="fixed"
            alt=""
          />
          <div className={classes.info}>
            <Typography variant='h4' className={classes.textTitle}> Customize os produtos com os nossos artistas </Typography>
            <Typography> {costumizationText} </Typography>
            <Button variant='outlined' className={classes.button}> Ver produtos </Button>
          </div>
        </Box>
      </Hidden>


    </Container>
  );
}

export default AboutHighlight
