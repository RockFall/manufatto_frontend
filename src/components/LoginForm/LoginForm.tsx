import React, {useState, useEffect} from 'react'
import clsx from 'clsx'
import { makeStyles } from '@mui/styles'
import {
  TextField, Typography, Button, InputAdornment, IconButton, OutlinedInput, InputLabel, FormControl, Link, FormHelperText
} from '@mui/material'

import {VisibilityOff, Visibility} from '@mui/icons-material'
import validate from 'validate.js'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    paddingLeft: 0,
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
    marginBottom: theme.spacing(4),
    fontWeight: 600,
  },
  checkBox: {
    marginBottom: theme.spacing(4.5),
    alignItems: 'start',
  },
  forgotPassword: {   
    fontSize: '12px',
    lineHeight: '18px',
    textDecorationLine: 'underline',
    marginBottom: theme.spacing(2),
  },
  textForm: {
    marginLeft: theme.spacing(1),
  }
}))

interface LoginProp {
  onSubmit: (user: any) => any
}

const schema = {
  email: {
    presence: { allowEmpty: false, message: () => 'Este campo é obrigatório' },
  },
  password: {
    presence: { allowEmpty: false, message: () => 'Este campo é obrigatório' },
  },
}

interface FormState {
  isValid: boolean,
  errors: {
    email: any
    password: any 
  },
  touched: {
    email: any
    password: any 
  }
}

interface LoginParams {
  email: string
  password: string
}

const LoginForm = (props: LoginProp) => {
  const { onSubmit, ...rest } = props
  const classes = useStyles()
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const [user, setUser] = useState<LoginParams>({
    email: '',
    password: '',
  })
  const [formState, setFormState] = useState<FormState>({
    isValid: false,
    errors: {
      email: null,
      password: null,
    },
    touched: {
      email: false,
      password: false,
    }
  })

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
          password: true,
          confirmPassword: true,
          postal: true
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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const preventDefault = (event) => event.preventDefault();

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant='h6'>Já sou cliente</Typography>
      
      <Typography className={classes.fieldTitle}>Email</Typography>
      <TextField className={classes.inputField}
        error={hasError('email')}
        helperText={hasError('email') ? formState.errors.email[0] : null}
        onChange={event => handleFieldChange(event, 'email', event.target.value)}
        value={user.email}
        variant="outlined"
        label='Seu email'
        />
      <Typography className={classes.fieldTitle}>Senha</Typography>
      <FormControl variant="outlined" className={classes.inputField}>
        <InputLabel className={classes.textForm} htmlFor="outlined-adornment-password">Senha</InputLabel>
        <OutlinedInput 
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={preventDefault}
                edge="end"
                size="large">
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          //labelWidth={65} FIXME
          error={hasError('password')}
          onChange={event => handleFieldChange(event, 'password', event.target.value)}
          value={user.password}
        />
        {hasError('password') && <FormHelperText> {formState.errors.password[0]} </FormHelperText>}
      </FormControl>
      <Link href="#" onClick={preventDefault}><Typography className={classes.forgotPassword}>Esqueceu a sua senha?</Typography></Link>
      
      
      <Button variant='contained' onClick={handleSubmit}>Entrar</Button>
    </div>
  );
}

export default LoginForm
