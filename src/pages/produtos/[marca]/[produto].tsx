import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Button, Link, Typography, Divider, Hidden } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { ProductSingle, ProductGrid, Breadcrumbs } from '../../../components'
import { GetServerSideProps } from 'next'
import { useDispatch } from 'react-redux'
import { PageProductsCatalogComp, ssrProductByHandle, ssrProductById } from '../../../generated/page'
import { useRouter } from 'next/router'
import { Product } from '../../../generated/graphql'
import Util from '../../../util/custom_formatter'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: '18px 122px',
    [theme.breakpoints.down('lg')]: {
      margin: '18px 28px',
    },
    background: '#fff',
  },
  divider: {
    marginBottom: theme.spacing(7),
    marginTop: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(5),
    marginTop: theme.spacing(3),
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
  productDetails: {
    background: '#FFFFFF',

    //padding: '0 10%'
  },
  textGrid1: {
    marginTop: theme.spacing(12),
    fontWeight: 500,
    fontSize: '12px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#6F6C6B',
  },
  textGrid2: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(5),
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '18px',
    color: '#1D1D1F',
  },
  productGrid: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    overflowX: 'hidden',
    backgroundColor: '#EBE9DF'
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
  seeMoreButtom: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(12)
  }
}))

const productList = [
  {
    id: '0',
    name: 'T-Shirt Nyc Social Verde Thrif-Tee',
    brand: 'Anne Folle',
    image: '/product/product1.svg',
    price: '890.00',
    installments: '3'
  },
  {
    id: '1',
    name: 'T-Shirt Nyc Social Verde Thrif-Tee',
    brand: 'Anne Folle',
    image: '/product/product2.svg',
    price: '2290.00',
    installments: '3'
  },
  {
    id: '2',
    name: 'T-Shirt Nyc Social Verde Thrif-Tee',
    brand: 'Anne Folle',
    image: '/product/product3.svg',
    price: '490.00',
    installments: '3'
  },
  {
    id: '3',
    name: 'T-Shirt Nyc Social Verde Thrif-Tee',
    brand: 'Anne Folle',
    image: '/product/product4.svg',
    price: '1990.00',
    installments: '3'
  }
]

/*const product = {
  name: 'Jaqueta slim matelassê',
  description:
    'Jaqueta slim matelassê Moncler. Com logo na parte externa da haste, efeito matelassê, mangas longas, fechamento frontal por zíper, bolsos frontais com zíperes e barra reta.',
  details://??????
    'Jaqueta Slim matelassê Moncler. Com logo na parte externa da haste,' +
    'efeito matelassê, mangas longas, fechamento frontal por zíper, bolsos frontais com zíperes e barra reta. \n\n' +
    'Composição: Poliamida 100%. \n' +
    'Preenchimento: Plumas de ganso 90%, Plumas 10%.\n\n' +
    'Instruções de lavagem: Lavar à mão\n' +
    'ID da marca: UF11350I386\n\n' +
    'O look: Modelo mede 1,79 m e usa tamanho 2. O modelo também veste: Moncler Calça esportiva com ajuste no cós',
  shop: {
    name: 'Moncler'
  },
  variants: [
    {
      id: 0,
      size: 'PP',
      color: {
        name: "Rosa",
        rgb: '#E5C7BE'
      },
      stock: 1
    },
    {
      id: 1,
      size: 'P',
      color: {
        name: "Preto",
        rgb: '#000000'
      },
      stock: 4
    },
    {
      id: 2,
      size: 'M',
      color: {
        name: "Laranja",
        rgb: '#F03E1B'
      },
      stock: 3
    },
    {
      id: 3,
      size: 'G',
      color: {
        name: "Branco",
        rgb: '#FFFFFF'
      },
      stock: 3
    }
  ],
  promotionalUnitPrice: '10790.00',
  unitPrice: '12785.00',
  images: [
    {
      id: 0,
      path: '/product/moncler1.svg',
    },
    {
      id: 1,
      path: '/product/moncler2.svg',
    },
    {
      id: 2,
      path: '/product/moncler3.svg',
    },
    {
      id: 3,
      path: '/product/moncler4.svg',
    }
  ]
}*/



export default function Index(props) {
  const classes = useStyles()
  const router = useRouter()
  const { produto } = router.query
  const {data} = props
  console.log(data);
  const product = data.productByHandle as Product
  
  return (
    <React.Fragment>
      <div className={classes.root}>
        <Breadcrumbs page={product.title} path={[{name:'Marcas', url:'/marcas'}, {name:product.vendor, url:`/marcas/${Util.handleFromVendor(product.vendor)}`}]} />
        <div className={classes.productDetails}>
          
          <Divider className={classes.divider} />

          <ProductSingle product={product} />
        </div>        
      </div>

      <div className={classes.productGrid}>
        <Typography className={classes.textGrid1}>RECOMENDAÇÕES</Typography>
        <Typography className={classes.textGrid2}>Você também pode gostar</Typography>
        <ProductGrid productList={//productList TODO: FIX IT
        []} />
        <Button className={classes.seeMoreButtom} variant='outlined'>
          VEJA MAIS PRODUTOS
        </Button>
      </div>
    </React.Fragment>
  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {  
  return (await ssrProductByHandle.getServerPage({
    variables: {
      handle: ctx.params.produto as string
    }
  }, ctx))
}
