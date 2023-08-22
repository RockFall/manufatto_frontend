import React, { useState } from 'react'
import clsx from 'clsx'
import { makeStyles, withStyles } from '@mui/styles'
import { Button, Typography, IconButton } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import CloseIcon from '@mui/icons-material/Close'
const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '24px',
  },
  filterTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '54px',
  },
  childs: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buttonsGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
  },
  whiteButton: {
    backgroundColor: '#FFFFFF',
    color: '#1D1D1F',
    borderRadius: 0,
    boxShadow: 'none',
  },
  blackButton: {
    borderRadius: 0,
    boxShadow: 'none',
  },
  line: {
    border: '1px solid #D3D3D3',
    width: '100%',
    margin: '24px 0px',
  },
  close: {
    color: '#6F6C6B',
  },
}))

interface ProductFilterMobileProps {
  className?: string
  children?: any
  clearFilter?: Function
  onSubmit?: Function
}

const ProductFilterMobile = (props: ProductFilterMobileProps) => {
  const { clearFilter, onSubmit, children, className, ...rest } = props
  const classes = useStyles()

  return (
    <div className={clsx(classes.root, className)}>
      <div className={classes.filterTitle}>
        <Typography variant='h5'>
          <FilterListIcon /> Filtro{' '}
        </Typography>
        <IconButton aria-label='delete' onClick={() => clearFilter()} size="large">
          <CloseIcon className={classes.close} />
        </IconButton>
      </div>
      <div className={classes.childs}>{children}</div>
      <div className={classes.line} />
      <div className={classes.buttonsGroup}>
        <Button variant='contained' className={classes.whiteButton} onClick={() => clearFilter()}>
          Limpar Filtro
        </Button>
        <Button variant='contained' className={classes.blackButton} onClick={() => clearFilter()}>
          Aplicar Filtro
        </Button>
      </div>
    </div>
  );
}

export default ProductFilterMobile
