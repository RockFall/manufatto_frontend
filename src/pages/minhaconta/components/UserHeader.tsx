import React, {useState} from 'react'
import clsx from 'clsx'
import { makeStyles } from '@mui/styles'
import { Typography, TextField, Button, Link, FormControl, Select, InputLabel } from '@mui/material'
import { addCartItem } from '../../../actions'
//import { ProductMaterial, ProductOccasion, ProductSize } from '../../../generated/graphql'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const useStyles = makeStyles(theme => ({
  root:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  nameText: {
    color: '#6F6C6B',
    fontWeight: 600,
    fontSize: theme.spacing(3),
  },
  logoutText: {
    fontSize: theme.spacing(1.5),
    color: '#999999',
    textTransform: 'capitalize',
  }
}))


interface UserHeaderProp {
    name: string
    logout: (user: any) => any
    className?: string
}


const UserHeader = (props: UserHeaderProp) => {
  const { logout, name, className, ...rest } = props
  const classes = useStyles()
  

  return (
    <div className={clsx(classes.root, className)} {... rest} >
        <Typography className={classes.nameText}>Olá {name}</Typography>
        <Button startIcon={<ExitToAppIcon/>} onClick={logout}><Typography className={classes.logoutText} >Logout</Typography></Button>
    </div>
  )
}

export default UserHeader
