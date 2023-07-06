import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import clsx from 'clsx'
import { Container, Hidden } from '@material-ui/core'
import { ProductsMenu, MobileMenu, BrandsMenu } from './components'
const useStyles = makeStyles(theme => ({
  root: { overflowY: 'auto' },
  openMenu: {
    opacity: 1,
    background: 'inherit',
    transform: 'scale(1)',
    position: 'absolute',
    minHeight: '100%',
    padding: '90px 120px',
    top: '90px',
    overflowY: 'auto',
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 10,
  },
  openMenuMobile: {
    opacity: 1,
    background: 'inherit',
    position: 'absolute',
    minHeight: '100%',
    padding: '90px 0px 0px 0px',
    top: '90px',
    overflow: 'auto',
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 10,
  },
}))

const brands = [
  {
    name: 'By Rafael Motta',
    url: '/marcas/aufderharabshire',
  },
  {
    name: 'Mabô Rio',
    url: '/marcas/aufderharabshire',
  },
  {
    name: 'Nammos Beachwear',
    url: '/marcas/aufderharabshire',
  },
  {
    name: 'Band it in',
    url: '/marcas/aufderharabshire',
  },
  {
    name: 'Tanden Aletier',
    url: '/marcas/aufderharabshire',
  },
  {
    name: 'Ima Handmade',
    url: '/marcas/aufderharabshire',
  },
  {
    name: 'Ana Duque',
    url: '/marcas/aufderharabshire',
  },
  {
    name: 'Anne Folle',
    url: '/marcas/aufderharabshire',
  },
  {
    name: 'Loja Löra',
    url: '/marcas/aufderharabshire',
  },
]

const productsPages = [
  {
    title: 'ROUPAS',
    href: '',
    children: [
      {
        title: 'Blusas',
        href: '',
      },
      {
        title: 'Saias',
        href: '',
      },
      {
        title: 'Vestidos',
        href: '',
      },
    ],
  },
  {
    title: 'CALÇADOS',
    href: '',
    children: [
      {
        title: 'Blusas',
        href: '',
      },
      {
        title: 'Saias',
        href: '',
      },
      {
        title: 'Vestidos',
        href: '',
      },
    ],
  },
  {
    title: 'BOLSAS',
    href: '',
    children: [
      {
        title: 'Blusas',
        href: '',
      },
      {
        title: 'Saias',
        href: '',
      },
      {
        title: 'Vestidos',
        href: '',
      },
    ],
  },
  {
    title: 'ACESSÓRIOS',
    href: '',
    children: [
      {
        title: 'Blusas',
        href: '',
      },
      {
        title: 'Saias',
        href: '',
      },
      {
        title: 'Vestidos',
        href: '',
      },
    ],
  },
]

interface HeaderMenuProps {
  isProductsMenuOpen: boolean
  isMobileMenuOpen: boolean
  isBrandsMenuOpen: boolean
  setProductsMenuOpen: Function
  setBrandsMenuOpen: Function
  closeMenuMobile: Function
  specialBackground: boolean
  className?: string
}
const HeaderMenu = (props: HeaderMenuProps) => {
  const {
    specialBackground,
    closeMenuMobile,
    isProductsMenuOpen,
    isMobileMenuOpen,
    isBrandsMenuOpen,
    setBrandsMenuOpen,
    setProductsMenuOpen,
    className,
    ...rest
  } = props
  const classes = useStyles()

  return (
    <Container className={clsx(className, classes.root)} maxWidth={false} style={specialBackground ? {background: '#ebe9df'} : {background: '#fff'}}>
      <ProductsMenu
        closeMenuMobile={closeMenuMobile}
        pages={productsPages}
        isOpen={isProductsMenuOpen}

        highlight={{ name: 'Moda Beachwear', url: '', src: '/brandMenu02.png' }}
      />
      <BrandsMenu
        closeMenuMobile={closeMenuMobile}
        brands={brands}
        isOpen={isBrandsMenuOpen}
        setBrandsMenuOpen={() => setBrandsMenuOpen(false)}
        highlight={{ name: 'Moda Fitness', url: '', src: '/brandMenu01.png' }}
      />
      <Hidden lgUp>
        <MobileMenu
          highlightImage='/brandMenu01.png'
          isOpen={isMobileMenuOpen && !isBrandsMenuOpen && !isProductsMenuOpen}
          setProductsMenuOpen={setProductsMenuOpen}
          setBrandsMenuOpen={setBrandsMenuOpen}
          className={classes.openMenuMobile}
        />
      </Hidden>
    </Container>
  )
}

export default HeaderMenu
