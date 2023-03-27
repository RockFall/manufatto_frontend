import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Box, Typography } from '@material-ui/core'

import { ProductGrid, Highlights, BannerCarousel, CustomizationBanner, ProductsButtonGrid } from '../components'
//import { HighlightBanner } from '../generated/graphql'
import { useRouter } from 'next/router'

// Data fetching
import { GetServerSideProps } from 'next'
import { ssrHomeDetails, PageHomeDetailsComp } from '../generated/page'
import { Product, SimpleProduct, VariableProduct } from '../generated/graphql'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    overflow: 'hidden',
  },
  mainBackground: {
    background: '#EBE9DF',
  },
  highlights: {
    background: '#FFF',
  },
  productSession: {
    marginTop: theme.spacing(13),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  shopNowTitle: {
    fontWeight: 500,
    fontSize: theme.spacing(2),
    textAlign: 'center',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#6F6C6B',
    marginTop: theme.spacing(10),

  },
  shopNowSubtitle: {
    color: '#1D1D1F',
    fontWeight: 600,
    fontSize: theme.spacing(3),
    textAlign: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(7.5),
  },
  buttonsRoot: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
}))

const defaultBannerList = [
  {
    type: 'MOSAIC',
    id: 1,
    title: 'Lorem ipsum dolor',
    order: 0,
    background: '',
    description: 'aaaaaa',
    isActive: true,
    images: [
        {
          image: {
            original: '/mosaicImages1.png',
            originalWbp: '/mosaicImages1.png',
          }
        },
        {
          image: {
            original: '/mosaicImages2.png',
            originalWbp: '/mosaicImages2.png',
          }
        },
        {
          image: {
            original: '/mosaicImages3.png',
            originalWbp: '/mosaicImages3.png',
          }
        },
      ],
    links: [
      {
        id: 10,
        text: 'adipiscing elit.',
        url: '',
      }
    ]
  },
  {
    type: 'OUTFIT',
    id: 2,
    title: 'Lorem ipsum dolor',
    order: 0,
    background: '',
    description: 'aaaaaa',
    isActive: true,
    images: [
        {
          image: {
            original: '/croqui1.png',
            originalWbp: '/croqui1.png',
          }
        },
      ],
    links: [
      {
        id: 2,
        text: 'adipiscing elit.',
        url: '',
      },
    ]
  },
  {
    type: 'MOSAIC',
    id: 1,
    title: 'Lorem ipsum dolor',
    order: 0,
    background: '',
    description: 'aaaaaa',
    isActive: true,
    images: [
        {
          image: {
            original: '/mosaicImages1.png',
            originalWbp: '/mosaicImages1.png',
          }
        },
        {
          image: {
            original: '/mosaicImages2.png',
            originalWbp: '/mosaicImages2.png',
          }
        },
        {
          image: {
            original: '/mosaicImages3.png',
            originalWbp: '/mosaicImages3.png',
          }
        },
      ],
    links: [
      {
        id: 10,
        text: 'adipiscing elit.',
        url: '',
      }
    ]
  },
  {
    type: 'OUTFIT',
    id: 2,
    title: 'Lorem ipsum dolor',
    order: 0,
    background: '',
    description: 'aaaaaa',
    isActive: true,
    images: [
        {
          image: {
            original: '/croqui2.png',
            originalWbp: '/croqui2.png',
          }
        },
      ],
    links: [
      {
        id: 2,
        text: 'adipiscing elit.',
        url: '',
      },
    ]
  },
]

const Index: PageHomeDetailsComp = (props) => {
  const classes = useStyles()
  const router = useRouter()
  const { data } = props

  return (
    <div className={classes.root}>
      <div className={classes.mainBackground}>
        
        
        <div className={classes.productSession}>
          
          

          <Typography className={classes.shopNowTitle}> Shop Now </Typography>
          <Typography className={classes.shopNowSubtitle}> O que vira tendência, está aqui. </Typography>

          {
            data && 
            data.productsRandomSuggestions.edges.length != 0 && 
            <ProductGrid productList={data?.productsRandomSuggestions.edges.map(({node}) => node) as (SimpleProduct | VariableProduct)[]} />
          }
          

          <Button style={{ margin: '3.4% 0 5%' }} className={classes.button} color='inherit' onClick={()=> router.push(`/produtos`)}>
            VEJA MAIS PRODUTOS
          </Button>
        </div>
      </div>
      <Box my={4} className={classes.highlights}>
        
        
      </Box>
      
      
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return (await ssrHomeDetails.getServerPage({
    variables: { 
      amount: 8
    }
  }, ctx))
}

export default Index
