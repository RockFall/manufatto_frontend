import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import { formatMoney } from '../../../../../mixins/formatter'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-between',
    },
  },
  infoDisplay: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(0.5),
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      alignItems: 'flex-start',
    },
  },
  historyPriceDisplay: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      margin: 0,
    },
  },
  infoText: {
    fontWeight: 600,
    marginRight: theme.spacing(6),
    fontSize: theme.spacing(1.5),
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  priceText: {
    marginTop: theme.spacing(2),
    fontWeight: 400,
    fontSize: theme.spacing(2),
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  specialPriceText: {
    marginTop: theme.spacing(2),
    fontWeight: 600,
    fontSize: theme.spacing(2),
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
}))

interface HistoryPriceDisplayProp {
  subtotal: number
  shipmentPrice: number
  totalPrice: number
}

const HistoryPriceDisplay = (props: HistoryPriceDisplayProp) => {
  const { subtotal, totalPrice, shipmentPrice } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.infoDisplay}>
        <Typography className={classes.infoText}>Subtotal</Typography>
        <Typography className={classes.infoText}>Frete</Typography>
        <Typography className={classes.infoText}>Total</Typography>
      </div>
      <div className={classes.historyPriceDisplay}>
        <Typography className={classes.priceText}> {formatMoney(subtotal)} </Typography>
        <Typography className={classes.priceText}> {formatMoney(shipmentPrice)} </Typography>
        <Typography className={classes.specialPriceText}> {formatMoney(totalPrice)} </Typography>
      </div>
    </div>
  )
}

export default HistoryPriceDisplay
