import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@mui/styles'
import { Typography } from '@mui/material'

import {CartItemType} from '../../../../actions'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
}))

interface CartItemProps {
  className?: string
  cartItem: CartItemType
}

const CartItem = (props: CartItemProps) => {
  const { className, cartItem, ...rest } = props
  const classes = useStyles()

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <img width={100} height={123} src={(cartItem.product.images && cartItem.product.images[0].path && cartItem.product.images[0].path.original) || ''} />
      <div className={classes.infoColumn}>
        <Typography className={classes.storeName}>{cartItem.product.vendor}</Typography>
        <Typography className={classes.nameText}>{cartItem.product.title}</Typography>
        <Typography className={classes.codeText}>{cartItem.product.id}</Typography>
        <Typography className={classes.infoText}> {`tamanho: ${cartItem}-Cor: ${cartItem}`} </Typography>
      </div>
    </div>
  )
}

export default CartItem
