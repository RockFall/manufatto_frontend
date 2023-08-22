import React from 'react'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'
import { Container, Typography, Button } from '@mui/material'
import Image from 'next/image'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  image: {
    position: 'relative',
    margin: '0px',
    marginTop: '20px',
  },
}))

interface MobileMenuProps {
  highlightImage: string
  isOpen: boolean
  setProductsMenuOpen: Function
  setBrandsMenuOpen: Function
  className?: string
}

const MobileMenu = (props: MobileMenuProps) => {
  const { highlightImage, isOpen, setProductsMenuOpen, setBrandsMenuOpen, className, ...rest } = props
  const classes = useStyles()

  if (!isOpen) {
    return <React.Fragment />
  }

  return (
    <Container className={clsx(className, classes.root)} maxWidth={false}>
      <div className={classes.root}>
        <Button onClick={() => setBrandsMenuOpen()}>
          <Typography variant='h4'>
            MARCAS <ArrowRightIcon />{' '}
          </Typography>{' '}
        </Button>
        <Button onClick={() => setProductsMenuOpen()}>
          <Typography variant='h4'>
            PRODUTOS <ArrowRightIcon />{' '}
          </Typography>{' '}
        </Button>
        <Button onClick={() => {}}>
          <Typography variant='h4'>
            CUSTOMIZAÇÃO <ArrowRightIcon />{' '}
          </Typography>{' '}
        </Button>
      </div>
      <div className={classes.image}>
        <Image src={highlightImage} width={1299.5} height={1093.7} layout='intrinsic' alt="Highlight Image" />
      </div>
    </Container>
  )
}

export default MobileMenu
