/* eslint-disable no-unused-vars */
import React from 'react'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { Button, Typography, Container } from '@mui/material'
import { HighlightItem } from './components'
import Util from '../../util/custom_formatter'


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
    fontfamily: "Akshar",
    textTransform: 'uppercase',
  },
  subtitle: {
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '32px',
    textAlign: 'center',
    color: '#1D1D1F',
    fontfamily: "Lora",
  },
  button: {
    marginTop: theme.spacing(5)
  }
}))

interface HighlightsProps {
  className?: string,
  shopsList?: any[],
}

const Highlights = (props: HighlightsProps) => {
  const { className, shopsList, ...rest } = props
  const classes = useStyles()
  const router = useRouter()

  return (
    <Container className={clsx(className, classes.root)} maxWidth={false}>
      <div>
        <Typography className={classes.title}>nossas marcas</Typography>
        <Typography className={classes.subtitle}>Uma curadoria especial para você</Typography>
      </div>
      <div {...rest} className={classes.highlightItems}>
      {shopsList.map((shop, idx) => (
          <HighlightItem
            key={shop.name.text}
            src={`/brand/${Util.handleFromVendor(shop.name.text)}.svg`}
            text={shop.small_description.text}
            title={shop.name.text}
            rightImage={(idx + 1) % 2 === 0} // Set rightImage to true every second shop
          />
        ))}
      </div>
      <Button variant='contained' className={classes.button} onClick={()=> router.push(`/marcas`)}>VER TODAS AS MARCAS</Button>
    </Container>
  )
}

export default Highlights
