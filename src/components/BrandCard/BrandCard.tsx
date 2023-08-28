import React from 'react'
import { makeStyles } from '@mui/styles'
import { Link } from '@mui/material'
import Image from "next/legacy/image"

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    padding: `${theme.spacing(2.5)} ${theme.spacing(4)}`,
  },
  brandCard: {
    
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  name: {
    margin: '17px 0  7px',
    fontSize: '16px',
  },
}))

interface BrandProp {
  brand: any
}

const BrandCard = (props: BrandProp) => {
  const { brand, ...rest } = props
  const { image, name } = brand
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.brandCard}>
        <Link href='#' underline='none'>
          {' '}
          <Image src={image} width={488} height={461} alt=""  />{' '}
        </Link>
        <h4 className={classes.name}>
          {' '}
          <Link href='#'> {name} </Link>
        </h4>
      </div>
    </div>
  )
}

export default BrandCard
