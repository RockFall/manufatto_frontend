import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Hidden, Button, Grid, Link, Typography } from '@material-ui/core'
import { BrandGrid, Breadcrumbs, ProductGrid, ProductsButtonGrid } from '../../components'

// Data fetching
import { GetServerSideProps } from 'next'
import { ssrRandomProducts, PageRandomProductsComp } from '../../generated/page'
import { Product } from '../../generated/graphql'
import { useRouter } from 'next/router'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3),
    paddingLeft: 0,
    background: '#EBE9DF',
    zIndex: 1,
  },
  history: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: theme.spacing(3),
    position: 'relative',
    marginLeft: '10%',
    [theme.breakpoints.down('sm')]: {
      margin: '18px 28px',
    }
  },
  backgroundImage: {
    position: 'absolute',
    zIndex: -1,
    width: '100%',
  },
  slogan: {
    position: 'absolute',
    marginTop: '33%', //33% é o "correto" porém a imagem atrapalha
    left: '-1.5%',
    transform: 'rotate(-90deg)',
  },
  buttonGrid: {
    marginTop: theme.spacing(7),
    marginBottom: theme.spacing(7),
  },
  brandGrid: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    overflowX: 'hidden',
  },
  textGrid1: {
    margin: '1% 0 0.5% 0',
    fontWeight: 500,
    fontSize: '12px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#6F6C6B',
  },
  textGrid2: {
    margin: '0 0',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '18px',
    color: '#1D1D1F',
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
  button: {
    color: '#6F6C6B',
    fontSize: theme.spacing(1.3),
    margin: '0 5px',
    padding: '1.5% 4%',
    letterSpacing: '0.16em',
    border: '1px solid #6F6C6B',
    whiteSpace: 'nowrap',
    overflowWrap: 'inherit',
  },
}))

const brandList = [
  {
    name: 'Mabô Rio',
    image: '/brand/brand1.svg',
  },
  {
    name: 'Burberry',
    image: '/brand/brand2.svg',
  },
  {
    name: 'Glamour Paris',
    image: '/brand/brand3.svg',
  },
  {
    name: 'Damsel In Dior',
    image: '/brand/brand4.svg',
  },
  {
    name: 'Tommy Hilfiger',
    image: '/brand/brand5.svg',
  },
  {
    name: 'Hover Black',
    image: '/brand/brand6.svg',
  },
  {
    name: 'Sunscreens T-shirt',
    image: '/brand/brand7.svg',
  },
  {
    name: 'Baddie Fashion',
    image: '/brand/brand8.svg',
  },
  {
    name: 'Valentino Dior',
    image: '/brand/brand9.svg',
  },
]


const Index: PageRandomProductsComp = (props) => {
  const classes = useStyles()
  const router = useRouter()
  const { data } = props
  return (
  <>
    <div className={classes.root}>
      <Breadcrumbs page='Marcas' className={classes.history}/>
      <Hidden smDown>
        <div className={classes.backgroundImage}>
          <img src='/light1.png' width='100%' height='934px'/>
        </div>

        <div className={classes.slogan}>
          <p>
            MODA DO <b>SEU JEITO.</b>
          </p>
        </div>
      </Hidden>

      <div className={classes.brandGrid}>
        <p className={classes.textGrid1}>Nossas Marcas</p>
        <p className={classes.textGrid2}>Uma curadoria especial para você</p>
        
        <ProductsButtonGrid className={classes.buttonGrid}/>
        
        <BrandGrid brandList={brandList} />
      </div>
    </div>
    <div className={classes.productGrid}>
      <p className={classes.textGrid1}>Shop now</p>
      <p className={classes.textGrid2}>O que vira tendência, está aqui.</p>
      {data && data.productsRandomSuggestions && <ProductGrid productList={data?.productsRandomSuggestions as Product[]} />}
      <Button style={{ margin: '3.4%' }} className={classes.button} color='inherit' onClick={()=> router.push(`/produtos`)}>
        VEJA MAIS PRODUTOS
      </Button>
    </div>
  </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return (await ssrRandomProducts.getServerPage({
    variables: { amount: 10 }
  }, ctx))
}

export default Index