/* eslint-disable no-unused-vars */
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, IconButton, Typography, Badge } from '@material-ui/core'

import Link from 'next/link'
import Image from 'next/image'
import SearchIcon from '@material-ui/icons/Search'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import LocalMallIcon from '@material-ui/icons/LocalMall'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import { useRouter } from 'next/router'

const useStyles = makeStyles(theme => ({
  appBar: {
    width: '100%',
    background: 'inherit',
    padding: '30px 66px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexGrow: {
    flexGrow: 1,
  },
  logos: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  iconSpacing: {
    marginLeft: theme.spacing(3),
  },
  iconStyle: {
    color: '#6F6C6B',
    fontSize: theme.spacing(3),
  },
  buttonTypography: {
    color: '#6F6C6B',
    fontSize: theme.spacing(1.8),
    fontFamily: "Suisse Int\\'l",
    letterSpacing: '0.16em',
  },
  iconColor: {
    color: '#6F6C6B',
  },
}))

interface HeaderProps {
  onClickProducts: Function
  onClickBrands: Function
  isProductsOpen: boolean
  isBrandsOpen: boolean
  className?: string
  cartSize?: number
}

const Header = (props: HeaderProps) => {
  const { cartSize, isBrandsOpen, isProductsOpen, onClickProducts, onClickBrands, className, ...rest } = props
  const classes = useStyles()
  const router = useRouter()

  return (
    <div {...rest} className={classes.appBar}>
      <div className={classes.logos}>
        <Link href="/">
          <Image src='/LogoBlack.svg' width='150%' height='70%' object-fit='fill' />
        </Link>
      </div>
      <div className={classes.flexGrow} />
      <Button color='inherit' className={classes.iconSpacing} onClick={() => onClickBrands()}>
        <Typography className={classes.buttonTypography}>MARCAS</Typography>
        {isBrandsOpen ? <ArrowDropUpIcon className={classes.iconColor} /> : <ArrowDropDownIcon className={classes.iconColor} />}
      </Button>
      <Button color='inherit' className={classes.iconSpacing} onClick={() => onClickProducts()}>
        <Typography className={classes.buttonTypography}>PRODUTOS</Typography>
        {isProductsOpen ? <ArrowDropUpIcon className={classes.iconColor} /> : <ArrowDropDownIcon className={classes.iconColor} />}
      </Button>
      <Button color='inherit' className={classes.iconSpacing} onClick={() => { }}>
        <Typography className={classes.buttonTypography}>CUSTOMIZAÇÃO</Typography>
      </Button>

      <IconButton className={classes.iconSpacing} color='primary' size='small' onClick={() => router.push('busca')}>
        <SearchIcon className={classes.iconStyle} />
      </IconButton>
      <IconButton className={classes.iconSpacing} color='primary' size='small' onClick={() => router.push('carrinho')}>
        <Badge badgeContent={cartSize || 0} color='error' overlap='rectangle' max={99}>
          <LocalMallIcon className={classes.iconStyle} />
        </Badge>
      </IconButton>
      <IconButton className={classes.iconSpacing} color='primary' size='small' onClick={() => router.push('minhaconta')}>
        <AccountCircleIcon className={classes.iconStyle} />
      </IconButton>
    </div>
  )
}

export default Header
