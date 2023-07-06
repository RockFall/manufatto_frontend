import React, {useState, useEffect} from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import {
  TextField, Typography, Button, FormControlLabel, Checkbox, InputLabel, FormControl, FormHelperText, Select, MenuItem, Link
} from '@material-ui/core'
import validate from 'validate.js'

import {CepMask, CpfMask, TelephoneMask} from '../../../components'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    width: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
      justifyContent: 'center',
    },
  },
  inputField: {
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
    alignItems: 'center',
  },
  checkBoxText: {   
    fontSize: '12px',
    lineHeight: '18px',
  },
  textForm: {
    marginLeft: theme.spacing(1),
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  findButton: {
      marginTop: theme.spacing(1),
      width: '100%'
  },
  addressGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
    },
  },
  inputDiv: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
    },
  },
  addressInputDiv: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(3.5),
    
  },
  optionalText: {
    fontSize: theme.spacing(1.5),
    marginLeft: theme.spacing(0.5),
  },
  complementText: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: theme.spacing(1),
    alignItems: 'flex-end',
  },
  forgotCep: {
    textDecorationLine: 'underline',
    color: '#6F6C6B',
  },
  stateDiv: {
    width: '48.5%',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
  }
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
  cpf: {
    format: { pattern: /^([\d]{3})\.*([\d]{3}).*([\d]{3})-*([\d]{2})$/, message: () => 'CPF inválido' },
    presence: { allowEmpty: false, message: () => 'Este campo é obrigatório' }
  },
  "address.postal": {
    format: { pattern: /^([\d]{2})\.*([\d]{3})-*([\d]{3})$/, message: () => 'CEP inválido' },
    presence: { allowEmpty: false, message: () => 'Este campo é obrigatório' },
  },
  "address.state": {
    presence: { allowEmpty: false, message: () => 'Este campo é obrigatório' },
    length: { maximum: 2, message: () => 'Este campo deve ter no máximo 2 caracteres' }
  },
  "address.city": {
    presence: { allowEmpty: false, message: () => 'Este campo é obrigatório' },
    length: { maximum: 200, message: () => 'Este campo deve ter no máximo 200 caracteres' }
  },
  "address.neighborhood": {
    presence: { allowEmpty: false, message: () => 'Este campo é obrigatório' },
    length: { maximum: 200, message: () => 'Este campo deve ter no máximo 200 caracteres' }
  },
  "address.number": {
    presence: { allowEmpty: false, message: () => 'Este campo é obrigatório' },
    numericality: {
      onlyInteger: true,
      greaterThan: -1,
      message: () => 'Este campo deve ser um número positivo'
    }
  },
  "address.street": {
    presence: { allowEmpty: false, message: () => 'Este campo é obrigatório' },
    length: { maximum: 200, message: () => 'Este campo deve ter no máximo 200 caracteres' }
  },
  "address.complement": {
    presence: { allowEmpty: true, message: () => 'Este campo é obrigatório' },
    length: { maximum: 200, message: () => 'Este campo deve ter no máximo 200 caracteres' }
  },
}
const ufList = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']
interface CheckoutFormProp {
  onSubmit: (user: any) => any
  className?: string
  errorMessage?: string
  showAddress: boolean,
  setShowAddress: (showAdress: any) => any
}
interface FormState {
  isValid: boolean,
  isLoading: boolean,
  errors: {
    name: any
    surname: any
    phone: any
    cpf: any
    address: {
        state: any
        street: any
        number: any
        complement: any
        neighborhood: any
        city: any
        postal: any
    }
  },
  touched: {
    name: any
    surname: any
    phone: any
    cpf: any
    address: {
        state: any
        street: any
        number: any
        complement: any
        neighborhood: any
        city: any
        postal: any
    }
  }
}

