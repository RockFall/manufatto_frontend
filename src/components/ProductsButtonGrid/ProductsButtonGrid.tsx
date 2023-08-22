import React from 'react'

import { makeStyles } from '@mui/styles'
import { Container, Button } from '@mui/material'

import { ProductCard } from '..'

import { Product } from '../../generated/graphql'

const useStyles = makeStyles(theme => ({
  button: {
    color: '#6F6C6B',
    fontSize: theme.spacing(2),
    margin: `0px ${theme.spacing(2)}`,
    padding: theme.spacing(4),
    width: theme.spacing(27.5),
    height: theme.spacing(11),
    flexGrow: 0,
  }
}))

interface ButtonsProps {
  className?: string
}

const ProductsButtonGrid = (props: ButtonsProps) => {
  const { className, ...rest} = props
  const classes = useStyles()

  //console.log(productList)
  return (
    <Container className={className}>
      <Button className={classes.button} variant='outlined'>
        ROUPAS +
      </Button>
      <Button className={classes.button} variant='outlined'>
        BOLSAS +
      </Button>
      <Button className={classes.button} variant='outlined'>
        ACESSÓRIOS +
      </Button>
      <Button className={classes.button} variant='outlined'>
        CALÇADOS +
      </Button>
    </Container>
  )
}

export default ProductsButtonGrid
