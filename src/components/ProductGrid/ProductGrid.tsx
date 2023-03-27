import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

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
  }
}))

interface ProductGridProp {
  productList: any//Product[]
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
            <div key={i}>
              <ProductCard product={product} className={classes.cardItem}/>
            </div>
          )
        })}
      </Grid>
    </div>
  )
}

export default ProductGrid
