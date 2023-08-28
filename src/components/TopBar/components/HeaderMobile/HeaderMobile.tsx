/* eslint-disable no-unused-vars */
import React from 'react'
import { makeStyles } from '@mui/styles'
import { IconButton, Badge } from '@mui/material'

import Link from 'next/link'
import Image from "next/legacy/image"
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import CloseIcon from '@mui/icons-material/Close'
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
        <Badge badgeContent={cartSize || 0} color='error' overlap="rectangular" max={99}>
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
  );
}

export default HeaderMobile
