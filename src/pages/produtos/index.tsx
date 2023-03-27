import React, { useState, useEffect } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Hidden, Typography, Link, Button, LinearProgress, useMediaQuery } from '@material-ui/core'
import { ProductFilter, ProductFilterMobile, ProductGrid, ProductsHeader, Breadcrumbs } from '../../components'
import NotFoundScreen from './components/NotFoundScreen'
import { ssrProductsCatalog } from '../../generated/page'
import { GetServerSideProps } from 'next'
import { Product } from '../../generated/graphql'
import { useRouter } from 'next/router'
import axios from 'axios'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    background: '#fff',
    flexDirection: 'column',
    margin: '18px 188px',
    [theme.breakpoints.down('md')]: {
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
  searchTextGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  resultText: {
    fontFamily: "Suisse Int\\'l",
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '24px',
    textAlign: 'center',
    color: '#000000',
  },
  searchText: {
    fontFamily: "Suisse Int\\'l",
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '32px',
    textAlign: 'center',
    marginLeft: '8px',
    color: '#000000',
  },
}))

export default function Index(props)  {
  const { data } = props
  const router = useRouter()
  const { search } = router.query
  console.log(router.query);
  
  
  const classes = useStyles()
  const [openFilter, setOpenFilter] = useState(false)
  const [afterRequest, setAfterRequest] = useState<string>(data.productsCatalog.metadata.after)
  const [products, setProducts] = useState<Product[]>(data.productsCatalog.products as Product[])
  const [minPrice, setMinPrice] = useState<number>(Math.min(...products.map(p => (p.promotionalUnitPrice || p.unitPrice))))
  const [maxPrice, setMaxPrice] = useState<number>(Math.max(...products.map(p => (p.promotionalUnitPrice || p.unitPrice))))
  const initialFilter = {
    categoriesNames: [],
    produto: '',
    colorGroups: [],
    sizes: [],
    colors: [],
    occasion: [],
    materials: [],
    shop: [],
    price: [minPrice, maxPrice],
  }

  const [filterItems, setFilterItems] = useState(initialFilter)
  const handleLoadMore = async () => {
    if(!afterRequest) return;
    
    const {data: res} = await axios.get('../api/products', { params: {filters: filterItems, after: afterRequest} })
    setProducts([...products, ...res.data.productsCatalog.products])
    setAfterRequest(res.data.productsCatalog.metadata.after)
  }

  const applyFilter = async () => {
    const {data: res} = await axios.get('../api/products', { params: {filters: filterItems} })
    setProducts([...res.data.productsCatalog.products])
    setAfterRequest(res.data.productsCatalog.metadata.after)
  }

  useEffect(()=> {
    if(filterItems != initialFilter || !filterItems){
      applyFilter()      
    }
  }, [filterItems])

  const found = products.length > 0

  const handleFilterChange = (event, type) => {
    if (event.target.checked) {
      setFilterItems({ ...filterItems, [type]: [...filterItems[type], event.target.name] })
    } else {
      setFilterItems({ ...filterItems, [type]: filterItems[type].filter(item => item !== event.target.name) })
    }
  }

  const handlePriceChange = (event, newValue) => {
    setFilterItems({ ...filterItems, price: newValue })
  }

  const handleProductChange = event => {
    setFilterItems({ ...filterItems, produto: event.target.value })
  }
    const {
        colors: availableColors,
        sizes: availableSizes,
        materials: availableMaterials,
        categories: availableCategories,
    } = data.productsCatalog.facetedFilters
    const { totalCount} = data.productsCatalog.metadata
    const count = products.length

    const filterProps = {
        filterItems: filterItems,
        handleFilterChange: handleFilterChange,
        handlePriceChange: handlePriceChange,
        handleProductChange: handleProductChange,
        maxPrice,
        minPrice,
        shop: data.productsCatalog.products?.map((item) => item.shop?.name),
        colorGroups: availableColors.map(c => c.value),
        sizes: availableSizes.map(c => c.value),
        materials: availableMaterials.map(c => c.value),
        categoriesNames: availableCategories.map(c => c.value),
    }
  const theme = useTheme()
  const screenMatches = useMediaQuery(theme.breakpoints.down('md'))

  const progress = (count / totalCount) * 100
  if (!screenMatches && openFilter) {
    setOpenFilter(false)
  } else if (screenMatches && openFilter) {
    return (
      <Hidden lgUp>
        {openFilter ? (
          <ProductFilterMobile className={classes.mobileFilter} clearFilter={() => setOpenFilter(false)}>
            <ProductFilter {... filterProps} />
          </ProductFilterMobile>
        ) : (
          <React.Fragment />
        )}
      </Hidden>
    )
  }
  return (
    <div className={classes.root}>
      <Breadcrumbs page='Produtos' />
      <ProductsHeader count={products.length} setOpenFilter={setOpenFilter} />
      {found ? (
        <div className={classes.content}>
          <Hidden mdDown>
            <ProductFilter {... filterProps} />
          </Hidden>
          <div className={classes.prodGrid}>
            {search &&
              <div className={classes.searchTextGroup}>
                <Typography className={classes.resultText}>Seu resultado para: </Typography>
                <Typography className={classes.searchText}> {search as string}</Typography>
              </div>
            }
            <ProductGrid productList={products} />
            <div className={classes.loadMore}>
              <Typography className={classes.loadText}>{count} de {totalCount} Produtos</Typography>
              <LinearProgress className={classes.progressBar} variant='determinate' color='secondary' value={progress} />
              <Button variant='outlined' className={classes.button} onClick={handleLoadMore}>
                Carregar Mais
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <NotFoundScreen searchText={search as string} />
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return (await ssrProductsCatalog.getServerPage({
        variables: {
            filter: {
                //search: ctx.query?.search as string,
                //categoriesNames: ctx.query?.categoriesNames
            },
            pagination: {
                limit: 5,
                includeTotalCount: true,
            }
        }
    }, ctx))
}
