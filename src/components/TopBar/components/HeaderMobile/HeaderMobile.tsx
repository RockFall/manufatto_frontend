/* eslint-disable no-unused-vars */
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton, Badge } from '@material-ui/core'

import Link from 'next/link'
import Image from 'next/image'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import LocalMallIcon from '@material-ui/icons/LocalMall'
import CloseIcon from '@material-ui/icons/Close'
import { NumberLiteralType } from 'typescript'
import { useRouter } from 'next/router'

const useStyles = makeStyles(theme => ({
  appBarMobile: {
    width: '100%',
    background: 'inherit',
    padding: '30px 23px',
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
}))

interface HeaderMobileProps {
  onClickMobileMenu: Function
  isMenuOpen: boolean
  className?: string
  cartSize?: number
}

const HeaderMobile = (props: HeaderMobileProps) => {
  const { cartSize, isMenuOpen, onClickMobileMenu, className, ...rest } = props
  const classes = useStyles()
  const router = useRouter()

  return (
    <div className={classes.appBarMobile}>
      <div className={classes.logos}>
        <Link href="/">
          <Image src='/LogoBlack.svg' width={150} height={70} object-fit='fill' alt="Logo Manufatto" />
        </Link>
      </div>

      <div className={classes.flexGrow} />
      <IconButton className={classes.iconSpacing} color='primary' size='small' onClick={() => router.push('/busca')}>
        <SearchIcon className={classes.iconStyle} />
      </IconButton>
      <IconButton className={classes.iconSpacing} color='primary' size='small' onClick={() => router.push('/carrinho')}>
        <Badge badgeContent={cartSize || 0} color='error' overlap='rectangle' max={99}>
          <LocalMallIcon className={classes.iconStyle} />
        </Badge>
      </IconButton>
      <IconButton className={classes.iconSpacing} color='primary' size='small' onClick={() => router.push('/minhaconta')}>
        <AccountCircleIcon className={classes.iconStyle} />
      </IconButton>
      <IconButton className={classes.iconSpacing} color='primary' size='small' onClick={() => onClickMobileMenu()}>
        {isMenuOpen ? <CloseIcon className={classes.iconStyle} /> : <MenuIcon className={classes.iconStyle} />}
      </IconButton>
    </div>
  )
}

export default HeaderMobile