interface CheckoutFormParams {
  name: string
  surname: string
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

interface Values {
  acceptTerms: boolean,
}

const CheckoutFormForm = (props: CheckoutFormProp) => {
  const { setShowAddress, showAddress, errorMessage, className, onSubmit, ...rest } = props
  const classes = useStyles()

  const initialUser = {
    name: '',
      surname: '',
      phone: '',
      cpf: '',
      address: {
        state: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        postal: '',
      },
  }

  const [user, setUser] = useState<CheckoutFormParams>({ ...initialUser })
  const [formState, setFormState] = useState<FormState>({
    isValid: false,
    isLoading: false,
    errors: {
      name: null,
      surname: null,
      phone: null,
      cpf: null,
      address: {
        state: null,
        street: null,
        number: null,
        complement: null,
        neighborhood: null,
        city: null,
        postal: null,
      },
    },
    touched: {
      name: false,
      surname: false,
      phone: false,
      cpf: false,
      address: {
        state: false,
        street: false,
        number: false,
        complement: false,
        neighborhood: false,
        city: false,
        postal: false,
      }
    }
  })
  const [values, setValues] = useState<Values>({
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
        ...errors || {},
        address: {
          ...address || {}
        },
      }
    }))
  }, [user])

  const hasError = (field: string) => {
    return Boolean(formState.errors[field] && formState.touched[field])
  }
  const hasAddressError = (field: string) => {
    return Boolean(formState.errors.address[field] && formState.touched.address[field])
  }

  const formatPhone = (value) => {
    if(value.length > 10){
      let newVal = [...value]
      if(newVal[9] == '-'){
        const tempVal = newVal[10]
        newVal[10] = newVal[9]
        newVal[9] = tempVal
        return newVal.join("")
      }
    }
    return value   
  }

  const handleSubmit = () => {
    if (!formState.isValid) {
      return setFormState(formState => ({
        ...formState,
        touched: {
          name: true,
          surname: true,
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
    return onSubmit({...user, phone: formatPhone(user.phone), address: {label: 'Casa', isPrimary: true, address: {...user.address, number: Number(user.address.number), postal: user.address.postal.replaceAll('-', '.')}}})
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

  const handleAddressFieldChange = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>, field: string, value: string) => {
    event.persist && event.persist()
    setUser(values => ({
      ...values,
      address: {
        ...values.address,
        [field]: value
      }
    }))

    setFormState(formState => ({
      ...formState,
      touched: {
        ...formState.touched,
        address:{
          ...formState.touched.address,
          [field]: true
        } 
      }
    }))
  }

  const cepAutofill = () => {
    const value = user.address.postal
    if (value && !hasError('postal')) {
      const postal = value?.replace(/[^0-9]/g, '')

      setFormState({
        ...formState,
        isLoading: true,
      })

      fetch(`https://viacep.com.br/ws/${postal}/json/`)
        .then((res) => res.json())
        .then((data) => {
          setShowAddress(true)        
          !data.erro &&
            setUser(User => ({
              ...User,
              address: {
                ...User.address,
                state: data.uf,
                city: data.localidade,
                neighborhood: data.bairro,
                street: data.logradouro,
              }
            }))
          !data.erro &&
            setFormState(formState => ({
              ...formState,
              touched: {
                ...formState.touched,
                address: {
                  ...formState.touched.address,
                  state: true,
                  city: true,
                  neighborhood: true,
                  street: true,
                }
              }
            }))

          setFormState({
            ...formState,
            isLoading: false,
          })
        }).catch(() => {
          setFormState({
            ...formState,
            isLoading: false,
          })
        })
    }
  }

  return (

    <form noValidate autoComplete="off" className={clsx(classes.root,className)} {...rest}>
        <div className={classes.inputGroup}>
            <div className={classes.inputDiv}>
                <Typography className={classes.fieldTitle}>Nome</Typography>
                <TextField className={classes.inputField} 
                    error={hasError('name')}
                    helperText={hasError('name') ? formState.errors.name[0] : null}
                    onChange={event => handleFieldChange(event, 'name', event.target.value)}
                    value={user.name}
                    variant="outlined"
                    placeholder='Nome'
                />
            </div>
            <div className={classes.inputDiv}>
                <Typography className={classes.fieldTitle}>Sobrenome</Typography>
                <TextField className={classes.inputField} 
                    error={hasError('surname')}
                    helperText={hasError('surname') ? formState.errors.surname[0] : null}
                    onChange={event => handleFieldChange(event, 'surname', event.target.value)}
                    value={user.surname}
                    variant="outlined"
                    placeholder='Sobrenome'
                />
            </div>
        </div>
        <div className={classes.inputGroup}>
            <div className={classes.inputDiv}>
            <Typography className={classes.fieldTitle}>CPF</Typography>
            <TextField className={classes.inputField}
                error={hasError('cpf')}
                helperText={hasError('cpf') ? formState.errors.cpf[0] : null}
                onChange={event => handleFieldChange(event, 'cpf', event.target.value)}
                value={user.cpf}
                variant="outlined"
                placeholder='000.000.000-00'
                InputProps={{ inputComponent: CpfMask }}
                />
            </div>
            <div className={classes.inputDiv}>
            <Typography className={classes.fieldTitle}>Telefone</Typography>
            <TextField className={classes.inputField}
                error={hasError('phone')}
                helperText={hasError('phone') ? formState.errors.phone[0] : null}
                onChange={event => handleFieldChange(event, 'phone', event.target.value)}
                value={user.phone}
                InputProps={{ inputComponent: TelephoneMask }}
                variant="outlined"
                placeholder='Seu telefone'
                />
            </div>
        </div>
        <div className={classes.inputGroup}>
            <div className={classes.inputDiv}>
                <Typography className={classes.fieldTitle}>CEP</Typography>
                <TextField className={classes.inputField}
                    error={hasAddressError('postal')}
                    helperText={hasAddressError('postal') ? formState.errors.address.postal[0] : null}
                    onChange={event => handleAddressFieldChange(event, 'postal', event.target.value)}
                    value={user.address.postal}
                    variant="outlined"
                    placeholder='00.000-000'
                    disabled={formState.isLoading}
                    InputProps={{ inputComponent: CepMask }}
                    />
                <Link className={classes.forgotCep}>Não sei meu CEP</Link>
            </div>
            <div className={classes.inputDiv}>
                <Button className={classes.findButton} variant='contained' onClick={cepAutofill} disabled={hasAddressError('postal') || !user.address.postal}>Encontrar Endereço</Button>
                {!!errorMessage && <FormHelperText> {errorMessage} </FormHelperText>}
            </div>
        </div>
        {
          showAddress ? (
            <React.Fragment>
              <div className={classes.inputGroup}>
                  <div className={classes.inputDiv}>
                      <Typography className={classes.fieldTitle}>Rua</Typography>
                      <TextField className={classes.inputField}
                          error={hasAddressError('street')}
                          helperText={hasAddressError('street') ? formState.errors.address.street[0] : null}
                          onChange={event => handleAddressFieldChange(event, 'street', event.target.value)}
                          value={user.address.street}
                          variant="outlined"
                          placeholder='Rua'
                          disabled={formState.isLoading}
                          />
                  </div>
                  <div className={classes.addressGroup}>
                      <div>
                          <Typography className={classes.fieldTitle}>Número</Typography>
                          <TextField className={classes.inputField}
                              error={hasAddressError('number')}
                              helperText={hasAddressError('number') ? formState.errors.address.number[0] : null}
                              onChange={event => handleAddressFieldChange(event, 'number', event.target.value)}
                              value={user.address.number}
                              variant="outlined"
                              placeholder='Nº'
                              disabled={formState.isLoading}
                              />
                      </div>
                      <div className={classes.addressInputDiv}>
                          <Typography className={classes.complementText}>Complemento  <Typography className={classes.optionalText}> (Opcional) </Typography></Typography>
                          <TextField className={classes.inputField}
                              error={hasAddressError('complement')}
                              helperText={hasAddressError('complement') ? formState.errors.address.complement[0] : null}
                              onChange={event => handleAddressFieldChange(event, 'complement', event.target.value)}
                              value={user.address.complement}
                              variant="outlined"
                              placeholder='Complemento'
                              disabled={formState.isLoading}
                              />
                      </div>
                  </div>
              </div>
              <div className={classes.inputGroup}>
                  <div className={classes.inputDiv}>
                  <Typography className={classes.fieldTitle}>Bairro</Typography>
                  <TextField className={classes.inputField}
                      error={hasAddressError('neighborhood')}
                      helperText={hasAddressError('neighborhood') ? formState.errors.address.neighborhood[0] : null}
                      onChange={event => handleAddressFieldChange(event, 'neighborhood', event.target.value)}
                      value={user.address.neighborhood}
                      variant="outlined"
                      placeholder='Bairro'
                      disabled={formState.isLoading}
                      />
                  </div>
                  <div className={classes.inputDiv}>
                  <Typography className={classes.fieldTitle}>Cidade</Typography>
                  <TextField className={classes.inputField}
                      error={hasAddressError('city')}
                      helperText={hasAddressError('city') ? formState.errors.address.city[0] : null}
                      onChange={event => handleAddressFieldChange(event, 'city', event.target.value)}
                      value={user.address.city}
                      variant="outlined"
                      placeholder='Cidade'
                      disabled={formState.isLoading}
                      />
                  </div>
              </div>
              <div className={classes.inputGroup}>
                  <div className={classes.inputDiv}>
                  <Typography className={classes.fieldTitle}>Estado</Typography>
                  <FormControl className={classes.stateDiv} error={hasAddressError('state')} variant="outlined">
                      <InputLabel> Estado </InputLabel>
                      <Select
                      placeholder="Estado"
                      value={user.address.state}
                      fullWidth
                      onChange={event => handleAddressFieldChange(event, 'state', event.target.value as string)}
                      disabled={formState.isLoading}
                      >
                      {ufList.map(item =>
                          <MenuItem value={item} key={item}>{item}</MenuItem>
                      )}
                      </Select>
                      {hasAddressError('state') && <FormHelperText> {formState.errors.address.state[0]} </FormHelperText>}
                  </FormControl>
                  <FormControlLabel
                      className={classes.checkBox}
                      label={<Typography className={classes.checkBoxText}>{'Usar como endereço de cobrança'}</Typography>}
                      control={<Checkbox checked={values.acceptTerms} onChange={(e) => setValues({...values, acceptTerms: !values.acceptTerms})} name={'accept'} />}
                      />
                  </div>
              </div>
            </React.Fragment>
          )
          : <React.Fragment />
        }
        
    </form>
  )
}

export default CheckoutFormForm
