import React, {useState} from 'react'
import { makeStyles } from '@mui/styles'
import { Button, Typography, Link, Hidden } from '@mui/material'
import { useRouter } from 'next/router'
import {Breadcrumbs, ContactUsForm} from '../components'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import theme from '../theme'

const useStyles = makeStyles(theme => ({
  root: {
    margin: '18px 188px',
    marginTop: theme.spacing(10),
    display: 'flex',
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
    maxWidth: theme.spacing(45),
  },
  infoText: {
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: theme.spacing(2),
    lineHeight: '24px',
    maxWidth: theme.spacing(55),
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
                <Typography variant='h1'>Olá!</Typography>
                <Typography className={classes.subtitle}>Dúvidas, sugestões ou reclamações? Estamos aqui para ouvir você.</Typography>
                <Typography className={classes.infoText}>Envie seus dados que entraremos em contato o quanto antes. Se quiser entender mais sobre <Link>trocas e devoluções</Link> acesse nossa página.</Typography>
            </div>
            <ContactUsForm className={classes.form} onSubmit={onSubmit} />
        </div>
    </div>
  )
}
