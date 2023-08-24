import React, {useState} from 'react'
import clsx from 'clsx'
import { makeStyles } from '@mui/styles'
import { Typography, Select, MenuItem, TextField, Button } from '@mui/material'
import {CartItemType} from '../../../slices/cartSlice'
import { formatMoney } from '../../../mixins/formatter'

const useStyles = makeStyles(theme => ({
  root:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: theme.spacing(10.5),
    [theme.breakpoints.down('md')]: {
      marginLeft: 0
    },
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  },
  infoColumn: {
    marginLeft: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
  },
  storeName: {
    fontSize: theme.spacing(1.5),
    fontFeatureSettings: "'liga' off, 'kern' off",
    color: '#999999',
  },
  nameText: {
    fontSize: theme.spacing(2),
  },
  codeText: {
    fontWeight: 600,
    fontSize: theme.spacing(1.5),
    letterSpacing: '1px',
    textTransform: 'uppercase',
    color: '#999999',
  },
  infoText: {
    marginTop: theme.spacing(0.5),
    fontSize: theme.spacing(1.5),
    fontFeatureSettings: "'liga' off, 'kern' off",
    color: '#999999',
  },
  priceText: {
    fontSize: theme.spacing(1.5),
    fontFeatureSettings: "'liga' off, 'kern' off",
    color: '#000000',
  },

  infoDisplay: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    [theme.breakpoints.down('md')]: {
      margin: 0,
      alignItems: 'flex-start',
    },
  },
  priceDisplay: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    [theme.breakpoints.down('md')]: {
      margin: 0,
    },
  },
  infoDisplayText: {
    marginTop: theme.spacing(2),
    fontWeight: 600,
    fontSize: theme.spacing(1.5),
    textTransform: 'uppercase',
  },
  priceDisplayText: {
    marginTop: theme.spacing(2),
    fontWeight: 400,
    fontSize: theme.spacing(1.5),
    textTransform: 'uppercase',
  },
  priceRoot: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    margin: '18px 0px',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'space-between',
    },
  },
  textField: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
  },
  selectShipment: {
    fontSize: theme.spacing(1.5),
    marginBottom: theme.spacing(1),
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontWeight: 600,
  },
}))

interface deliveryInfo {
  deadline: number,
  price: number
}

interface CartResumeProp {
    className?: string
    cartItems: CartItemType[]
    showAddress: boolean
}

const deliveryList = [
  {
    deadline: 7,
    price: 1000
  },
  {
    deadline: 10,
    price: 1100
  },
  {
    deadline: 3,
    price: 10000
  },
]
const CartResume = (props: CartResumeProp) => {
    const { showAddress, cartItems, className, ...rest } = props
    const [deliveryOption, setDeliveryOption] = useState<number>(0)
    const [promotionalCode, setPromotionalCode] = useState<string>('')
    const classes = useStyles()
    const historyList = undefined

    return (
      <div {...rest} className={clsx(classes.root, className)}>
        <Typography variant='h4'>Resumo</Typography>
        {
            cartItems && cartItems.map((cartItem, i) => (
                <div {...rest} className={classes.item}>
                    <img width={100} height={123} src={(cartItem.product.images && cartItem.product.images[0].path && cartItem.product.images[0].path.original) || ''} />
                    <div className={classes.infoColumn}>
                        <Typography className={classes.storeName}>{cartItem.product.vendor}</Typography>
                        <Typography className={classes.nameText}>{cartItem.product.title}</Typography>
                        <Typography className={classes.codeText}>{cartItem.product.id}</Typography>
                        <Typography className={classes.infoText}>{cartItem.product.description}</Typography>
                        <Typography className={classes.priceText}>{formatMoney(cartItem.product.contextualPricing.maxVariantPricing.price.amount)}</Typography>
                    </div>
                </div>
            ))
        }
        {showAddress ? 
        <React.Fragment>
          <div style={{width: '100%'}}>
            <Typography className={classes.selectShipment}>Selecione o envio</Typography> 
            <Select
              label="Estado"
              value={deliveryOption}
              fullWidth
              variant='outlined'
              onChange={event => setDeliveryOption(event.target.value as number)}
              >
            {deliveryList.map((item, i) =>
                <MenuItem value={i} key={i}> Até {item.deadline} Dias para entrega - {formatMoney(item.price)}</MenuItem>
            )}
            </Select>
          </div>
          <TextField
            className={classes.textField}
            onChange={event => setPromotionalCode(event.target.value as string)}
            value={promotionalCode}
            variant="outlined"
            fullWidth
            label='Insira código promocional'
            />
          
          <div className={classes.priceRoot}>
            <div className={classes.infoDisplay}>
              <Typography className={classes.infoDisplayText}>Frete</Typography>
              <Typography className={classes.infoDisplayText}>Total</Typography>
            </div>
            <div className={classes.priceDisplay}>
              <Typography className={classes.priceDisplayText}> {formatMoney(10000)} </Typography>
              <Typography className={classes.priceDisplayText}> {formatMoney(100)} </Typography>
            </div>
          </div>
          <Button variant='contained' fullWidth> Salvar e continuar</Button>
        </React.Fragment>
        : <React.Fragment />}
      </div>
    )
}

export default CartResume
