/* eslint-disable no-unused-vars */
import React from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { makeStyles } from '@mui/styles'
import { Box, Typography, Button, Hidden } from '@mui/material'
import Image from "next/legacy/image"
import Util from '../../../../util/custom_formatter'
const useStyles = makeStyles(theme => ({
  
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    margin: '40px 0px',
  },
  
  info: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: '0px',
    maxWidth: '509px',
    maxHeight: '410px',
    margin: '0px 100px',
    [theme.breakpoints.down('md')]: {
      margin: '0px',
      maxWidth: '348px',
    },
  },
  button: {
    margin: '15px 0px',
    [theme.breakpoints.down('md')]: {
      width: '200px',
    },
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
  image: {
    height: 'auto',
    minHeight: '0%'
  },
}))

interface HighlightItemProps {
  className?: string
  src: string
  rightImage?: boolean
  title: string
  text: string
}

const HighlightItem = (props: HighlightItemProps) => {
  const { className, rightImage, src, title, text, ...rest } = props
  const classes = useStyles()
  const router = useRouter()

  return (
    <React.Fragment {...rest}>
      <Hidden mdDown>
        <Box className={clsx(className, classes.root)}>
          {!rightImage ? <Image className={classes.image} src={src} width={620} height={586} layout='intrinsic' alt=""  /> : <React.Fragment />}
          <Box className={classes.info}>
            <Typography variant='h4' className={classes.textTitle}>
              {' '}
              {title}{' '}
            </Typography>
            <Typography> {text} </Typography>
            <Button variant='outlined' className={classes.button}  onClick={()=> router.push(`/marcas/${Util.handleFromVendor(title)}`)}>
              {' '}
              Ver Produtos{' '}
            </Button>
          </Box>

          {rightImage ? <Image className={classes.image} src={src} width={620} height={586} layout='intrinsic' alt=""  /> : <React.Fragment />}
        </Box>
      </Hidden>
      <Hidden mdUp>
        <Box className={clsx(className, classes.root)}>
          <Image src={src} width={354} height={334} layout='fixed' alt="" />
          <Box className={classes.info}>
            <Typography variant='h4' className={classes.textTitle}>
              {' '}
              {title}{' '}
            </Typography>
            <Typography> {text} </Typography>
            <Button variant='outlined' className={classes.button} onClick={()=> router.push(`/marcas/${Util.handleFromVendor(title)}`)}>
              {' '}
              Ver Produtos{' '}
            </Button>
          </Box>
        </Box>
      </Hidden>
    </React.Fragment>
  );
}

export default HighlightItem
