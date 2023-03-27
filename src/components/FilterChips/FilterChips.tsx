/* eslint-disable no-unused-vars */
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Chip } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    margin: 0,
    paddingBottom: '26px',
  },
  chip: {
    margin: theme.spacing(0.5),
    background: '#F3F3F3',
    border: '1px solid #C1BBA7',
    boxSizing: 'border-box',
    borderRadius: '22px',
  },
}))

interface FilterChipsProps {
  filterItems: any
  className?: string
  handleFilterDelete: Function
}

const FilterChips = (props: FilterChipsProps) => {
  const { handleFilterDelete, filterItems, className, ...rest } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {filterItems.shops && filterItems.shops.map(marca => (
        <Chip
          deleteIcon={<CloseIcon />}
          label={marca}
          onDelete={() => {
            handleFilterDelete(marca, 'shops')
          }}
          className={classes.chip}
        />
      ))}

      {filterItems.categories && filterItems.categories.map(categoria => (
        <Chip
          deleteIcon={<CloseIcon />}
          label={categoria}
          onDelete={() => {
            handleFilterDelete(categoria, 'categories')
          }}
          className={classes.chip}
        />
      ))}

      {filterItems.sizes && filterItems.sizes.map(size => (
        <Chip
          deleteIcon={<CloseIcon />}
          label={size}
          onDelete={() => {
            handleFilterDelete(size, 'sizes')
          }}
          className={classes.chip}
        />
      ))}

      {filterItems.colors && filterItems.colors.map(color => (
        <Chip
          deleteIcon={<CloseIcon />}
          label={color}
          onDelete={() => {
            handleFilterDelete(color, 'colors')
          }}
          className={classes.chip}
        />
      ))}

      {filterItems.materials && filterItems.materials.map(material => (
        <Chip
          deleteIcon={<CloseIcon />}
          label={material}
          onDelete={() => {
            handleFilterDelete(material, 'materials')
          }}
          className={classes.chip}
        />
      ))}
    </div>
  )
}

export default FilterChips
