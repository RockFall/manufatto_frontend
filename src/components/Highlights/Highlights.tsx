/* eslint-disable no-unused-vars */
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { Button, Typography, Container } from '@material-ui/core'
import { HighlightItem } from './components'
const useStyles = makeStyles(theme => ({
  highlightItems: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0px',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0px 0px 88px', //era '88px 0px'
    padding: '40px 96px 96px', //era '96px'
    paddingBottom: '0px',
  },
  title: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '24px',
    textAlign: 'center',
    letterSpacing: '0.08em',
    color: '#6F6C6B',
    fontfamily: "Suisse Int\\'l",
    textTransform: 'uppercase',
  },
  subtitle: {
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '32px',
    textAlign: 'center',
    color: '#1D1D1F',
    fontfamily: "Suisse Int\\'l",
  },
  button: {
    marginTop: theme.spacing(5)
  }
}))

interface HighlightsProps {
  className?: string
}

const Highlights = (props: HighlightsProps) => {
  const { className, ...rest } = props
  const classes = useStyles()

  return (
    <Container className={clsx(className, classes.root)} maxWidth={false}>
      <div>
        <Typography className={classes.title}>nossas marcas</Typography>
        <Typography className={classes.subtitle}>Uma curadoria especial para você</Typography>
      </div>
      <div {...rest} className={classes.highlightItems}>
        <HighlightItem
          src={'/brand/brand4.svg'}
          text='An mel corpora consectetuer. Duo veri eripuit honestatis ei. Mandamus expetenda has ex. Eu minim movet quodsi eum.  Lorem ipsum dolor seat meadimed conor.'
          title='Mabô Rio'
        />
        <HighlightItem
          src={'/brand/brand2.svg'}
          text='An mel corpora consectetuer. Duo veri eripuit honestatis ei. Mandamus expetenda has ex. Eu minim movet quodsi eum.  Lorem ipsum dolor seat meadimed conor.'
          title='Burberry'
          rightImage
        />
        <HighlightItem
          src={'/brand/brand3.svg'}
          text='An mel corpora consectetuer. Duo veri eripuit honestatis ei. Mandamus expetenda has ex. Eu minim movet quodsi eum.  Lorem ipsum dolor seat meadimed conor.'
          title='Tommy Hilfiger'
        />
        <HighlightItem
          src={'/brand/brand1.svg'}
          text='An mel corpora consectetuer. Duo veri eripuit honestatis ei. Mandamus expetenda has ex. Eu minim movet quodsi eum.  Lorem ipsum dolor seat meadimed conor.'
          title='Damsel In Dior'
          rightImage
        />
      </div>
      <Button variant='contained' className={classes.button}>VER TODAS AS MARCAS</Button>
    </Container>
  )
}

export default Highlights
