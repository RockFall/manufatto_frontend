import React, {useState, useEffect} from 'react'
import clsx from 'clsx'
import { makeStyles } from '@mui/styles'
import {
  TextField, Typography, Button, FormControlLabel, Checkbox, InputAdornment, IconButton, OutlinedInput, InputLabel, FormControl, FormHelperText
} from '@mui/material'
import {TelephoneMask} from './components'
import validate from 'validate.js'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: theme.spacing(55),
  },
  inputField: {
    marginBottom: theme.spacing(3),
  },
  fieldTitle: {
    marginBottom: theme.spacing(1),
  },
  title: {
    marginBottom: theme.spacing(9),
    fontWeight: 600,
  },
  checkBox: {
    marginBottom: theme.spacing(4.5),
    alignItems: 'start',
  },
  checkBoxText: {   
    fontSize: '12px',
    lineHeight: '18px',
  },
  textForm: {
    marginLeft: theme.spacing(1),
  }
}))

const phoneRegex = /^\(?[0-9]{2}\)? ?9?[0-9]{3}-?\d-?[0-9]{4} ?$/

const schema = {
  name: {
    presence: { allowEmpty: false, message: () => 'Este campo é obrigatório' },
    length: { minimum: 4, message: () => 'Este campo deve ter no mínimo 4 caracteres' }
  },
  email: {
    presence: { allowEmpty: false, message: () => 'Este campo é obrigatório' },
    email: { message: () => 'Insira um email válido' }
  },
  telephone: {
    presence: { allowEmpty: false, message: () => 'Este campo é obrigatório' },
    format: { pattern: phoneRegex, message: () => 'telefone inválido' }
  },
  message: {
    presence: { allowEmpty: false, message: () => 'Este campo é obrigatório' },
    length: { minimum: 4, message: () => 'Este campo deve ter no mínimo 4 caracteres' }
  }
}

interface ContactUsFormProp {
  onSubmit: (user: any) => any
  className?: string
}
interface FormState {
  isValid: boolean,
  errors: {
    name: any
    email: any
    telephone: any 
    message: any
  },
  touched: {
    name: any
    email: any
    telephone: any 
    message: any
  }
}

interface ContactUsFormParams {
  name: string
  email: string
  telephone: string 
  message: string
}

const ContactUsForm = (props: ContactUsFormProp) => {
  const { className, onSubmit, ...rest } = props
  const classes = useStyles()

  const initialUser = {
    name: '',
    email: '',
    message: '',
    telephone: '',
  }

  const [user, setUser] = useState<ContactUsFormParams>({ ...initialUser })
  const [formState, setFormState] = useState<FormState>({
    isValid: false,
    errors: {
      name: null,
      email: null,
      message: null,
      telephone: null
    },
    touched: {
      name: false,
      email: false,
      message: false,
      telephone: false
    }
  })
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false)

  useEffect(() => {
    const errors = validate(user, schema, { fullMessages: false })

    setFormState(formState => ({
      ...formState,
      isValid: !errors,
      errors: errors || {}
    }))
  }, [user])

  const hasError = (field: string) => {
    return Boolean(formState.errors[field] && formState.touched[field])
  }

  const handleSubmit = () => {
    if (!formState.isValid) {
      return setFormState(formState => ({
        ...formState,
        touched: {
          name: true,
          email: true,
          message: true,
          telephone: true
        }
      }))
    }      
    return onSubmit(user)
  }

  const handleFieldChange = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>, field: string, value: string) => {
    event.persist && event.persist()
    setUser(values => ({
      ...values,
      [field]: value
    }))

    setFormState(formState => ({
      ...formState,
      touched: {
        ...formState.touched,
        [field]: true
      }
    }))
  }

  return (
    <form noValidate autoComplete="off" className={clsx(classes.root,className)} {...rest}>
      <Typography className={classes.title} variant='h6'>Envie sua mensagem</Typography>
      <Typography className={classes.fieldTitle}>Seu nome</Typography>
      <TextField className={classes.inputField} 
        error={hasError('name')}
        helperText={hasError('name') ? formState.errors.name[0] : null}
        onChange={event => handleFieldChange(event, 'name', event.target.value)}
        value={user.name}
        variant="outlined"
        label='Nome'
      />
      <Typography className={classes.fieldTitle}>Email</Typography>
      <TextField className={classes.inputField}
        error={hasError('email')}
        helperText={hasError('email') ? formState.errors.email[0] : null}
        onChange={event => handleFieldChange(event, 'email', event.target.value)}
        value={user.email}
        variant="outlined"
        label='Seu email'
        />
      <Typography className={classes.fieldTitle}>Telefone</Typography>
      <TextField className={classes.inputField}
        error={hasError('telephone')}
        helperText={hasError('telephone') ? formState.errors.telephone[0] : null}
        onChange={event => handleFieldChange(event, 'telephone', event.target.value)}
        value={user.telephone}
        InputProps={{ inputComponent: TelephoneMask }}
        variant="outlined"
        label='Seu telefone'
        
        />
      <Typography className={classes.fieldTitle}>Mensagem</Typography>
      <TextField className={classes.inputField}
        error={hasError('message')}
        helperText={hasError('message') ? formState.errors.message[0] : null}
        onChange={event => handleFieldChange(event, 'message', event.target.value)}
        value={user.message}
        variant="outlined"
        label='Sua mensagem'
        multiline
        rows={8}
        />
      <FormControlLabel
        className={classes.checkBox}
        label={<Typography className={classes.checkBoxText}>{'Você aceita e concorda com nossos Termos & Condições, Política de Privacidade e Cookies, e Política de coleta de dados pessoais.'}</Typography>}
        control={<Checkbox checked={acceptTerms} onChange={(e) => setAcceptTerms(!acceptTerms)} name={'accept'} />}
      />
      
      <Button variant='contained' onClick={handleSubmit} disabled={!acceptTerms}>Enviar</Button>
    </form>
  )
}

export default ContactUsForm
