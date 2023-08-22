import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Hidden, Typography, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    borderTop: '1px solid #E0E0E0',
    borderBottom: '1px solid #E0E0E0',
    paddingBottom: '16px',
    marginTop: '24px',
    marginBottom: theme.spacing(5),
  },
  pieceNumber: {
    fontSize: '16px',
    lineHeight: '24px',
    color: '#6F6C6B',
  },
  filterButton: {
    background: '#1D1D1F',
    color: '#fff',
    borderRadius: '22px',
    minWidth: theme.spacing(11)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '262px',
    height: '35px',
  },
}))

interface ProductsHeaderProp {
  className?: string
  setOpenFilter: Function
  count: Number
}

const ProductsHeader = (props: ProductsHeaderProp) => {
  const { setOpenFilter, className, count, ...rest } = props
  const classes = useStyles()
  const [order, setOrder] = useState('')
  const handleChange = event => {
    setOrder(event.target.value)
  }

  return (
    <div className={classes.root}>
      <Hidden lgDown>
        <Typography className={classes.pieceNumber}>{count} Peças</Typography>
      </Hidden>
      <Hidden lgUp>
        <Button className={classes.filterButton} onClick={() => setOpenFilter(true)} endIcon={<FilterListIcon />}>
          Filtro
        </Button>
      </Hidden>
      <FormControl className={classes.formControl}>
        <InputLabel>Ordenar Por:</InputLabel>
        <Select value={order} onChange={handleChange}>
          <MenuItem value={'Crescente'}>Crescente</MenuItem>
          <MenuItem value={'Decrescente'}>Decerescente</MenuItem>
          <MenuItem value={'Popular'}>Popular</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default ProductsHeader
