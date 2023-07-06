import React, { useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Select, Hidden, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { useDispatch } from 'react-redux'
import { CartItem, CartRow } from './components'
import { Product } from '../../generated/graphql'
import { formatMoney } from '../../mixins/formatter'
import { CartItemType, updateCartItem, CartShopType } from '../../actions'

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
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(3),
    fontWeight: 600,
    fontSize: theme.spacing(1.5),
    textTransform: 'uppercase',
  },
  priceText: {
    marginTop: theme.spacing(1.5),
    fontWeight: 400,
    fontSize: theme.spacing(1.5),
    textTransform: 'uppercase',
  },
  separator: {
    width: '100%',
    borderBottom: '1px solid #C2C2C2',
  },
  shopTitle: {
    fontSize: theme.spacing(2.5),
    fontWeight: 600,
  }
}))

interface CartTableProps {
  className?: string
  products?: CartShopType[]
  setProducts?: any
  subtotal: number
}

const CartTable = (props: CartTableProps) => {
  const { className, products, setProducts, subtotal, ...rest } = props
  const classes = useStyles()
  const dispatch = useDispatch()

  const editItem = (index: number, item: CartItemType) => {
    dispatch(updateCartItem(item, index))
  }

  const handleCountChange = (qtd, i, j) => {
    let _products = products
    _products[i].cartItems[j] = {... _products[i].cartItems[j], count: Number(qtd)}
    setProducts([... _products])
    editItem(i, _products[i].cartItems[j]  as CartItemType)
    }

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.inner}>
        <Table>
          <Hidden smDown>
            <TableHead>
              <TableRow>
                <TableCell style={{ borderColor: '#C2C2C2', paddingLeft: 0 }}>Item</TableCell>
                <TableCell style={{ borderColor: '#C2C2C2' }}>Tamanho</TableCell>
                <TableCell style={{ borderColor: '#C2C2C2' }} align='right'>
                  Quantidade
                </TableCell>
                <TableCell style={{ borderColor: '#C2C2C2' }} align='right'>
                  Subtotal
                </TableCell>
                <TableCell style={{ borderColor: '#C2C2C2', paddingRight: 0 }} align='right'></TableCell>
              </TableRow>
            </TableHead>
          </Hidden>
          <TableBody>
            {products &&
              products.map((shop, i) => (
                <React.Fragment key={i}>
                  <Typography className={classes.shopTitle}> {shop.cartItems[0].product.shop.name} </Typography>
                  {shop.cartItems.map((product, j) => (
                    <React.Fragment key={j}>
                    <Hidden smDown>
                      <CartRow shippingPrice={1000} cartItem={product} setCount={(qtd) => handleCountChange(qtd, i, j)} lastItem={(j + 1) == shop.cartItems.length}/>
                    </Hidden>
                    <Hidden mdUp>
                      <CartRow shippingPrice={1000} mobile cartItem={product} setCount={(qtd) => handleCountChange(qtd, i, j)} lastItem={(j + 1) == shop.cartItems.length} />
                    </Hidden>
                  </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
          </TableBody>
        </Table>
        <Hidden smDown>
          <div className={classes.subtotalContainer}>
            <div className={classes.infoDisplay}>
              <Typography className={classes.infoText}>Subtotal</Typography>
            </div>
            <div className={classes.priceDisplay}>
              <Typography className={classes.priceText}>{formatMoney(subtotal)}</Typography>
            </div>
          </div>
          <div className={classes.separator} />
        </Hidden>
      </div>
    </div>
  )
}

export default CartTable
