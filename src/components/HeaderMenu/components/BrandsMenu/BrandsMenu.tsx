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
    textAlign: 'start',
    textTransform: 'none',
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
    color: '#828282',
  },
  image: {
    zIndex: 3,
    display: 'flex',
    flexDirection: 'column',
  },
  mouseCursor: {
    cursor: 'pointer',
  },
  brandButton: {
    height: theme.spacing(6),
    margin: theme.spacing(1.5)
  },
  brandButtonMobile: {
    height: theme.spacing(6),
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
    marginLeft: 0,
    marginRight: theme.spacing(1.5),
  },
  desktopBrandFontSize: {
    fontSize: '2.5vw',
  },
  mobileBrandFontSize: {
    fontSize: '2.5rem',
  }
}))

interface BrandsItem {
  name: string
  url: string
}

interface HighlightBrand {
  brand: string
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
  onClickCloseMenuCompletely: Function
}

const BrandsMenu = (props: BrandsMenuProps) => {
  const { setBrandsMenuOpen, closeMenuMobile, onClickCloseMenuCompletely, highlight, brands, isOpen, className, ...rest } = props
  const classes = useStyles()
  const router = useRouter()

  if (!isOpen) {
    return <React.Fragment />
  }

  return (
    <Container className={clsx(className, classes.root)} maxWidth={false}>
      <Hidden lgUp>
        <div className={classes.rootMobileDirection}>
          <BackToMenuMobile title='Marcas' backToMenu={closeMenuMobile} />
          <div className={classes.brands}>
            {brands.map((brand, idx) => (
              <Button key={idx} onClick={() => {onClickCloseMenuCompletely(); router.push(brand.url)}} className={classes.brandButtonMobile} >
                  <Typography className={classes.brandsFont} variant='h3'>
                  <div className={classes.mobileBrandFontSize}>
                      {brand.name}
                    </div>
                  </Typography>
              </Button>
            ))}
            <Button onClick={() => {onClickCloseMenuCompletely(); router.push('/marcas')}} className={classes.brandButton}>
                <Typography className={classes.allLink} variant='button'>
                  Ver Todas <ArrowForwardIosIcon fontSize='inherit' />
                </Typography>
            </Button>
          </div>
        </div>
      </Hidden>

      <Hidden mdDown>
        <div className={classes.brands}>
          {brands.map((brand, idx) => (
            <Button key={idx} onClick={() => {setBrandsMenuOpen(); router.push(brand.url)}} className={classes.brandButton}>
              <Link href={brand.url}>
                <Typography className={classes.brandsFont} variant='h3'>
                  <div className={classes.desktopBrandFontSize}>
                      {brand.name}
                    </div>
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
        <Image src='/LateralOrangeBG.webp' layout='fill' />
        <div className={classes.image}>
          <Link href={highlight.url}>
            <a>
              <Image src={highlight.src} width={'884px'} height={'741px'} layout='intrinsic' className={classes.mouseCursor} />
            </a>
          </Link>
          <div className={classes.brandName}>
            <Typography><strong>{highlight.brand}</strong> - {highlight.name}</Typography>
          </div>
        </div>
      </Hidden>
    </Container>
  )
}

export default BrandsMenu
