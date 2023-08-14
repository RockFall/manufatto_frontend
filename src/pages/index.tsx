import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Box, Typography } from '@material-ui/core'

import { ProductGrid, Highlights, BannerCarousel, CustomizationBanner, ProductsButtonGrid } from '../components'
//import { HighlightBanner } from '../generated/graphql'
import { HighlightBanner } from '../util/custom_types'
import { useRouter } from 'next/router'

// Data fetching
import { GetServerSideProps } from 'next'
import { ssrHomeDetails, PageHomeDetailsComp } from '../generated/page'
import { Product } from '../generated/graphql'

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
    fontSize: theme.spacing(1.6),
    textAlign: 'center',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#6F6C6B',
    marginTop: theme.spacing(10),

  },
  shopNowSubtitle: {
    color: '#1D1D1F',
    fontWeight: 600,
    fontSize: theme.spacing(2.6),
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

  console.log("Props: ", props)
  console.log("Data: ", data)
  console.log("shopsList: ", data?.shopsList)
  console.log("shops: ", data?.shopsList?.shops)

  // Getting vendor list
  const vendors = data?.shopsList.shops.map(({name}) => name.text) as String[]

  

  // Getting random products from each vendor
  const randomVendors = Array.from(vendors).sort(() => 0.5 - Math.random())

  const randomProducts = []

  data?.collections.edges.forEach(({ node }) => {
    if (randomProducts.length >= 8) return;
    const vendorName = node.title;
    if (randomVendors.includes(vendorName)) {
      const vendorProducts = node.products.edges.map(({ node }) => node);
      const randomProduct = vendorProducts.slice(0,5).sort(() => 0.5 - Math.random())[0];
      randomProducts.push(randomProduct);
      console.log("Product selected: ", randomProduct.title, "from vendor: ", vendorName)
    }
  })

  const carouselBanners = data.metaobjects.edges[0] 
    ? data.metaobjects.edges
        .map(({node}) => JSON.parse(node.fields[0].value))
        .filter(banner => banner.isActive === true)
        .sort((a, b) => a.order - b.order) as HighlightBanner[] 
    : (defaultBannerList as unknown as HighlightBanner[])
  console.log('carouselBanners', carouselBanners)



  return (
    <div className={classes.root}>
      <div className={classes.mainBackground}>
      <BannerCarousel
          items={data.metaobjects.edges[0] ? carouselBanners : (defaultBannerList as unknown as HighlightBanner[])}
        />

        <div className={classes.productSession}>
          <ProductsButtonGrid className={classes.buttonsRoot} />

          <Typography className={classes.shopNowTitle}> Shop Now </Typography>
          <Typography className={classes.shopNowSubtitle}> O que vira tendência, está aqui. </Typography>
          
          {
            data && 
            data.collections.edges.length != 0 &&
            <ProductGrid productList={randomProducts} />
          }

          <Button style={{ margin: '3.4% 0 5%' }} className={classes.button} color='inherit' onClick={()=> router.push(`/produtos`)}>
            VEJA MAIS PRODUTOS
          </Button>
        </div>
      </div>
      <Box my={4} className={classes.highlights}>
        <Highlights shopsList={data.shopsList.shops} />
      </Box>
      <CustomizationBanner />
    </div>
  )
}

const MAX_RETRIES = 5;

/*
export const getServerSideProps: GetServerSideProps = async (ctx) => {

  let retries = 0;
  let data;

  // Try to get the data from the server, retrying if it fails.
  while (retries < MAX_RETRIES) {
    try {
      console.log("Trying to get data from server...");
      data = await ssrHomeDetails.getServerPage({});
      break;  // Break out of the loop if the request was successful.
    } catch (error) {
      console.log("There was an error: ", error);
      if (error.message === 'Throttled') {
        console.log("Throttled, waiting for a bit before retrying...");
        retries++;
        await new Promise(resolve => setTimeout(resolve, retries * 1000));  // Wait for a bit before retrying.
      } else {
        throw error;  // If it's not a throttling error, re-throw it.
      }
    }
  }

  return data

  return (await ssrHomeDetails.getServerPage({
  }, ctx))
}*/

export async function getStaticProps() {
  let retries = 0;
  let data;

  // Try to get the data from the server, retrying if it fails.
  while (retries < MAX_RETRIES) {
    try {
      console.log("Trying to get data from server...");
      data = (await ssrHomeDetails.getServerPage({})).props.data;
      break;  // Break out of the loop if the request was successful.
    } catch (error) {
      console.log("There was an error: ", error);
      if (error.message === 'Throttled') {
        console.log("Throttled, waiting for a bit before retrying...");
        retries++;
        await new Promise(resolve => setTimeout(resolve, retries * 1000));  // Wait for a bit before retrying.
      } else {
        throw error;  // If it's not a throttling error, re-throw it.
      }
    }
  }

  return {
    props: {
      data,
    },
    revalidate: 120, // Page will be regenerated in the background every 120 seconds.
  };
}

export default Index
