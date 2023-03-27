import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { Container, Typography, Hidden, Button } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { BackToMenuMobile } from '../../..'
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    background: 'inherit',
    transform: 'scale(1)',
    position: 'absolute',
    minHeight: '100%',
    top: '90px',
    overflowY: 'auto',
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '90px 120px',
    [theme.breakpoints.down('md')]: {
      padding: '30px 32px',
    },
  },
  rootMobileDirection: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  brands: {
    zIndex: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  brandsFont: {
    fontFamily: "Suisse Int\\'l",
    fontWeight: 600,
    margin: '19px 0px',
    cursor: 'pointer',
    textAlign: 'start'
  },
  brandName: {
    display: 'flex',
    flexDirection: 'row',
    fontFamily: "Suisse Int\\'l",
    fontWeight: 600,
    margin: '8px 0px',
  },
  allLink: {
    fontFamily: "Suisse Int\\'l",
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '24px',
    cursor: 'pointer',

    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    color: '#BFBBBA',
  },
  image: {
    zIndex: 3,
    display: 'flex',
    flexDirection: 'column',
  },
  cursor: {
    cursor: 'pointer',
  },
  brandButton: {
    height: theme.spacing(6),
    margin: theme.spacing(1.5)
  }
}))

interface BrandsItem {
  name: string
  url: string
}

interface HighlightBrand {
  name: string
  url: string
  src: string
}
interface BrandsMenuProps {
  highlight: HighlightBrand
  isOpen: boolean
  brands: BrandsItem[]
  className?: string
  closeMenuMobile: Function
  setBrandsMenuOpen: Function
}

const BrandsMenu = (props: BrandsMenuProps) => {
  const { setBrandsMenuOpen, closeMenuMobile, highlight, brands, isOpen, className, ...rest } = props
  const classes = useStyles()
  const router = useRouter()
  const brandName = ' Moda Fitness'
  if (!isOpen) {
    return <React.Fragment />
  }

  return (
    <Container className={clsx(className, classes.root)} maxWidth={false}>
      <Hidden lgUp>
        <div className={classes.rootMobileDirection}>
          <BackToMenuMobile title='Marcas' backToMenu={closeMenuMobile} />
          <div className={classes.brands}>
            {brands.map(brand => (
              <Button onClick={() => {setBrandsMenuOpen(); router.push(brand.url)}} className={classes.brandButton}>
                  <Typography className={classes.brandsFont} variant='h3'>
                    {brand.name}
                  </Typography>
              </Button>
            ))}
            <Button onClick={() => {setBrandsMenuOpen(); router.push('/marcas')}} className={classes.brandButton}>
                <Typography className={classes.allLink} variant='button'>
                  Ver Todas <ArrowForwardIosIcon fontSize='inherit' />
                </Typography>
            </Button>
          </div>
        </div>
      </Hidden>

      <Hidden mdDown>
        <div className={classes.brands}>
          {brands.map(brand => (
            <Button onClick={() => {setBrandsMenuOpen(); router.push(brand.url)}} className={classes.brandButton}>
              <Link href={brand.url}>
                <Typography className={classes.brandsFont} variant='h3'>
                  {brand.name}
                </Typography>
              </Link>
            </Button>
          ))}
          <Button onClick={() => {setBrandsMenuOpen(); router.push('/marcas')}} className={classes.brandButton}>
              <Typography className={classes.allLink} variant='button'>
                Ver Todas <ArrowForwardIosIcon fontSize='inherit' />
              </Typography>
          </Button>
        </div>
        <Image src='/BG01.png' layout='fill' />
        <div className={classes.image}>
          <Link href={highlight.url}>
            <Image src={highlight.src} width={'884px'} height={'741px'} layout='intrinsic' className={classes.cursor} />
          </Link>
          <div className={classes.brandName}>
            <Typography>Nome da Marca - {highlight.name}</Typography>
          </div>
        </div>
      </Hidden>
    </Container>
  )
}

export default BrandsMenu
