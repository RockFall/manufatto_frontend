import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from '@material-ui/core'
import Image from 'next/image'

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    padding: `${theme.spacing(2.5)}px ${theme.spacing(4)}px`,
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
          <Image src={image} width={488} height={461} />{' '}
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
