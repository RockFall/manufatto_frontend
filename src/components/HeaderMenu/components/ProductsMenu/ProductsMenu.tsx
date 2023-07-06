import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { Container, Typography, List, Hidden, Button } from '@material-ui/core'
import { NavigationListItem } from './components'
import Image from 'next/image'
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
  list: {
    zIndex: 4,
  },
  brands: {
    zIndex: 4,
  },
  brandsFont: {
    fontFamily: "Suisse Int\\'l",
    fontWeight: 600,
    margin: '19px 0px',
    textAlign: 'start'
  },
  brandName: {
    display: 'flex',
    flexDirection: 'row',
    fontFamily: "Suisse Int\\'l",
    fontWeight: 600,
    margin: '8px 0px',
  },
  image: {
    zIndex: 3,
    display: 'flex',
    flexDirection: 'column',
  },
}))

interface HighlightBrand {
  name: string
  url: string
  src: string
}

interface NavigationListProp {
  depth?: number
  pages: Array<any>
}

interface ProductsMenuProps {
  highlight: HighlightBrand
  className?: string
  pages: Array<any>
  isOpen: boolean
  closeMenuMobile: Function
}

const NavigationList = (props: NavigationListProp) => {
  const { pages, ...rest } = props

  return <List>{pages.reduce((items, page) => reduceChildRoutes({ items, page, ...rest }), [])}</List>
}

const reduceChildRoutes = (props: any) => {
  const { items, page, depth } = props

  if (page.children) {
    items.push(
      <NavigationListItem depth={depth} key={page.title} open={false} title={page.title}>
        <NavigationList depth={depth + 1} pages={page.children} />
      </NavigationListItem>,
    )
  } else {
    items.push(<NavigationListItem open={false} depth={depth} href={page.href} key={page.title} title={page.title} />)
  }

  return items
}

const ProductsMenu = (props: ProductsMenuProps) => {
  const { closeMenuMobile, highlight, pages, isOpen, className, ...rest } = props
  const classes = useStyles()

  if (!isOpen) {
    return <React.Fragment />
  }

  return (
    <Container className={clsx(className, classes.root)} maxWidth={false}>
      <Hidden mdDown>
        <div className={classes.list}>
          <NavigationList depth={0} pages={pages} />
        </div>
        <Image src='/BG01.png' layout='fill' />
        <div className={classes.image}>
          <Image src={highlight.src} width={'884px'} height={'741px'} layout='intrinsic' />
          <div className={classes.brandName}>
            {' '}
            <Typography>Nome da Marca - {highlight.name}</Typography>{' '}
          </div>
        </div>
      </Hidden>

      <Hidden lgUp>
        <div className={classes.rootMobileDirection}>
          <BackToMenuMobile title='Produtos' backToMenu={closeMenuMobile} />
          <div className={classes.list}>
            <NavigationList depth={0} pages={pages} />
          </div>
        </div>
      </Hidden>
    </Container>
  )
}

export default ProductsMenu
