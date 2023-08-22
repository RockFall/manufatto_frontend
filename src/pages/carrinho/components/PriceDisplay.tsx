import React from 'react'
import { makeStyles } from '@mui/styles'
import { Typography } from '@mui/material'
import { formatMoney } from '../../../mixins/formatter'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    margin: '18px 0px',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'space-between',
    },
  },
  infoDisplay: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginLeft: theme.spacing(6),
    [theme.breakpoints.down('md')]: {
      margin: 0,
      alignItems: 'flex-start',
    },
  },
  priceDisplay: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginLeft: theme.spacing(6),
    [theme.breakpoints.down('md')]: {
      margin: 0,
    },
  },
  infoText: {
    marginTop: theme.spacing(2),
    fontWeight: 600,
    fontSize: theme.spacing(1.5),
    textTransform: 'uppercase',
  },
  priceText: {
    marginTop: theme.spacing(2),
    fontWeight: 400,
    fontSize: theme.spacing(1.5),
    textTransform: 'uppercase',
  },
}))

interface PriceDisplayProp {
  subtotal: number
  shipmentPrice: number
  totalPrice: number
}

const PriceDisplay = (props: PriceDisplayProp) => {
  const { subtotal, totalPrice, shipmentPrice } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.infoDisplay}>
        <Typography className={classes.infoText}>Subtotal</Typography>
        <Typography className={classes.infoText}>Frete</Typography>
        <Typography className={classes.infoText}>Total</Typography>
      </div>
      <div className={classes.priceDisplay}>
        <Typography className={classes.priceText}> {formatMoney(subtotal)} </Typography>
        <Typography className={classes.priceText}> {formatMoney(shipmentPrice)} </Typography>
        <Typography className={classes.infoText}> {formatMoney(totalPrice)} </Typography>
      </div>
    </div>
  )
}

export default PriceDisplay
