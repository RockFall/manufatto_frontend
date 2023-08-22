import React from 'react'
import { makeStyles } from '@mui/styles'
import { TopBar, BottomBar } from '../../components'
import { withRouter } from 'next/router'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  topBar: {
    zIndex: 2,
    position: 'relative',
    background: '#fff',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
    overflow: 'hidden',
  },
}))

const specialPages = ['marcas', 'marca']

const isSpecialPage = (pathname) => {
  if(pathname == '/' || pathname == '/sobre') {return true}
  else if (pathname.includes('marcas')) return true
  else if (pathname.includes('marca')) return true
  return false
}

const ShopLayout = (props: any) => {
  const { children } = props
  const pathName = children?._owner?.memoizedProps?.router?.pathname || '/';
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <TopBar className={classes.topBar} specialBackground={isSpecialPage(pathName)} />
      <div className={classes.container}>{children}</div>
      
      <BottomBar />
    </div>
  )
}

export default ShopLayout
