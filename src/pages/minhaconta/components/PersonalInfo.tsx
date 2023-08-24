import React, {useState} from 'react'
import clsx from 'clsx'
import { makeStyles } from '@mui/styles'
import { Typography, TextField, Button, Link, FormControl, Select, InputLabel } from '@mui/material'
import { addItemToCart } from '../../../slices/cartSlice'
//import { ProductMaterial, ProductOccasion, ProductSize } from '../../../generated/graphql'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Height } from '@mui/icons-material'

const useStyles = makeStyles(theme => ({
  root:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    }
  },
  infoTitle: {
    color: '#212121',
    fontWeight: 600,
    fontSize: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  infoText: {
    fontSize: theme.spacing(2),
    color: '#999999',
    fontWeight: 400,
  },
  ButtonText: {
    fontSize: theme.spacing(1.5),
    color: '#000000',
    textTransform: 'capitalize',
    padding: 0,
    marginTop: theme.spacing(1),
  },
  infoColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-between',
    marginRight: theme.spacing(12),
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  infoItemNew: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
  },
  editButton: {
      justifyContent: "flex-start", 
      paddingLeft: 0, 
      width: 'fit-content'
    }
}))

interface UserParams {
    name: string
    email: string
    password: string
    phone: string
    cpf: string
    address: {
      state: string
      street: string
      number: string
      complement: string
      neighborhood: string
      city: string
      postal: string
    }
  }


interface UserHeaderProp {
    className?: string
    user: UserParams
}

const UserHeader = (props: UserHeaderProp) => {
  const { className, user, ...rest } = props
  const classes = useStyles()
  

  return (
    <div className={clsx(classes.root, className)} {... rest} >
        <div className={classes.infoColumn}>
            <div className={classes.infoItem}>
                <Typography className={classes.infoTitle}>Dados pessoais</Typography>
                <Typography className={classes.infoText}>{user.name}</Typography>
                <Typography className={classes.infoText}>CPF {user.cpf}</Typography>
                <Button className={classes.editButton} onClick={()=>{}}><Typography className={classes.ButtonText} >Editar</Typography></Button>
            </div>

            <div className={classes.infoItem}>
                <Typography className={classes.infoTitle}>Endereço de cobrança</Typography>
                <Typography className={classes.infoText}>{user.address.street}, {user.address.number} - {user.address.complement}</Typography>
                <Typography className={classes.infoText}>{user.address.neighborhood} - {user.address.city} - {user.address.state}</Typography>
                <Typography className={classes.infoText}>{user.address.postal}</Typography>
                <Typography className={classes.infoText}>{user.phone}</Typography>
                <Button className={classes.editButton} onClick={()=>{}}><Typography className={classes.ButtonText} >Editar</Typography></Button>
            </div>
        </div>
        
        <div className={classes.infoColumn}>
            <div className={classes.infoItem}>
                <Typography className={classes.infoTitle}>Email</Typography>
                <Typography className={classes.infoText}>{user.email}</Typography>
                <Button className={classes.editButton} onClick={()=>{}}><Typography className={classes.ButtonText} >Editar</Typography></Button>
            </div>

            <div className={classes.infoItemNew}>
                <Typography className={classes.infoTitle}>Endereço de entrega</Typography>
                <Typography className={classes.infoText}>{user.address.street}, {user.address.number} - {user.address.complement}</Typography>
                <Typography className={classes.infoText}>{user.address.neighborhood} - {user.address.city} - {user.address.state}</Typography>
                <Typography className={classes.infoText}>{user.address.postal}</Typography>
                <Typography className={classes.infoText}>{user.phone}</Typography>
                <Button className={classes.editButton} onClick={()=>{}}><Typography className={classes.ButtonText} >Editar</Typography></Button>
            </div>
        </div>

        <div className={classes.infoColumn}>
            <div className={classes.infoItem}>
                <Typography className={classes.infoTitle}>Senha</Typography>
                <Typography className={classes.infoText}>**********</Typography>
                <Button className={classes.editButton} onClick={()=>{}}><Typography className={classes.ButtonText} >Mudar</Typography></Button>
            </div>

            <div className={classes.infoItemNew}>
                <Typography className={classes.infoTitle}>Cartão de crédito</Typography>
                <Typography className={classes.infoText}>****.****.2388</Typography>
                <Button className={classes.editButton} onClick={()=>{}}><Typography className={classes.ButtonText} >Editar</Typography></Button>
            </div>
        </div>
    </div>
  )
}

export default UserHeader
