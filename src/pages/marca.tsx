import React, { useState } from 'react'
import { makeStyles, useTheme } from '@mui/styles'
import { Hidden, Typography, Button, LinearProgress, useMediaQuery } from '@mui/material'
import { ProductFilter, ProductFilterMobile, ProductsHeader, ProductGrid, FilterChips, BrandBanner } from '../components'

// Data fetching
import { GetServerSideProps } from 'next'
//import { ssrRandomProducts, PageRandomProductsComp } from '../generated/page'
import { withApollo } from '../withApollo'
import { Product } from '../generated/graphql'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    background: '#fff',
    flexDirection: 'column',
    margin: '18px 188px',
    [theme.breakpoints.down('lg')]: {
      margin: '18px 28px',
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  prodGrid: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: '0px',
    marginTop: '9px',
  },
  progressBar: {
    width: '150px',
    height: '3px',
    margin: '8px',
  },
  loadMore: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '80px',
    marginBottom: '96px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadText: {
    color: '#6F6C6B',
    fontSize: '12px',
    fontWeight: 400,
    fontFeatureSettings: "'liga' off, 'kern' off",
  },
  mobileFilter: {
    backgroundColor: '#fff',
  },
}))


//const Index: PageRandomProductsComp = (props) => {
  
const Index = (props) => {
  console.log({ props })

  const { data } = props
  const classes = useStyles()
  const [openFilter, setOpenFilter] = useState(false)

  const [filterItems, setFilterItems] = useState({
    marcas: [],
    categorias: [],
    produto: '',
    tamanho: [],
    cores: [],
    tecido: [],
    price: [0, 100],
  })

  const handleFilterChange = (event, type) => {
    if (event.target.checked) {
      setFilterItems({ ...filterItems, [type]: [...filterItems[type], event.target.name] })
    } else {
      setFilterItems({ ...filterItems, [type]: filterItems[type].filter(item => item !== event.target.name) })
    }
  }

  const handleFilterDelete = (name, type) => {
    setFilterItems({ ...filterItems, [type]: filterItems[type].filter(item => item !== name) })
  }

  const handlePriceChange = (event, newValue) => {
    setFilterItems({ ...filterItems, price: newValue })
  }

  const handleProductChange = event => {
    setFilterItems({ ...filterItems, produto: event.target.value })
  }

  const theme = useTheme()
  const screenMatches = useMediaQuery(theme.breakpoints.down('lg'))

  const progress = (18 / 79) * 100
  if (!screenMatches && openFilter) {
    setOpenFilter(false)
  } else if (screenMatches && openFilter) {
    return (
      <Hidden lgUp>
        {openFilter ? (
          <ProductFilterMobile className={classes.mobileFilter} clearFilter={() => setOpenFilter(false)}>
            <FilterChips handleFilterDelete={handleFilterDelete} filterItems={filterItems} />
            <ProductFilter
              filterItems={filterItems}
              handleFilterChange={handleFilterChange}
              handlePriceChange={handlePriceChange}
              handleProductChange={handleProductChange}
              maxPrice={1000}
              minPrice={1}
            />
          </ProductFilterMobile>
        ) : (
          <React.Fragment />
        )}
      </Hidden>
    )
  }
  return (
    <div>
      <BrandBanner />
      <div className={classes.root}>
        <ProductsHeader setOpenFilter={setOpenFilter} count={data?.productsRandomSuggestions.length} />
        <div className={classes.content}>
          <Hidden lgDown>
            <ProductFilter
              filterItems={filterItems}
              handleFilterChange={handleFilterChange}
              handlePriceChange={handlePriceChange}
              handleProductChange={handlePriceChange}
              maxPrice={1000}
              minPrice={1}
            />
          </Hidden>
          <div className={classes.prodGrid}>
            <FilterChips handleFilterDelete={handleFilterDelete} filterItems={filterItems} />
            {data && data.productsRandomSuggestions && <ProductGrid productList={data?.productsRandomSuggestions as Product[]} />}
            <div className={classes.loadMore}>
              <Typography className={classes.loadText}>18 de 79 Produtos</Typography>
              <LinearProgress className={classes.progressBar} variant='determinate' color='secondary' value={progress} />
              <Button variant='outlined' className={classes.button}>
                Carregar Mais
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/*
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return (await ssrRandomProducts.getServerPage({
    variables: { amount: 9 }
  }, ctx))
}*/

export default Index