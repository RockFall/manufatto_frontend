import React, {useState} from 'react'
import { makeStyles } from '@mui/styles'
import { Button, Typography, Link, Hidden } from '@mui/material'
import { useRouter } from 'next/router'
import {JoinUsForm, Breadcrumbs} from '../components'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import theme from '../theme'

const useStyles = makeStyles(theme => ({
  root: {
    margin: '18px 188px',
    display: 'flex',
    marginTop: theme.spacing(10),
    marginLeft: '10%',
    flexDirection: 'row',
    [theme.breakpoints.down('md')]: {
      margin: '18px 28px',
      flexDirection: 'column',
    }
  },
  textContainer: {
      
  },
  subtitle: {
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: theme.spacing(3),
    lineHeight: '32px',
    maxWidth: theme.spacing(65),
  },
  infoText: {
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: theme.spacing(2),
    lineHeight: '24px',
    maxWidth: theme.spacing(65),
    color: '#6F6C6B',
  },

  history: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    position: 'relative',
    marginLeft: '10%',
    [theme.breakpoints.down('md')]: {
        margin: '18px 28px',
    }
  },
  link: {
    fontSize: '12px',
    color: '#6F6C6B',
    fontWeight: 400,
  },
  arrowIcon: {
    fontSize: '8px',
    margin: '0px 8px',
  },
  prod: {
    fontSize: '12px',
    fontWeight: 600,
  },
  container: {
    padding: theme.spacing(3),
  }, 
  form: {
    marginLeft: '12%',
    [theme.breakpoints.down('md')]: {
        marginLeft: 0,
        paddingLeft: 0
      }
  }
}))

export default function Index() {
  const classes = useStyles()
  const router = useRouter()
  const onSubmit = (data) => {
      console.log(data)
  }
  
  return (
    <div className={classes.container}>
        <Breadcrumbs page='Fale conosco' className={classes.history}/>
        <div className={classes.root}>
            <div className={classes.textContainer}>
                <Typography variant='h1'>Faça parte</Typography>
                <Typography className={classes.subtitle}>Tem uma marca ou loja e quer fazer parte da Manufatto?</Typography>
                <Typography className={classes.infoText}>Envie seus dados para gente e aguarde nosso contato. Se quiser saber um pouco mais sobre a marca, acesso a página <Link>Sobre a Manufatto</Link> ou entre em nossas redes sociais.</Typography>
            </div>
            <JoinUsForm className={classes.form} onSubmit={onSubmit} />
        </div>
    </div>
  )
}
