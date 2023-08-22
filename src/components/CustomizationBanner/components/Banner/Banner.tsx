import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import Image from 'next/image'

const useStyles = makeStyles(theme => ({
  root: {},
  backgroundText: {
    position: 'absolute',
    margin: '23% 0 0 0',

    color: '#F29C91',
    fontWeight: 'normal',
    fontSize: '69px',

    width: '100%',
    whiteSpace: 'nowrap',
    textOverflow: 'clip',
    overflow: 'hidden',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    padding: '3% 3%',
  },
  image: {},
  text: {
    marginLeft: '5%',
  },
  titleText: {
    marginTop: '4%',

    color: '#EBE9DF',
    width: '52%',
    fontWeight: 600,
    fontSize: '37px',
    lineHeight: '39px',
  },
  infoText: {
    color: '#FFFFFF',
    width: '59%',
    marginTop: '35%',
    fontWeight: 'normal',
    fontSize: '15px',
    textAlign: 'justify',
  },
  button: {
    marginTop: '2%',
    padding: '1.8% 7%',

    color: '#FFFFFF',
    fontWeight: 500,
    fontSize: '12px',
    letterSpacing: '0.16em',
    border: '1px solid #FFFFFF',
  },
}))

const Banner = (props: any) => {
  const { className, ...rest } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <p className={classes.backgroundText}>Customização de Produtos. Customização de Produtos. Customização de Produtos.</p>

      <div className={classes.content}>
        <Image src='/CustomBanner.svg' width={840} height={840} alt=""  />
        <div className={classes.text}>
          <h2 className={classes.titleText}>Suas peças com um toque único e original.</h2>
          <p className={classes.infoText}>
            Escolha um produto com o selo ”customizável” e deixe que nossos designers ou artistas parceiros customizem pra você.
          </p>
          <Button className={classes.button}> Conheça</Button>
        </div>
      </div>
    </div>
  )
}

export default Banner
