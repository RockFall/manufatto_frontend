import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { LoginForm, RegisterForm, Breadcrumbs } from '../components'
import { ProductGrid } from '../components'
import { Button, Typography, Link, Hidden } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { useRouter } from 'next/router'
import { useSignupCustomerMutation, CustomerCreateParams } from '../generated/graphql'
import { withApollo } from '../withApollo'

const productList = [
  {
    name: 'T-Shirt Nyc Social Verde Thrif-Tee',
    brand: 'Anne Folle',
    image: '/product/product1.svg',
    price: '890.00',
    installments: '3'
  },
  {
    name: 'T-Shirt Nyc Social Verde Thrif-Tee',
    brand: 'Anne Folle',
    image: '/product/product2.svg',
    price: '2290.00',
    installments: '3'
  },
  {
    name: 'T-Shirt Nyc Social Verde Thrif-Tee',
    brand: 'Anne Folle',
    image: '/product/product3.svg',
    price: '490.00',
    installments: '3'
  },
  {
    name: 'T-Shirt Nyc Social Verde Thrif-Tee',
    brand: 'Anne Folle',
    image: '/product/product4.svg',
    price: '1990.00',
    installments: '3'
  },
  {
    name: 'T-Shirt Nyc Social Verde Thrif-Tee',
    brand: 'Anne Folle',
    image: '/product/product5.svg',
    price: '890.00',
    installments: '3'
  },
  {
    name: 'T-Shirt Nyc Social Verde Thrif-Tee',
    brand: 'Anne Folle',
    image: '/product/product6.svg',
    price: '2290.00',
    installments: '3'
  },
  {
    name: 'T-Shirt Nyc Social Verde Thrif-Tee',
    brand: 'Anne Folle',
    image: '/product/product7.svg',
    price: '490.00',
    installments: '3'
  },
  {
    name: 'T-Shirt Nyc Social Verde Thrif-Tee',
    brand: 'Anne Folle',
    image: '/product/product8.svg',
    price: '1990.00',
    installments: '3'
  }
]

