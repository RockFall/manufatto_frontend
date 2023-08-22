import React, { useState } from 'react'
import clsx from 'clsx'
import { makeStyles, withStyles } from '@mui/styles'
import { Checkbox, Typography, Slider, Input, InputAdornment, RadioGroup, Radio, FormControlLabel, FormGroup } from '@mui/material'
import { FilterAcordion } from './components'
//import { ColorGroup, ProductMaterial, ProductSize } from '../../generated/graphql'

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: '14px',
    textAlign: 'center',
    margin: '0px 0px',
  },
  spacer: {
    width: '100%',
    height: '1px',
    backgroundColor: '#E0E0E0',
    margin: theme.spacing(1),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  checkbox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterItem: {
    fontFamily: "Suisse Int\\'l",
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '24px',
    color: '#6F6C6B',
    marginLeft: '0px',
  },
  priceInput: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    margin: '10px 0px',
  },
  priceField: {
    background: '#F3F3F3',
    border: '1px solid #C1BBA7',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '12px 16px',
    width: '145.9px',
    height: '38px',
  },
}))

const PriceSlider = withStyles({
  root: {
    color: '#3a8589',
    height: 3,
    padding: '13px 0',
  },
  thumb: {
    height: 30,
    width: 30,
    backgroundColor: '#6F6C6B',
    marginTop: -12,
    marginLeft: -13,
  },
  active: {},
  track: {
    height: 5,
    color: '#1D1D1F',
  },
  rail: {
    color: '#E0E0E0',
    opacity: 1,
    height: 3,
  },
})(Slider)

export interface ProductFilterProps {
  className?: string
  filterItems: any
  handleFilterChange: Function
  handlePriceChange: Function
  handleProductChange: Function
  shop?: string[]
  categories?: string[]
  colors?: string[]
  sizes?: string[]
  materials?: string[]
  occasion?: string[]
  maxPrice: number
  minPrice: number
}

const ProductFilter = (props: ProductFilterProps) => {
  const {
    filterItems,
    handleFilterChange,
    handlePriceChange,
    handleProductChange,
    className,
    shop,
    categories,
    colors,
    sizes,
    materials,
    minPrice,
    maxPrice,
  } = props
  const classes = useStyles()
  

  return (
    <div className={clsx(classes.root, className)}>
      {shop && shop.length && (<>
        <FilterAcordion expanded title='Marcas'>
          <FormGroup>
            {shop.map((shop, i) => {
              return (
                <div className={classes.checkbox} key={i}>
                  <FormControlLabel
                    className={classes.filterItem}
                    control={
                      <Checkbox
                        checked={filterItems['shop'].includes(shop)}
                        onChange={e => handleFilterChange(e, 'shop')}
                        name={shop}
                      />
                    }
                    label={shop}
                  />
                </div>
              )
            })}
          </FormGroup>
        </FilterAcordion>
        <div className={classes.spacer} />
      </>)}

      {/* <FilterAcordion title='Produtos'>
        <FormGroup>
          <RadioGroup aria-label='Products' name='Products' value={filterItems.produto} onChange={e => handleProductChange(e)}>
            <FormControlLabel className={classes.filterItem} value='Roupas' control={<Radio />} label='Roupas' />
            <FormControlLabel className={classes.filterItem} value='Bolsas' control={<Radio />} label='Bolsas' />
            <FormControlLabel className={classes.filterItem} value='Sapatos' control={<Radio />} label='Sapatos' />
            <FormControlLabel className={classes.filterItem} value='Acessorios' control={<Radio />} label='Acessorios' />
          </RadioGroup>
        </FormGroup>
      </FilterAcordion> */}
      {categories && categories.length && (<>
        <FilterAcordion title='Categorias'>
          <FormGroup>
            {categories.map((category, i) => {
              return (
                <div className={classes.checkbox} key={i}>
                  <FormControlLabel
                    className={classes.filterItem}
                    control={
                      <Checkbox
                        checked={filterItems['categories'].includes(category)}
                        onChange={e => handleFilterChange(e, 'categories')}
                        name={category}
                      />
                    }
                    label={category}
                  />
                </div>
              )
            })}
          </FormGroup>
        </FilterAcordion>
        <div className={classes.spacer} />
      </>)}

      <FilterAcordion expanded title='Preço'>
        <div className={classes.priceInput}>
          <Input
            value={filterItems.price[0]}
            className={classes.priceField}
            onChange={e => handlePriceChange(e, [parseInt(e.target.value || '0', 10), filterItems.price[1]])}
            startAdornment={<InputAdornment position='end'>R$</InputAdornment>}
          />
          <Typography> até </Typography>
          <Input
            value={filterItems.price[1]}
            className={classes.priceField}
            onChange={e => handlePriceChange(e, [filterItems.price[0], parseInt(e.target.value || '0', 10)])}
            startAdornment={<InputAdornment position='end'>R$</InputAdornment>}
          />
        </div>
        <PriceSlider
          defaultValue={filterItems.price}
          value={filterItems.price}
          max={maxPrice}
          min={minPrice}
          onChange={(e, newValue) => handlePriceChange(e, newValue)}
        />
      </FilterAcordion>
      <div className={classes.spacer} />

      {sizes && sizes.length && (<>
        <FilterAcordion title='Tamanho'>
          <FormGroup>
            {sizes.map((size, i) => {
              return (
                <div className={classes.checkbox} key={i}>
                  <FormControlLabel
                    className={classes.filterItem}
                    control={
                      <Checkbox
                        checked={filterItems['sizes'].includes(size)}
                        onChange={e => handleFilterChange(e, 'sizes')}
                        name={size}
                      />
                    }
                    label={size}
                  />
                </div>
              )
            })}
          </FormGroup>
        </FilterAcordion>
        <div className={classes.spacer} />
      </>)}

      {colors && colors.length && (<>
        <FilterAcordion title='Cores'>
          <FormGroup>
            {colors.map((color, i) => {
              return (
                <div className={classes.checkbox} key={i}>
                  <FormControlLabel
                    className={classes.filterItem}
                    control={
                      <Checkbox checked={filterItems['colors'].includes(color)} onChange={e => handleFilterChange(e, 'colors')} name={color} />
                    }
                    label={color}
                  />
                </div>
              )
            })}
          </FormGroup>
        </FilterAcordion>
        <div className={classes.spacer} />
      </>)}

      {materials && materials.length && (<>
        <FilterAcordion title='Tecido'>
          <FormGroup>
            {materials.map((material, i) => {
              return (
                <div className={classes.checkbox} key={i}>
                  <FormControlLabel
                    className={classes.filterItem}
                    control={
                      <Checkbox
                        checked={filterItems['materials'].includes(material)}
                        onChange={e => handleFilterChange(e, 'materials')}
                        name={material}
                      />
                    }
                    label={material}
                  />
                </div>
              )
            })}
          </FormGroup>
        </FilterAcordion>
      </>)}
    </div>
  )
}

export default ProductFilter
