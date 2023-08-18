/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'

import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Hidden } from '@material-ui/core'
import { Header, HeaderMobile } from './components'
import { HeaderMenu } from '..'

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    maxHeight: '100px',
  },
  appBar: {
    padding: 0,
  },
}))

interface TopBarProps {
  className?: string,
  specialBackground?: boolean
}

const TopBar = (props: TopBarProps) => {
  const { specialBackground, className, ...rest } = props
  const classes = useStyles()

  const [isProductsMenuOpen, setProductsMenuOpen] = useState<boolean>(false)
  const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
  const [isBrandsMenuOpen, setBrandsMenuOpen] = useState<boolean>(false)
  const [cartSize, setCartSize] = useState<number>(0)

  useEffect(() => {
    const cart = JSON.parse(window.localStorage.getItem('cart'))
    
    if(cart && cart.cartItems){
      setCartSize(cart?.cartItems.length)
    }
  }, [])

  return (
    <div>
      <AppBar {...rest} className={clsx(className, classes.root)} color='default' position='sticky' >
        <Toolbar className={classes.appBar} style={specialBackground ? {background: '#ebe9df'} : {background: '#fff'}}>
          <Hidden mdDown>
            <Header
              cartSize={cartSize}
              isBrandsOpen={isBrandsMenuOpen}
              isProductsOpen={isProductsMenuOpen}
              onClickProducts={() => {
                setBrandsMenuOpen(false)
                setMobileMenuOpen(!isProductsMenuOpen)
                setProductsMenuOpen(!isProductsMenuOpen)
              }}
              onClickBrands={() => {
                setProductsMenuOpen(false)
                setMobileMenuOpen(!isBrandsMenuOpen)
                setBrandsMenuOpen(!isBrandsMenuOpen)
              }}
            />
          </Hidden>
          <Hidden lgUp>
            <HeaderMobile
              cartSize={cartSize}
              onClickMobileMenu={() => {
                setProductsMenuOpen(false)
                setBrandsMenuOpen(false)
                setMobileMenuOpen(!isMobileMenuOpen)
              }}
              isMenuOpen={isMobileMenuOpen}
            />
          </Hidden>
        </Toolbar>
      </AppBar>
      <HeaderMenu
        specialBackground={specialBackground}
        className={classes.appBar}
        isProductsMenuOpen={isProductsMenuOpen}
        isMobileMenuOpen={isMobileMenuOpen}
        isBrandsMenuOpen={isBrandsMenuOpen}
        setProductsMenuOpen={() => {
          setBrandsMenuOpen(false)
          setProductsMenuOpen(!isProductsMenuOpen)
        }}
        setBrandsMenuOpen={() => {
          setProductsMenuOpen(false)
          setBrandsMenuOpen(!isBrandsMenuOpen)
        }}
        closeMenuMobile={() => {
          setMobileMenuOpen(true)
          setProductsMenuOpen(false)
          setBrandsMenuOpen(false)
        }}
        onClickCloseMenuCompletely={() => {
          setProductsMenuOpen(false)
          setBrandsMenuOpen(false)
          setMobileMenuOpen(false)
        }}
      />
    </div>
  )
}

export default TopBar
