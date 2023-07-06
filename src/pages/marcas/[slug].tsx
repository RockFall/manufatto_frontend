import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import { Hidden, Typography, Button, LinearProgress, useMediaQuery } from '@material-ui/core'
import { ProductFilter, ProductFilterMobile, ProductsHeader, ProductGrid, FilterChips, BrandBanner } from '../../components'

import { PageShopDetailsComp, ssrShopDetails } from '../../generated/page'
import { Product, Shop } from '../../generated/graphql'

import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { ProductFilterProps } from '../../components/ProductFilter/ProductFilter'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    background: '#fff',
    flexDirection: 'column',
    padding: '18px 188px',
    [theme.breakpoints.down('md')]: {
      padding: '18px 28px',
    },
  },
  content: {
    background: '#fff',
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

const ShopPage: PageShopDetailsComp = (props) => {
  const { data } = props

  const [products, setProducts] = useState<Product[]>(data.productsCatalog.products as Product[])
  const classes = useStyles()

  const minPrice = Math.min(...products.map(p => (p.promotionalUnitPrice || p.unitPrice)))
  const maxPrice = Math.max(...products.map(p => (p.promotionalUnitPrice || p.unitPrice)))

  const [openFilter, setOpenFilter] = useState(false)
  const [filterItems, setFilterItems] = useState({
    shops: [],
    categories: [],
    product: '',
    size: [],
    colors: [],
    materials: [],
    price: [minPrice, maxPrice],
  })

  const isLoadMoreEnabled = products.length < data.productsCatalog.metadata?.totalCount

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
    setFilterItems({ ...filterItems, product: event.target.value })
  }

  const theme = useTheme()
  const screenMatches = useMediaQuery(theme.breakpoints.down('md'))

  const {
    colors: availableColors,
    sizes: availableSizes,
    materials: availableMaterials,
    categories: availableCategories
  } = data.productsCatalog.facetedFilters
  const { totalCount } = data.productsCatalog.metadata
  const count = data.productsCatalog.products?.length

  const filterProps: ProductFilterProps = {
    filterItems: filterItems,
    handleFilterChange: handleFilterChange,
    handlePriceChange: handlePriceChange,
    handleProductChange: handleProductChange,
    maxPrice,
    minPrice,
    colors: availableColors.map(c => c.value),
    sizes: availableSizes.map(c => c.value),
    materials: availableMaterials.map(c => c.value),
    categories: availableCategories.map(c => c.value),
  }

  const progress = ((count || 0) / totalCount) * 100
  if (!screenMatches && openFilter) {
    setOpenFilter(false)
  } else if (screenMatches && openFilter) {
    return (
      <Hidden lgUp>
        {openFilter ? (
          <ProductFilterMobile className={classes.mobileFilter} clearFilter={() => setOpenFilter(false)}>
            <FilterChips handleFilterDelete={handleFilterDelete} filterItems={filterItems} />
            <ProductFilter {...filterProps} />
          </ProductFilterMobile>
        ) : (
          <React.Fragment />
        )}
      </Hidden>
    )
  }
  return (
    <React.Fragment>
      <BrandBanner shop={data.shop as Shop} />

      <div className={classes.root}>
        <ProductsHeader setOpenFilter={setOpenFilter} count={totalCount} />
        <div className={classes.content}>
          <Hidden mdDown>
            <ProductFilter {...filterProps} />
          </Hidden>
          <div className={classes.prodGrid}>
            <FilterChips handleFilterDelete={handleFilterDelete} filterItems={filterItems} />
            <ProductGrid productList={data.productsCatalog.products as Product[]} />
            <div className={classes.loadMore}>
              <Typography className={classes.loadText}>{count} de {totalCount} Produtos</Typography>
              <LinearProgress className={classes.progressBar} variant='determinate' color='secondary' value={progress} />
              {isLoadMoreEnabled && <Button variant='outlined' className={classes.button}> Carregar Mais </Button>}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
)}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { params } = ctx
  const slug = (typeof params.slug === 'object') ? params.slug[0] : params.slug

  return (await ssrShopDetails.getServerPage({
    variables: {
      pagination: {
        limit: 20,
        includeTotalCount: true,
      },
      filter: {
        shop: [slug]
      },
      slug
    }
  }, ctx))
}

export default ShopPage
