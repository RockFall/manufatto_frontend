import React, {useState, useEffect} from 'react'
import clsx from 'clsx'
import { makeStyles } from '@mui/styles'
import {
  TextField, Typography, Button, FormControlLabel, Checkbox, InputAdornment, IconButton, OutlinedInput, InputLabel, FormControl, FormHelperText, Select, MenuItem
} from '@mui/material'
import validate from 'validate.js'
import {VisibilityOff, Visibility, TrendingUpTwoTone} from '@mui/icons-material'

import {CepMask, CpfMask, TelephoneMask} from '../../components'

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
    marginBottom: theme.spacing(5),
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
  },
  step: {
    display: 'flex',
    height: theme.spacing(5),
    width: theme.spacing(5),
    color: '#ffffff',
    backgroundColor: '#000000',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleRow: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
    },
  },
  stepText: {
    fontWeight: 600,
    fontSize: theme.spacing(2.5),
    marginLeft: theme.spacing(2),
  },
  stepNumber: {
    fontWeight: 600,
    fontSize: theme.spacing(2.5),
  },
}))

const schema = {
  name: {
    presence: { allowEmpty: false, message: () => 'Este campo é obrigatório' },
    length: { minimum: 4, message: () => 'Este campo deve ter no mínimo 4 caracteres' }
  },
  email: {
    presence: { allowEmpty: false, message: () => 'Este campo é obrigatório' },
    email: { message: () => 'Insira um email válido' }
  },
  password: {
    presence: { allowEmpty: false, message: () => 'Este campo é obrigatório' },
    length: { minimum: 8, message: () => 'Este campo deve ter no mínimo 8 caracteres' }
  },
  password_confirmation: {
    presence: { allowEmpty: false, message: () => 'Este campo é obrigatório' },
    equality: { attribute: 'password', message: 'As senhas não são iguais!', comparator: (v1, v2) => (v1 === v2) }
  },
}
const ufList = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']
interface RegisterProp {
  onSubmit: (user: any) => any
  className?: string
  errorMessage?: string
}
interface FormState {
  isValid: boolean,
  isLoading: boolean,
  errors: {
    name: any
    email: any
    password: any 
    password_confirmation: any
  },
  touched: {
    name: any
    email: any
    password: any 
    password_confirmation: any,
  }
}

interface RegisterParams {
  name: string
  email: string
  password: string
  password_confirmation: string
}

interface Values {
  showPassword: boolean,
  showConfirmPassword: boolean,
  acceptTerms: boolean,
}

const RegisterForm = (props: RegisterProp) => {
  const { errorMessage, className, onSubmit, ...rest } = props
  const classes = useStyles()

  const initialUser = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  }

  const [user, setUser] = useState<RegisterParams>({ ...initialUser })
  const [formState, setFormState] = useState<FormState>({
    isValid: false,
    isLoading: false,
    errors: {
      name: null,
      email: null,
      password: null,
      password_confirmation: null,
    },
    touched: {
      name: false,
      email: false,
      password: false,
      password_confirmation: false,
    }
  })
  const [values, setValues] = useState<Values>({
    showPassword: false,
    showConfirmPassword: false,
    acceptTerms: false,
  })

  useEffect(() => {
    const errors = validate(user, schema, { fullMessages: false })
    const address = !!errors ? {
      city: errors["address.city"] || null,
      postal: errors["address.postal"] || null,
      state: errors["address.state"] || null,
      neighborhood: errors["address.neighborhood"] || null,
      number: errors["address.number"] || null,
      complement: errors["address.complement"] || null,
      street: errors["address.street"] || null,
    } : {}
    

    setFormState(formState => ({
      ...formState,
      isValid: !errors,
      errors: {
        ...(errors || {}),
        address: {
          ...(address || {})
        },
      }
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
          phone: true,
          password: true,
          password_confirmation: true,
          cpf: true,
          address: {
            state: true,
            street: true,
            number: true,
            complement: true,
            neighborhood: true,
            city: true,
            postal: true,
          }
        }
      }))
    }      
    return onSubmit({...user})
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
    setValues({ ...values, showPassword: !values.showPassword });
  }
  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  }

  return (
    <form noValidate autoComplete="off" className={clsx(classes.root,className)} {...rest}>
      
      <div className={classes.titleRow}>
        <div className={classes.step}> 
          <Typography className={classes.stepNumber}>01</Typography>
        </div> 
        <Typography className={classes.stepText}>Dados pessoais</Typography> 
      </div>
      <Typography className={classes.fieldTitle}>Seu nome</Typography>
      <TextField className={classes.inputField} 
        error={hasError('name')}
        helperText={hasError('name') ? formState.errors.name[0] : null}
        onChange={event => handleFieldChange(event, 'name', event.target.value)}
        value={user.name}
        variant="outlined"
        placeholder='Nome'
      />    
      
      <Typography className={classes.fieldTitle}>Email</Typography>
      <TextField className={classes.inputField}
        error={hasError('email')}
        helperText={hasError('email') ? formState.errors.email[0] : null}
        onChange={event => handleFieldChange(event, 'email', event.target.value)}
        value={user.email}
        variant="outlined"
        placeholder='Seu email'
        />
      <Typography className={classes.fieldTitle}>Senha</Typography>
      <FormControl variant="outlined" className={classes.inputField}>
        <OutlinedInput 
          id="outlined-adornment-register-password"
          placeholder='Senha'
          type={values.showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                size="large">
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          //labelWidth={65}  // FIX ME
          error={hasError('password')}
          onChange={event => handleFieldChange(event, 'password', event.target.value)}
          value={user.password}
        />
        {hasError('password') && <FormHelperText> {formState.errors.password[0]} </FormHelperText>}
      </FormControl>
      <Typography className={classes.fieldTitle}>Confirmar senha</Typography>
      <FormControl variant="outlined" className={classes.inputField}>
        <OutlinedInput 
          id="outlined-adornment-confirmpassword"
          type={values.showPassword ? 'text' : 'password'}
          placeholder='Confirmar senha'
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowConfirmPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                size="large">
                {values.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          //labelWidth={140}  // FIX ME
          error={hasError('password_confirmation')}
          onChange={event => handleFieldChange(event, 'password_confirmation', event.target.value)}
          value={user.password_confirmation}
        />
        {hasError('password_confirmation') && <FormHelperText> {formState.errors.password_confirmation[0]} </FormHelperText>}
      </FormControl>
      <FormControlLabel
        className={classes.checkBox}
        label={<Typography className={classes.checkBoxText}>{'Você aceita e concorda com nossos Termos & Condições, Política de Privacidade e Cookies, e Política de coleta de dados pessoais.'}</Typography>}
        control={<Checkbox checked={values.acceptTerms} onChange={(e) => setValues({...values, acceptTerms: !values.acceptTerms})} name={'accept'} />}
      />
      <Button variant='contained' onClick={handleSubmit} disabled={!values.acceptTerms}>Cadastrar</Button>
      {!!errorMessage && <FormHelperText> {errorMessage} </FormHelperText>}
    </form>
  );
}

export default RegisterForm
