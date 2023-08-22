import React from 'react'
import { makeStyles } from '@mui/styles'
import { LockOutlined, Facebook, Instagram, Twitter } from '@mui/icons-material/'
import { Grid, IconButton } from '@mui/material'
import Image from 'next/image'

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
  },
  menu: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginBottom: '6%',
  },
  sign: {
    background: '#EBE9DF',
    padding: '0% 8%',
    fontSize: '12px',
    color: '#6F6C6B',
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  copyright: {
    fontSize: '10px',
  },
  safeSiteWarn: {
    marginTop: '17%',
  },
  iconGroup: {
    margin: '2% 0 2% 0',
  },
  iconButton: {
    width: '33%',
    padding: '3px 1.2px',
  },
}))

const FooterMobile = (props: any) => {
  const { className, ...rest } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {/*Footer*/}
      <Grid direction='column' container justifyContent='space-between' className={classes.footer}>
        {/* Descrição Manuffato */}
        <div className={classes.bio}>
          <Image src='/Logo.svg' alt='Logo' width={200} height={70} object-fit='cover' />
          <p>
            Nossa missão é fomentar o mercado de moda fazendo uma curadoria das principais marcas emergentes do país, promovendo um
            ecossistema de relacionamento entre o público e os lojistas para comercialização de seus produtos.
          </p>
        </div>

        {/* Imagem 2, segundo item do footer */}
        <div>
          <Image src='/slogan-elipse.svg' alt='slogan' width={80} height={80} object-fit='cover' />
        </div>

        {/* Primeiro menu  */}
        <div style={{ marginTop: '3%' }} className={classes.menu}>
          <a onClick={() => {}}>Minha conta</a>

          <a onClick={() => {}}>Minha conta</a>

          <a onClick={() => {}}>Favoritos</a>

          <a onClick={() => {}}>Histórico de compras</a>
        </div>

        {/* Segundo menu  */}
        <div className={classes.menu}>
          <a onClick={() => {}}>Institucional</a>

          <a onClick={() => {}}>Sobre a Manuffato</a>

          <a onClick={() => {}}>Quero Participar</a>

          <a onClick={() => {}}>Fale conosco</a>
        </div>

        {/* Terceiro menu  */}
        <div className={classes.menu}>
          <a onClick={() => {}}>Legal</a>

          <a onClick={() => {}}>Termos de uso</a>

          <a onClick={() => {}}>Política de privacidade</a>

          <a onClick={() => {}}>Trocas e devoluções</a>
        </div>
      </Grid>

      {/*Sign*/}
      <Grid container direction='column' justifyContent='space-between' alignItems='center' className={classes.sign}>
        <p>Formas de pagamento </p>
        <Image src='/cards.svg' alt='creditCards' width={190} height={50} />

        <div className={classes.info}>
          <p className={classes.safeSiteWarn}>Site seguro </p>
          <LockOutlined fontSize='small' color='disabled' />
        </div>

        <div className={classes.iconGroup}>
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

        <p className={classes.copyright}> © Copyright 2021 - Manufatto, All Right Reserved </p>
      </Grid>
    </div>
  );
}

export default FooterMobile
