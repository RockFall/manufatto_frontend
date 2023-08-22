import React from 'react'
import { makeStyles } from '@mui/styles'
import { Button, Grid } from '@mui/material'
import Image from 'next/image'

const useStyles = makeStyles(theme => ({
  root: {
    padding: '11% 8%',
  },
  content: {},
  titleText: {
    color: '#EBE9DF',
    fontWeight: 600,
    fontSize: '37px',
    lineHeight: '39px',
  },
  infoText: {
    color: '#FFFFFF',
    marginTop: '4%',
    fontWeight: 'normal',
    fontSize: '15px',
    textAlign: 'justify',
  },
  button: {
    marginTop: '4%',
    padding: '1.8% 7%',

    color: '#FFFFFF',
    fontWeight: 500,
    fontSize: '12px',
    letterSpacing: '0.16em',
    border: '1px solid #FFFFFF',
  },
}))

const BannerMobile = (props: any) => {
  const { className, ...rest } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid className={classes.content} container justifyContent='space-between' direction='column'>
        <h2 className={classes.titleText}>Suas peças com um toque único e original.</h2>
        <Image src='/CustomBannerMobile.svg' width={1100} height={1100} alt=""  />
        <p className={classes.infoText}>
          Escolha um produto com o selo ”customizável” e deixe que nossos designers ou artistas parceiros customizem pra você.
        </p>
        <Button className={classes.button}> Conheça</Button>
      </Grid>
    </div>
  );
}

export default BannerMobile
