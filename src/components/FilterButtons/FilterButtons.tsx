/* eslint-disable no-unused-vars */
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Box } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: '0px',
    margin: '0px 80px',
  },
  filterButton: {
    marginLeft: '32px',
    flex: 'none',
  },
  centered: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
}))

const FilterButtons = (props: any) => {
  const { className, ...rest } = props
  const classes = useStyles()

  return (
    <div className={classes.centered}>
      <Box {...rest} className={classes.root}>
        <Button variant='outlined' className={classes.filterButton}>
          {' '}
          ROUPAS +{' '}
        </Button>
        <Button variant='outlined' className={classes.filterButton}>
          {' '}
          BOLSAS +{' '}
        </Button>
        <Button variant='outlined' className={classes.filterButton}>
          {' '}
          ACESSÓRIOS +{' '}
        </Button>
        <Button variant='outlined' className={classes.filterButton}>
          {' '}
          CALÇADOS +{' '}
        </Button>
      </Box>
    </div>
  )
}

export default FilterButtons
