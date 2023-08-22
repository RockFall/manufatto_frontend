import React from 'react'

import { makeStyles } from '@mui/styles'
import { Grid } from '@mui/material'

import { ProductCard } from '../../components'

import { Product } from '../../generated/graphql'

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2)
  },
  cardItem: {
    margin: theme.spacing(2.5)
  },
  grid: {
    justifyContent: 'center'
  },
  gridItem: {
    //width: '356px',
    width: 'calc(18vw + 52px)',
    //height: '441px',
    //maxWidth: '25%',
  } 
}))

interface ProductGridProp {
  productList: Product[]
}

const ProductGrid = (props: ProductGridProp) => {
  const { productList, ...rest } = props
  const classes = useStyles()

  //console.log(productList)
  return (
    <div className={classes.root}>
      <Grid container spacing={2} alignItems='center' className={classes.grid}>
        {productList.map((product, i) => {
          return (
            <div key={i} className={classes.gridItem}>
              <ProductCard product={product} className={classes.cardItem}/>
            </div>
          )
        })}
      </Grid>
    </div>
  )
}

export default ProductGrid
