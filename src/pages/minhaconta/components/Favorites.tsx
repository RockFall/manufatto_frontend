import React, {useState} from 'react'
import clsx from 'clsx'
import { makeStyles } from '@mui/styles'
import {ProductGrid} from '../../../components'

const useStyles = makeStyles(theme => ({
  root:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  nameText: {
    color: '#6F6C6B',
    fontWeight: 600,
    fontSize: theme.spacing(3),
  },
  logoutText: {
    fontSize: theme.spacing(1.5),
    color: '#999999',
    textTransform: 'capitalize',
  }
}))

const productList = [
  {
    name: 'T-Shirt Nyc Social Verde Thrif-Tee',
    brand: 'Anne Folle',
    image: '/product/product1.svg',
    price: '890.00',
    installments: '3',
  },
  {
    name: 'T-Shirt Nyc Social Verde Thrif-Tee',
    brand: 'Anne Folle',
    image: '/product/product2.svg',
    price: '2290.00',
    installments: '3',
  },
  {
    name: 'T-Shirt Nyc Social Verde Thrif-Tee',
    brand: 'Anne Folle',
    image: '/product/product3.svg',
    price: '490.00',
    installments: '3',
  },
  {
    name: 'T-Shirt Nyc Social Verde Thrif-Tee',
    brand: 'Anne Folle',
    image: '/product/product4.svg',
    price: '1990.00',
    installments: '3',
  },
  {
    name: 'T-Shirt Nyc Social Verde Thrif-Tee',
    brand: 'Anne Folle',
    image: '/product/product5.svg',
    price: '890.00',
    installments: '3',
  },
  {
    name: 'T-Shirt Nyc Social Verde Thrif-Tee',
    brand: 'Anne Folle',
    image: '/product/product6.svg',
    price: '2290.00',
    installments: '3',
  },
  {
    name: 'T-Shirt Nyc Social Verde Thrif-Tee',
    brand: 'Anne Folle',
    image: '/product/product7.svg',
    price: '490.00',
    installments: '3',
  },
  {
    name: 'T-Shirt Nyc Social Verde Thrif-Tee',
    brand: 'Anne Folle',
    image: '/product/product8.svg',
    price: '1990.00',
    installments: '3',
  },
  {
    name: 'T-Shirt Nyc Social Verde Thrif-Tee',
    brand: 'Anne Folle',
    image: '/product/product1.svg',
    price: '890.00',
    installments: '3',
  },
  {
    name: 'T-Shirt Nyc Social Verde Thrif-Tee',
    brand: 'Anne Folle',
    image: '/product/product2.svg',
    price: '2290.00',
    installments: '3',
  },
  {
    name: 'T-Shirt Nyc Social Verde Thrif-Tee',
    brand: 'Anne Folle',
    image: '/product/product3.svg',
    price: '490.00',
    installments: '3',
  },
  {
    name: 'T-Shirt Nyc Social Verde Thrif-Tee',
    brand: 'Anne Folle',
    image: '/product/product4.svg',
    price: '1990.00',
    installments: '3',
  },
  {
    name: 'T-Shirt Nyc Social Verde Thrif-Tee',
    brand: 'Anne Folle',
    image: '/product/product5.svg',
    price: '890.00',
    installments: '3',
  },
  {
    name: 'T-Shirt Nyc Social Verde Thrif-Tee',
    brand: 'Anne Folle',
    image: '/product/product6.svg',
    price: '2290.00',
    installments: '3',
  },
  {
    name: 'T-Shirt Nyc Social Verde Thrif-Tee',
    brand: 'Anne Folle',
    image: '/product/product7.svg',
    price: '490.00',
    installments: '3',
  },
  {
    name: 'T-Shirt Nyc Social Verde Thrif-Tee',
    brand: 'Anne Folle',
    image: '/product/product7.svg',
    price: '490.00',
    installments: '3',
  },
  {
    name: 'T-Shirt Nyc Social Verde Thrif-Tee',
    brand: 'Anne Folle',
    image: '/product/product5.svg',
    price: '890.00',
    installments: '3',
  },
  {
    name: 'T-Shirt Nyc Social Verde Thrif-Tee',
    brand: 'Anne Folle',
    image: '/product/product6.svg',
    price: '2290.00',
    installments: '3',
  },
]

interface FavoritesProp {
    className?: string
}


const Favorites = (props: FavoritesProp) => {
  const { className, ...rest } = props
  const classes = useStyles()
  

  return (
    <div className={clsx(classes.root, className)} {... rest} >
        <ProductGrid productList={//productList
        []}/>
    </div>
  )
}

export default Favorites
