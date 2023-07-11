import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Typography, Link, Hidden } from '@material-ui/core'
import { useRouter } from 'next/router'
import { CartTable, Breadcrumbs } from '../../components'
import PriceDisplay from './components/PriceDisplay'
import ShipmentOptions from './components/ShipmentOptions'
import CheckoutPage from '../checkout'
//import { PageCartItemsComp, ssrCartItems } from '../../generated/page'
import { GetServerSideProps } from 'next'
import { useDispatch } from 'react-redux'
import { addCartItem, CartItemType, removeCartItem, updateCartItem, CartShopType } from '../../actions'
//import { ProductDetail, Product } from '../../generated/graphql'
import { Product } from '../../generated/graphql'

// import { PagarMeCheckout } from 'pagarme/browser'

const useStyles = makeStyles((theme) => ({
  container: {
    margin: '18px 10%',

    display: 'flex',
    marginTop: theme.spacing(10),
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      margin: '18px 0px',
    },
  },
  history: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    position: 'relative',
    marginLeft: '10%',
    [theme.breakpoints.down('sm')]: {
        margin: '18px 28px',
    }
  },
  root: {
    padding: theme.spacing(3),
  },
  title: {
    marginLeft: '10%',
    marginTop: theme.spacing(6),
    fontWeight: 600,
    [theme.breakpoints.down('sm')]: {
      margin: '18px 0px',
    },
  },
  shipmentInfoContainer: {
    margin: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  checkoutButton: {
    backgroundColor: '#219653',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}))

const Index = (props) => {
  const classes = useStyles()
  const router = useRouter()
  const dispatch = useDispatch()
  const checkout = true

  const [cartShopItems, setProducts] = useState<CartShopType[]>([])

  useEffect(() => {
    const cart = JSON.parse(window.localStorage.getItem('cart'))
    
    if(!!cart?.shopItems){
      setProducts(cart?.shopItems)
    }
    
  }, [])

  const deleteItem = (index: number, slug: string) => {
    dispatch(removeCartItem(index, slug))
  }

  const addItem = (item: CartItemType) => {
    dispatch(addCartItem(item))
  }

  const editItem = (index: number, item: CartItemType) => {
    dispatch(updateCartItem(item, index))
  }

  const onSubmit = (data) => {

    const checkout = new (window as any).PagarMeCheckout.Checkout({
      uiColor: '#000',
      paymentMethods: 'boleto,credit_card,pix',
      encryption_key: 'ek_test_sJ8p5D4YcuNUFrrwTZFvrFRXlJ5gMl',
      success(data) {
        alert('Sucesso')
      },
      error(err) {
        console.error('Pagarme error', err)
      },
    })

    checkout.open({
      amount: subtotal(),
      customerData: 'true',
      createToken: 'true',
      items: cartShopItems.map(p => {
        return p.cartItems.map((p => { 
          return {
            id: p.product.id,
            title: p.product.title,
            unit_price: p.product?.contextualPricing?.maxVariantPricing.price.amount,
            quantity: 1,
            tangible: false,
          }
        }))
      }),
    })
  }

 //FALTA A PARTE DE FRETE
  const totalPrice = (): number => {    
    return cartShopItems.reduce((acc, item) => {
      return acc + item.cartItems.reduce((acc, item) => {
        return acc + item.product?.contextualPricing?.maxVariantPricing.price.amount
      },0)
    }, 0) + 1000 * cartShopItems.length
  }

  const subtotal = (): number => {
    return cartShopItems.reduce((acc, item) => {
      return acc + item.cartItems.reduce((acc, item) => {
        return acc + item.product?.contextualPricing?.maxVariantPricing.price.amount
      }, 0)
    }, 0)
  }

  return (
    <div className={classes.root}>
      <Breadcrumbs page='Carrinho de compras' className={classes.history}/>
      <Typography variant='h5' className={classes.title}>
        Meu carrinho de compras
      </Typography>
      
      <div className={classes.container}>
        <CartTable products={cartShopItems} setProducts={setProducts} subtotal={subtotal()} />
        <div className={classes.shipmentInfoContainer}>
          <ShipmentOptions />
          <PriceDisplay subtotal={subtotal()} shipmentPrice={1000 * cartShopItems.length} totalPrice={totalPrice()} />
        </div>
        <div className={classes.buttonContainer}>
          <Button variant='contained' className={classes.checkoutButton} onClick={onSubmit}>
            Finalizar compra
          </Button>
        </div>
      </div>
      
    </div>
  )
}

export default Index
