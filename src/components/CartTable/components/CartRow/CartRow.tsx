import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Select, IconButton, TableCell, TableRow, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import { CartItem } from '../'
import { formatMoney } from '../../../../mixins/formatter'
import {CartItemType} from '../../../../actions'

const useStyles = makeStyles((theme) => ({
  root: {},
  inner: {},
  size: {
    fontSize: theme.spacing(2),
    color: '#1D1D1F',
  },
  qtdSelectField: {
    border: '1px solid #E0E0E0',
    width: theme.spacing(15.25),
  },
  buttonColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  closeIcon: {
    width: '11px',
    height: '11px',
    color: '#757575',
  },
  deleteText: {
    fontSize: theme.spacing(1.5),
    color: '#1D1D1F',
    fontFeatureSettings: "'liga' off, 'kern' off",
  },
  subtotalContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  infoDisplay: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginLeft: theme.spacing(6),
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      alignItems: 'flex-start',
    },
  },
  priceDisplay: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginLeft: theme.spacing(6),
    [theme.breakpoints.down('sm')]: {
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
  separator: {
    width: '100%',
    borderBottom: '1px solid',
    borderColor: 'inherit',
  },
  buttonRow: {
    marginLeft: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    textAlign: 'center',
    marginRight: theme.spacing(8),
  },
  mobileCell: {
    width: '100%',
    justifyContent: 'center',
  },
  mobileinfo: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'space-around',
  },
  mobileQtdSelectField: {
    border: '1px solid #E0E0E0',
    width: theme.spacing(8.5),
  },
  mobileInfoBlock: {
    marginBottom: theme.spacing(2.5),
  },
  mobileShippingText: {
    color: '#6F6C6B',
    fontSize: theme.spacing(2),
  }
}))

interface CartRowProps {
  className?: string
  cartItem?: CartItemType
  setCount: any
  mobile?: boolean
  lastItem?: boolean
  shippingPrice: number
}

const CartRow = (props: CartRowProps) => {
  const { shippingPrice, lastItem, setCount, mobile, className, cartItem } = props
  const classes = useStyles()

  if (mobile) {
    return (
      <TableRow hover className={className}>
        <TableCell className={classes.mobileCell} style={{borderBottom: lastItem ? 'inline' : 'none',}}>
          <CartItem cartItem={cartItem} />
          <div className={classes.mobileinfo}>
            <div className={classes.buttonRow}>
              <IconButton aria-label='fechar' size='small'>
                <CloseIcon className={classes.closeIcon} />
              </IconButton>
              <Typography className={classes.deleteText}>Delete</Typography>
            </div>
            <div>
              <div className={classes.mobileInfoBlock}>
                <Typography className={classes.size}>Tamanho</Typography>
                <Typography>{(cartItem.productDetail?.size) || 'PP'}</Typography>
              </div>
              <div className={classes.mobileInfoBlock}>
                <Typography className={classes.size}>Quantidade</Typography>
                <Select
                  native
                  variant='outlined'
                  className={classes.mobileQtdSelectField}
                  value={cartItem.count}
                  onChange={(e) => setCount(e.target.value)}
                  label='Qtd'
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                </Select>
              </div>
              <div className={classes.mobileInfoBlock}>
                <Typography className={classes.size}>Subtotal</Typography>
                <Typography>{formatMoney(cartItem.product.contextualPricing.maxVariantPricing.price.amount)}</Typography>
                <Typography className={classes.mobileShippingText}>{lastItem ? `Frete: ${formatMoney(shippingPrice)}`: ''}</Typography>
              </div>
            </div>
          </div>
        </TableCell>
      </TableRow>
    )
  }

  return (
    <TableRow hover className={className}>
      <TableCell style={{ paddingLeft: 0, borderBottom: lastItem ? 'inline' : 'none', borderColor: '#C2C2C2' }}>
        <CartItem cartItem={cartItem} />
      </TableCell>
      <TableCell className={classes.size} style={{ borderBottom: lastItem ? 'inline' : 'none', borderColor: '#C2C2C2' }}>
        {cartItem.productDetail?.size || 'PP'}
      </TableCell>
      <TableCell align='right' style={{ borderBottom: lastItem ? 'inline' : 'none', borderColor: '#C2C2C2' }}>
        <Select native variant='outlined' className={classes.qtdSelectField} value={cartItem.count} onChange={(e) => setCount(e.target.value)} label='Qtd'>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
        </Select>
      </TableCell>
      <TableCell align='right' className={classes.size} style={{ borderBottom: lastItem ? 'inline' : 'none', borderColor: '#C2C2C2' }}>
        {lastItem ? formatMoney(shippingPrice) : ''}
      </TableCell> 
      <TableCell align='right' className={classes.size} style={{ borderBottom: lastItem ? 'inline' : 'none', borderColor: '#C2C2C2' }}>
        {formatMoney(cartItem.product.contextualPricing.maxVariantPricing.price.amount)}
      </TableCell>
      <TableCell align='right' style={{ paddingRight: 0, borderBottom: lastItem ? 'inline' : 'none', borderColor: '#C2C2C2' }}>
        <div className={classes.buttonColumn}>
          <Typography className={classes.deleteText}>Delete</Typography>
          <IconButton aria-label='fechar' size='small'>
            <CloseIcon className={classes.closeIcon} />
          </IconButton>
        </div>
      </TableCell>
    </TableRow>
  )
}

export default CartRow
