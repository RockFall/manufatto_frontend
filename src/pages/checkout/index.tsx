import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CartResume from './components/CartResume'
import CheckoutForm from './components/CheckoutForm'
import {CartItemType} from '../../actions'
import { Typography, Link } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import {Breadcrumbs} from '../../components'

const useStyles = makeStyles(theme => ({
  root:{
    width: '100%',
    display: 'flex',
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(15),
    justifyContent: 'center',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
        margin: '28px 0px',
        marginBottom: theme.spacing(10),
        flexDirection: 'column',
    },
  },
  form: {
    width: '100%',
  },
  step: {
    display: 'flex',
    height: theme.spacing(5),
    width: theme.spacing(5),
    color: '#ffffff',
    backgroundColor: '#000000',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: theme.spacing(1.5),
    marginLeft: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
  },
  },
  stepText: {
    fontWeight: 600,
    fontSize: theme.spacing(2.5),
    marginLeft: theme.spacing(2),
  },
  stepNumber: {
    fontWeight: 600,
    fontSize: theme.spacing(2.5),
  },
  stepContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  formContainer: {
    width: '45%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
  }
  },
  history: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    position: 'relative',
    marginLeft: '10%',
    [theme.breakpoints.down('sm')]: {
      margin: '18px 0px',
    },
  },
  link: {
    fontSize: '12px',
    color: '#6F6C6B',
    fontWeight: 400,
  },
  arrowIcon: {
    fontSize: '8px',
    margin: '0px 8px',
  },
  prod: {
    fontSize: '12px',
    fontWeight: 600,
  },
  title: {
    marginLeft: '10%',
    marginTop: theme.spacing(6),
    fontWeight: 600,
    [theme.breakpoints.down('sm')]: {
      margin: '18px 0px',
    },
  },
  container: {
    padding: theme.spacing(3),
  },

}))


const Index = () => {
  const classes = useStyles()
  const name = 'Anderson Gomes'
  const [showAddress, setShowAddress] = useState<boolean>(false)

  const [cartItems, setProducts] = useState<CartItemType[]>([])

  useEffect(() => {
    const cart = JSON.parse(window.localStorage.getItem('cart'))
    
    if(cart.cartItems){      
      setProducts(cart?.cartItems)
    }
    
  }, [])

  return (
    <div className={classes.container}>
      <Breadcrumbs page='Carrinho de compras' className={classes.history}/>
      <Typography variant='h5' className={classes.title}>
        Meu carrinho de compras
      </Typography>
      <div className={classes.root}>
          <div className={classes.formContainer}>
            <div className={classes.stepContainer}>
              <div className={classes.titleRow}>
                <div className={classes.step}> 
                  <Typography className={classes.stepNumber}>01</Typography>
                </div> 
                <Typography className={classes.stepText}>{name}</Typography> 
              </div>  
              <div className={classes.titleRow}>
                <div className={classes.step}>
                  <Typography className={classes.stepNumber}>02</Typography>
                </div> 
                <Typography className={classes.stepText}>Endereço de entrega</Typography>
              </div>
            </div>
            <CheckoutForm showAddress={showAddress} setShowAddress={setShowAddress} onSubmit={()=>{}}/>
          </div>
          <CartResume showAddress={showAddress} cartItems={cartItems}/>
      </div>
    </div>
  )
}

export default Index
