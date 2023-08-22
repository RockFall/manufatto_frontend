import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'

import clsx from 'clsx'
import { Container, Hidden } from '@mui/material'
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
    name: 'Khos Collection',
    url: '/marcas/khos-collection',
  },
  {
    name: 'Jours de Pluie',
    url: '/marcas/jours-de-pluie',
  },
  {
    name: 'Cumuru',
    url: '/marcas/cumuru',
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
  onClickCloseMenuCompletely?: Function
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
    onClickCloseMenuCompletely,
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
        onClickCloseMenuCompletely={onClickCloseMenuCompletely}

        highlight={{ brand: 'Khos Collection', name: 'Moda Beachwear', url: '/marcas/khos-collection', src: '/SampleKhosFeaturedImage.webp' }}
      />
      <BrandsMenu
        closeMenuMobile={closeMenuMobile}
        brands={brands}
        isOpen={isBrandsMenuOpen}
        onClickCloseMenuCompletely={onClickCloseMenuCompletely}
        setBrandsMenuOpen={() => setBrandsMenuOpen(false)}
        highlight={{ brand: 'Khos Collection', name: 'Moda Beachwear', url: '/marcas/khos-collection', src: '/SampleKhosFeaturedImage.webp' }}
      />
      <Hidden lgUp>
        <MobileMenu
          highlightImage='/SampleKhosFeaturedImage.webp'
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
