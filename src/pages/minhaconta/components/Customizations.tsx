import React, {useState} from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, TextField, Button, Link, FormControl, Select, InputLabel } from '@material-ui/core'
import { addCartItem } from '../../../actions'
import { ProductMaterial, ProductOccasion, ProductSize } from '../../../generated/graphql'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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
    className?: string
}


const UserHeader = (props: UserHeaderProp) => {
  const { className, ...rest } = props
  const classes = useStyles()
  

  return (
    <div className={clsx(classes.root, className)} {... rest} >
        <Typography className={classes.nameText}>Customizações</Typography>
    </div>
  )
}

export default UserHeader
