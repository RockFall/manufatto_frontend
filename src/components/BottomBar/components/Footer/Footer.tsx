import React from 'react'
import { makeStyles } from '@mui/styles'
import { LockOutlined, Facebook, Instagram, Twitter } from '@mui/icons-material/'
import { Grid, IconButton, Link } from '@mui/material'
import Image from "next/legacy/image"

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',

    flexGrow: 1,
  },
  footer: {
    padding: '3.8% 10%',
    background: '#1D1D1F;',
    color: '#EBE9DF',
  },
  bio: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '27%',
    textAlign: 'justify',
  },
  menu: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginBottom: '6%',
    textDecoration: 'none',
  },
  sign: {
    background: '#EBE9DF',
    padding: '0% 8%',
    fontSize: '12px',
    color: '#6F6C6B',
  },
  signCopyright: {
    width: '35%',
  },
  signInfo: {
    display: 'flex',
    flexDirection: 'row',
    width: '63%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  safeSiteWarn: {
    marginRight: theme.spacing(1),
  },
  infoText: {
    marginRight: theme.spacing(2),
  },
  iconButton: {
    width: '33%',
    padding: '3px 1.2px',
  },
}))

const Footer = (props: any) => {
  const { className, ...rest } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {/*Footer*/}
      <Grid container justifyContent='space-between' className={classes.footer}>
        {/* Descrição Manuffato */}
        <div className={classes.bio}>
          <Image src='/Logo.svg' alt='Logo' width={200} height={70} object-fit='cover' />
          <p>
            Nossa missão é fomentar o mercado de moda fazendo uma curadoria das principais marcas emergentes do país, promovendo um
            ecossistema de relacionamento entre o público e os lojistas para comercialização de seus produtos.
          </p>
        </div>

        <div>
          <Image src='/slogan-elipse.svg' alt='slogan' width={80} height={80} object-fit='cover' />
        </div>

        <div className={classes.menu}>
          <Link href='#' color='inherit'>
            Minha conta
          </Link>

          <Link href='#' color='inherit'>
            Minha conta
          </Link>

          <Link href='#' color='inherit'>
            Favoritos
          </Link>

          <Link href='#' color='inherit'>
            Histórico de compras
          </Link>
        </div>

        <div className={classes.menu}>
          <Link href='#' color='inherit'>
            Institucional
          </Link>

          <Link href='#' color='inherit'>
            Sobre a Manuffato
          </Link>

          <Link href='#' color='inherit'>
            Quero Participar
          </Link>

          <Link href='#' color='inherit'>
            Fale conosco
          </Link>
        </div>

        <div className={classes.menu}>
          <Link href='#' color='inherit'>
            Legal
          </Link>

          <Link href='#' color='inherit'>
            Termos de uso
          </Link>

          <Link href='#' color='inherit'>
            Política de privacidade
          </Link>

          <Link href='#' color='inherit'>
            Trocas e devoluções
          </Link>
        </div>
      </Grid>

      <Grid container justifyContent='space-between' alignItems='center' className={classes.sign}>
        <p className={classes.signCopyright}> © Copyright 2021 - Manufatto, All Right Reserved </p>

        <div className={classes.signInfo}>
          <div className={classes.info}>
            <p className={classes.infoText}>Formas de pagamento </p>
            <Image src='/cards.svg' alt='creditCards' width={140} height={50} />
          </div>

          <div className={classes.info}>
            <p className={classes.safeSiteWarn}>Site seguro</p>
            <LockOutlined color='disabled' />
          </div>

          <div>
            <IconButton className={classes.iconButton} size="large">
              <Facebook color='action' />
            </IconButton>

            <IconButton className={classes.iconButton} size="large">
              <Twitter color='action' />
            </IconButton>

            <IconButton className={classes.iconButton} size="large">
              <Instagram color='action' />
            </IconButton>
          </div>
        </div>
      </Grid>
    </div>
  );
}

export default Footer
