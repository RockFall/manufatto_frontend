import React from 'react'
import { makeStyles } from '@mui/styles'
import { Typography } from '@mui/material'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '56px 0px 278px 0px',
    [theme.breakpoints.down('lg')]: {
      margin: '40px 0px 90px 0px',
    },
  },
  emoji: {
    fontSize: '40px',
  },
  notFoundResultText: {
    fontFamily: "Suisse Int\\'l",
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '24px',
    lineHeight: '32px',
    textAlign: 'center',
    marginLeft: '8px',
    color: '#000000',
  },
  notFoundSearchText: {
    fontFamily: "Suisse Int\\'l",
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '40px',
    lineHeight: '48px',
    textAlign: 'center',
    marginLeft: '8px',
    color: '#000000',
  },
  redoSearch: {
    fontFamily: "Suisse Int\\'l",
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '20px',
    lineHeight: '32px',
    textAlign: 'center',
    marginLeft: '8px',
    color: '#000000',
    marginTop: '20px',
  },
}))

interface NotFoundScreenProp {
  searchText: string
}

const NotFoundScreen = (props: NotFoundScreenProp) => {
  const { searchText, ...rest } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography className={classes.emoji}>🤔</Typography>
      <Typography className={classes.notFoundResultText}>Ops! Não encontramos nenhum resultado para</Typography>
      <Typography className={classes.notFoundSearchText}>{searchText}</Typography>
      <Typography className={classes.redoSearch}>Refaça a sua pesquisa ou navegue pelo menu para encontrar o que deseja.</Typography>
    </div>
  )
}

export default NotFoundScreen
