import React from 'react'
import { makeStyles } from '@mui/styles'
import { Grid } from '@mui/material'
import { BrandCard } from '../../components'

const useStyles = makeStyles(theme => ({
  root: {
    paddingBottom: '1.7%',
    [theme.breakpoints.down('lg')]: {
      margin: '0px',
    }
  },
}))

interface BrandGridProp {
  brandList: any
}

const BrandGrid = (props: BrandGridProp) => {
  const { brandList, ...rest } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container justifyContent='center' alignItems='flex-start'>
        {brandList.map((brand, i) => {
          return (
            <div key={i}>
              <BrandCard brand={brand} />
            </div>
          )
        })}
      </Grid>
    </div>
  );
}

export default BrandGrid