const useStyles = makeStyles(theme => ({
  root: {
    margin: '18px 188px',
    [theme.breakpoints.down('md')]: {
      margin: '18px 28px',
    }
  },
  forms: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'start',
      marginTop: theme.spacing(3)
  },
  confirmRegister: {
    padding: theme.spacing(3),
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  separator: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  separatorLine: {
    borderBottom: '1px solid #000000',
    width: theme.spacing(20),
    height: '0px',
    margin: theme.spacing(1),
  },
  textGrid1: {
    margin: '1% 0 0.5% 0',
    fontWeight: 500,
    fontSize: '12px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#6F6C6B'
  },
  textGrid2: {
    margin: '0 0',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '18px',
    color: '#1D1D1F'
  },
  productGrid: {
    background: '#FFFFFF',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    overflowX: 'hidden',

    padding: '3% 3%',
  },
  productButton: {
    color: '#6F6C6B',
    fontSize: theme.spacing(1.3),
    margin: '0 5px',
    padding: '1.5% 4%',
    letterSpacing: '0.16em',
    border: '1px solid #6F6C6B',
    whiteSpace: 'nowrap',
    overflowWrap: 'inherit'
  },
  heartIcon: {
    color: 'red',
    marginBottom: theme.spacing(2),
  },
  homeButton: {
    margin: theme.spacing(4)
  },
  separatorText: {
    fontWeight: 500,
    fontSize: theme.spacing(2)
  },
  formTitleLogin: {
    color: '#6F6C6B',
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    paddingLeft: 0,
  },
  formTitleRegister: {
    color: '#6F6C6B',
    marginLeft: theme.spacing(29),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  MobileFormTitle: {
    color: '#6F6C6B',
  },
  RegisterSpacing: {
    marginLeft: theme.spacing(29),
  },
  mobileButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  mobileButton: {
    width: '100%',
    justifyContent: 'start',
    textTransform: 'capitalize',
    fontSize: theme.spacing(3),
    lineHeight: '32px',
  },
  divider: {
    width: '100%',
    borderBottom: '1px solid #E0E0E0',
  },
  dividerDown: {
    width: '100%',
    borderBottom: '1px solid #E0E0E0',
    marginBottom: theme.spacing(7)
  },
}))

function Index() {
  const classes = useStyles()
  const router = useRouter()
  const [registered, setRegistered] = useState<boolean>(false)
  const [loginSelected, setLoginSelected] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string>('')
  
  const [signUpCostumer, { loading }] = useSignupCustomerMutation({
    onError(error) {
      const fieldsTranslations = {
        name:  'nome do cliente',
        cpf:  'cpf do cliente',
        phone:  'telefone de contato',
        email: 'email do cliente',
        password: 'senha do cliente',
        password_confirmation: 'confirmação de senha do cliente',
        address: {
          address: {
            city: 'cidade',
            complement: 'complemento',
            neighborhood: 'bairro',
            number: 'numero',
            postal: 'cep',
            state: 'estado',
            street: 'estado',
          }
        }
      }
      const responseError = error.graphQLErrors[0] || {message: ''}
      let message = 'Erro inesperado do servidor!'
      console.log(responseError);
      
      switch (responseError.message) {
        case 'unauthorized':
          message = 'Você não tem permissão para realizar essa ação!'
          break

        case 'invalid_args':
          message = 'Validação não sucedida. Confira os valores inseridos!'
          break

        default:
          if (!responseError['key']) break
          message = `O campo ${fieldsTranslations[responseError['key']]} ${responseError.message}`
          break
      }

      setErrorMessage(message)
      

    },onCompleted(data) {
      console.dir({ data })
      setRegistered(true)
      setErrorMessage('')
      console.log("cadastrado")
    }
  })

  const handleFormSubmit = (customer: CustomerCreateParams) => { 
    setErrorMessage('')   
    signUpCostumer({ variables: { customer } })
  }

  const handleHomeClick = (e) => {
    e.preventDefault()
    router.push('/')
  }
  
  if(loading){
    return (
      <div />
    )
  }

  if(registered){
    return (
      <div className={classes.confirmRegister}>
        <Breadcrumbs page='Minha conta'/>
        <FavoriteIcon className={classes.heartIcon}/>
        <Typography variant='h6'>Cadastro realizado com sucesso</Typography>
        <Typography variant='body1'>Boas compras</Typography>
        <Button variant='outlined' className={classes.homeButton} onClick={handleHomeClick}>Voltar para a home</Button>

        <div className={classes.separator}>
          <div className={classes.separatorLine}/>
          <Typography className={classes.separatorText}>OU</Typography>
          <div className={classes.separatorLine}/>
        </div>

        <div className={classes.productGrid}>
          <p className={classes.textGrid1}>Shop now</p>
          <p className={classes.textGrid2}>O que vira tendência, está aqui.</p>
          <ProductGrid productList={productList} />
          <Button style={{ margin: '3.4%' }} className={classes.productButton} color="inherit">VEJA MAIS PRODUTOS</Button>
        </div>
      </div>
    )
  }
  return (
    <div className={classes.root}>
      <Breadcrumbs page='Minha conta'/>
      <div className={classes.forms}>
        <Hidden mdDown>
          
          <div style={{display: 'flex', flexDirection:'column'}}>
            <div className={classes.divider} />
            <Typography variant='h6' className={classes.formTitleLogin}> Login </Typography>
            <div className={classes.dividerDown} />
            <LoginForm onSubmit={e => console.log(e)}/>
          </div>
          <div style={{display: 'flex', flexDirection:'column', width: '100%'}}>
            <div className={classes.divider} />
            <Typography variant='h6' className={classes.formTitleRegister}> Cadastro </Typography>
            <div className={classes.dividerDown} />
            <RegisterForm className={classes.RegisterSpacing}
              onSubmit={handleFormSubmit}
              errorMessage={errorMessage}
            />
          </div>
        </Hidden>
        <Hidden lgUp>
          <div >
            <div className={classes.divider} />
            <div className={classes.mobileButtonsContainer}>
              <Button className={classes.mobileButton} onClick={() => setLoginSelected(true)}><Typography style={{opacity: loginSelected ? 1 : 0.4}} variant='h6' className={classes.MobileFormTitle}> Login </Typography></Button>
              <Button className={classes.mobileButton} onClick={() => setLoginSelected(false)}><Typography style={{opacity: loginSelected ? 0.4 : 1}}  variant='h6' className={classes.MobileFormTitle}> Cadastro </Typography></Button>
            </div>
            <div className={classes.divider} />
            {loginSelected ? 
              <LoginForm onSubmit={e => console.log(e)}/> 
              : 
              <RegisterForm 
                onSubmit={handleFormSubmit}
                errorMessage={errorMessage}
              /> 
            }
            
            
          </div>
        </Hidden>
      </div>
    </div>
  )
}

export default withApollo(Index)