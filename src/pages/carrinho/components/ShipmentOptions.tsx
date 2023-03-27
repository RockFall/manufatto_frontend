import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, TextField, Button, Link, FormControl, Select, InputLabel } from '@material-ui/core'
import { addCartItem } from '../../../actions'
import { ProductMaterial, ProductOccasion, ProductSize } from '../../../generated/graphql'

const useStyles = makeStyles(theme => ({
  root:{
    width:'100%',
    display: 'flex',
    flexDirection: 'row',
    margin: '28px 0px',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
    }
  },
  inputField: {
    width: theme.spacing(25),
    height: theme.spacing(6),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
  }
  },
  fieldTitle: {
    fontWeight: 600,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    color: '#000000',
    fontSize: theme.spacing(1.5),
  },
  okButton: {
    marginLeft: theme.spacing(1),
    width: theme.spacing(7.5),
    height: theme.spacing(7),
  },
  cepColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  cepRow: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
  },
  cepLink: {
    marginTop: theme.spacing(1),
    textDecorationLine: 'underline',
    color: '#6F6C6B',
    fontSize: theme.spacing(2),
  },
  shipmentSelectField: {
    marginTop: theme.spacing(1),
    width: theme.spacing(50),
    height: theme.spacing(7),
    [theme.breakpoints.down('md')]: {
      width: theme.spacing(22),
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    }
  },
  shipmentOptionContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(6),
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      marginTop: theme.spacing(5),
      width: '100%',
  }
  }
}))


interface FormState {
    isValid: boolean,
    errors: {
      cep: any
    },
    touched: {
      cep: any
    }
  }
interface ShipmentResult {
    price: string,
    deadline: number
}

interface ShipmentOptionsProp {
    onSubmit?: (user: any) => any
}

const schema = {
    cep: {
      presence: { allowEmpty: false, message: () => 'Este campo é obrigatório' },
      length: { minimum: 4, message: () => 'Este campo deve ter no mínimo 4 caracteres' }
    }
  }

const shipmentResultList:ShipmentResult[] = [
    {price: '10,00', deadline: 10} as ShipmentResult,
    {price: '5,00', deadline: 5} as ShipmentResult,
    {price: '3,00', deadline: 3} as ShipmentResult,
    {price: '6,00', deadline: 6} as ShipmentResult,
    {price: '7,00', deadline: 7} as ShipmentResult,
]

const ShipmentOptions = (props: ShipmentOptionsProp) => {
  const { onSubmit, ...rest } = props
  const classes = useStyles()
  InputLabel
  const [shipmentPrice, setShipmentPrice] = useState<string>("")
  const [cep, setCep] = useState<string>('')
  const [formState, setFormState] = useState<FormState>({
    isValid: false,
    errors: {
      cep: null,
    },
    touched: {
      cep: false,
    }
  })
  const preventDefault = (event) => event.preventDefault();

  const hasError = () => {
    return Boolean(formState.errors.cep && formState.touched.cep)
  }

  const handleFieldChange = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>, value: string) => {    
    event.persist && event.persist()
    setCep(value)

    setFormState(formState => ({
      ...formState,
      touched: {
        ...formState.touched,
        cep: true
      }
    }))
  }

  const handleSubmit = () => {
    if (!formState.isValid) {
      return setFormState(formState => ({
        ...formState,
        touched: {
          cep: true,
        }
      }))
    }      
    return onSubmit(cep)
  }

  return (
    <div className={classes.root}>
        <div className={classes.cepColumn}>
            <Typography className={classes.fieldTitle}>Calcular frete e prazo</Typography>
            <div className={classes.cepRow}>
                <TextField className={classes.inputField}
                    error={hasError()}
                    helperText={hasError() ? formState.errors.cep[0] : null}
                    onChange={event => handleFieldChange(event, event.target.value)}
                    value={cep}
                    variant="outlined"
                    label='Seu CEP'
                />
                <Button className={classes.okButton} onClick={onSubmit} variant='contained'>ok</Button>
            </div>
            <Link href='#' onClick={preventDefault} className={classes.cepLink}>Não sei meu CEP</Link>
        </div>

        <div className={classes.shipmentOptionContainer}>
            <Typography className={classes.fieldTitle}>Selecione o envio</Typography>
            <Select
                native
                placeholder="Selecione um frete"
                variant='outlined'
                className={classes.shipmentSelectField}
                value={shipmentPrice}
                onChange={(e) => {setShipmentPrice(e.target.value as string)}}
                label="Frete"
                inputProps={{
                  name: 'Frete',
                  id: 'frete',
                }}
            >
                <option value=""></option>
                {shipmentResultList.map((({deadline, price}, i)=> <option key={i} value={price}>Até {deadline} dias úteis para entrega - R${price}</option>))}
            </Select>
        </div>
        
    </div>
  )
}

export default ShipmentOptions
