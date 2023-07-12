import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CropFreeIcon from '@material-ui/icons/CropFree';
import { 
  Button, 
  Divider, 
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton, 
  Link, 
  MenuItem, 
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { 
  Check,
  RemoveCircleOutline,
  AddCircleOutline,
  Clear
} from '@material-ui/icons';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { addCustomizedProduct, CustomizedProductType, CartItemType } from '../../../../../../actions'
import { CepMask } from '../../../../../../components'
//import { ProductDetail, ProductSize } from '../../../../../../generated/graphql'
import Image from 'next/image';
import validate from 'validate.js'
//import { convertCompilerOptionsFromJson } from 'typescript';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  errorText: {
    color: '#ff1744',
    fontSize: '11px',
  },
  ref: {
    fontWeight: 500,
    fontSize: '12px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#6F6C6B',
  },
  brand: {
    margin: '0',
    marginTop: theme.spacing(1),
    fontWeight: 500,
    fontSize: '19px',
    color: '#6F6C6B',
  },
  name: {
    margin: '2% 0 1.7% 0',

    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '27px',
    color: '#1D1D1F',
  },
  bio: {
    margin: '0',
    fontSize: '15px',
    textAlign: 'justify',
    color: '#999999',
  },
  label: {
    color: 'black',
    letterSpacing: '0.08em',
    fontSize: '12px',
  },
  selectFieldContainer: {
    marginTop: '7%',  
    display: 'flex', 
    flexDirection: 'column',
    //justifyContent: 'space-evenly',
    //alignItems: 'center'
  },
  selectField: {
    marginTop: theme.spacing(1),
    maxHeight: theme.spacing(5),
    maxWidth: theme.spacing(24)
  },
  measuresTable: {
    display: 'flex',
    flexDirection: 'row',

    fontSize: theme.spacing(1.5),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2.8),
  },
  feedback: {
    margin: '4px 0'
  },
  iconButton: {
    padding: '0',
  },
  colorButton: {
    border: '1px solid',
    width: theme.spacing(5),
    height: theme.spacing(5),
    marginRight: theme.spacing(1),
    borderRadius: 0
  },
  priceContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  oldPrice: {
    fontWeight: 500,
    fontSize: '14px',
    color: '#6F6C6B',

    textDecoration: 'line-through',
  },
  price: {
    fontWeight: 900,
    fontSize: '18px',
  },
  creditCardPayment: {
    display: 'inline-block',
    fontWeight: 500,
    fontSize: '14px',
    color: '#6F6C6B',
  },
  toBuyContainer: {
    display: 'flex',
    marginTop: '7%',
  },
  numberFieldContainer: {
    display:'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  numberField: {
    width: '60px',
    height: theme.spacing(7),
    [theme.breakpoints.down(330)]: {
      width: '46px',
    }
  },
  numberFieldButton: {
    padding: theme.spacing(0.6),
    fontSize: theme.spacing(13),
  },
  iconNumberButton: {
    fontSize: '2rem',
    [theme.breakpoints.down(330)]: {
      fontSize: '1.75rem',
    }
  },
  buyButton: {
    width: '250px',
    height: '55px',
    marginLeft: theme.spacing(2.5),
  },
  getCepDataContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '7%',
  },
  cepFieldContainer: {
    display: 'flex',
  },
  cepField: {
    [theme.breakpoints.down(440)]: {
      width: '85%',
    },
    maxWidth: '307px'
  },
  cepText: {
    display: 'inline-block',
    fontWeight: 500,
    fontSize: '14px',
    color: '#C1BBA7',
    textDecoration: 'underline',
    marginTop: '1%',
  },
  okButton: {
    [theme.breakpoints.down(440)]: {
      width: '15%',
    },
    width: theme.spacing(8),
    height: '40px',
    margin: '0 0 0 3%',
  },
}))
const schema = {
  size: {
    presence: { allowEmpty: false, message: () => 'Selecione o tamanho' },
  },
  color: {
    presence: { allowEmpty: false, message: () => 'Selecione a cor' },
  },
  quantity: {
    presence: { allowEmpty: false, message: () => 'Este campo é obrigatório' },
    numericality: {
      onlyInteger: true,
      greaterThan: 0,
      message: () => 'Este campo deve ser um número positivo'
    }
  },
  postal: {
    //format: { pattern: regex.cep, message: () => 'CEP inválido' }
  },
}

interface FormState {
  isValid: boolean,
  showErrors: boolean,
  values: {
    size: string,
    color: string,
    quantity: string,
    postal: string
  },
  errors: {
    size: string,
    color: string,
    quantity: string,
    postal: string
  },
  touched: {
    size: boolean,
    color: boolean,
    quantity: boolean,
    postal: boolean
  },
}

interface ProductDataProp {
  image: string,
  product: CartItemType
  addToCart: (item: CartItemType) => any
  setVariant: (variant: ProductDetail) => any
  setCount: (count: number) => any
}

const ProductData = (props: ProductDataProp) => {
  const { addToCart, setVariant, setCount, image, product, ...rest } = props;
  const classes = useStyles()
  const router = useRouter()
  const dispatch = useDispatch()


  const [openSelect, setOpenSelect] = useState<boolean>(false);
  const [postalCodeData, setPostalCodeData] =  useState({})
  const [formState, setFormState] = useState<FormState>({
    isValid: false,
    showErrors: false,
    values: {
      size: '',
      color: '',
      quantity: '1',
      postal: ''
    },
    errors: {
      size: null,
      color: null,
      quantity: null,
      postal: null,
    },
    touched: {
      size: false,
      color: false,
      quantity: true,
      postal: false
    }
  });

  //Valida o conteúdo dos formulários
  useEffect(() => {
    const errors = validate(formState.values, schema, { fullMessages: false })

    setFormState(formState => ({
      ...formState,
      isValid: !errors,
      errors: errors || {}
    }))
    
    if(formState.isValid){
      setFormState(formState => ({
        ...formState,
          showErrors: false
      }))
    }
  }, [formState.values]);
  
  //Operação de dispacho para o redux
  const addItem = (item: CustomizedProductType) => {
    dispatch(addCustomizedProduct(item))
  }
  
  //Envia dados para o Redux
  const handleSendToRedux = (e) => {
    e.preventDefault()

    if (formState.isValid) {
      addToCart({
        productDetail: {
          ...product.product.variants.find((variant) => 
          (variant.color.rgb == formState.values.color && variant.size == formState.values.size as ProductSize))
        },
        product: {
          ...product.product
        },
        count: parseInt(formState.values.quantity),
        customDetails: {
          image: image
        }
      })
      //router.push('/customizar/0')
    }else{
      setFormState({
        ...formState,
        showErrors: true
      })
    }
  };

  const handleFieldChange = (event, field: string) => {
    event.persist && event.persist()
    setFormState({
      ...formState,
      values:{
        ...formState.values,
        [field]: event.value
      },
      touched: {
        ...formState.touched,
        [field]: true
      }      
    })
  };

  //Controle do valor de quantidade
  const handleChangeQuantity = (event, value: string, operation: boolean | null) => {
    event.persist && event.persist()
    const number = (value == "") ? 0 : parseInt(value)
    let newValue = value

  
    if(operation == null) newValue = number.toString()
    else if(operation == true) newValue = (number + 1).toString()
    else if(operation == false) newValue = (number - 1).toString()

    setFormState({
      ...formState,
      values: {
        ...formState.values,
        quantity: (newValue == '') ? '0' : newValue
      },
      touched: {
        ...formState.touched,
        quantity: (newValue == '0' || newValue == '') ? false : true
      }      
    })
  };

  //Controle do valor de tamanho
  const handleChangeSize = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFormState({
      ...formState,
      values: {
        ...formState.values,
        size: (event.target.value as string)
      },
      touched: {
        ...formState.touched,
        size: (event.target.value == '') ? false : true
      }
    })
  };

  //Controle do valor de cor
  const handleChangeColor = (event: React.MouseEvent<HTMLElement>, newColor: string | null) => {
    setFormState({
      ...formState,
      values: {
        ...formState.values,
        color: newColor
      },
      touched: {
        ...formState.touched,
        color: true
      }
    });
  };

  const hasError = (field: string) => Boolean(formState.errors[field] && formState.touched[field])

  //renderiza os itens do campo select
  const renderSelectItems = () => {
    let visited = []

    return (
      product.product.variants.map((variant, _id) => {
        if(!visited.includes(variant.size)){
          if(formState.values.color && formState.values.color != ''){
            if(formState.values.color  == variant.color.rgb){
              visited.push(variant.size)
              return (
                <MenuItem key={_id} value={variant.size}>
                  {variant.size}
                </MenuItem>
              )
            }else return null
          }else{
            visited.push(variant.size)
            return (
              <MenuItem key={_id} value={variant.size}>
                {variant.size}
              </MenuItem>
            )
          }
        } else return null
      })
    )
  }
  
  //renderiza os itens do grupo de cores
  const renderColorButtons = () => {
    let visited = []
    
    return (
      product.product.variants.map((variant) => {
        if(!(visited.includes(variant.color.rgb))){
          if(formState.values.size && formState.values.size != ''){
            if(formState.values.size == variant.size){
              visited.push(variant.color.rgb)
              return (<ToggleButton disabled={variant.stock == 0} className={classes.colorButton} style={{ background: variant.color.rgb }} value={variant.color.rgb} key={variant.id.toString()} id={variant.id.toString()}>
                        {(variant.stock == 0) ? <Clear color="secondary"/> : ((document.getElementById(variant.id.toString())) && (product.productDetail.color.rgb == variant.color.rgb)) ? <Check color="secondary"/> : '' }
                      </ToggleButton>)

            }else return null
          }else{
            visited.push(variant.color.rgb)
            return <ToggleButton className={classes.colorButton} style={{ background: variant.color.rgb }} value={variant.color.rgb} key={variant.id.toString()} id={variant.id.toString()}>
                      {((document.getElementById(variant.id.toString())) && (document.getElementById(variant.id.toString()).attributes[4].nodeValue == 'true')) ? <Check color="secondary"/> : ''}
                    </ToggleButton>

          }
        } else return null
      })
    )
  }
  

  return (
    <div className={classes.root}>
      {/* Elementos de texto do produto */}
      <Typography className={classes.ref}> REF: 1234567GH </Typography>
      <Typography className={classes.brand}> {product.product.vendor} </Typography>
      <Typography className={classes.name}> {product.product.title} </Typography>
      <Typography className={classes.bio}> {product.product.description} </Typography>

      {/* Formulários de cor e tamanhos */}
      <div className={classes.selectFieldContainer}>
      <FormControl error={!!(formState.errors.size) && formState.showErrors}>
          <FormLabel className={classes.label}>
            <b>TAMANHO</b>
          </FormLabel>
          
          <Select
            className={classes.selectField}
            variant='outlined'
            value={formState.values.size}
            open={openSelect}
            onClose={() => {setOpenSelect(false)}}
            onOpen={() => {setOpenSelect(true)}}
            onChange={handleChangeSize}
            displayEmpty
          >
            <MenuItem value="">
              Selecione
            </MenuItem>
            {renderSelectItems()}
          </Select>
        </FormControl>

        {/*Feedback do campo de tamanhos */}
        {
          (formState.errors.size && formState.errors.size[0] && formState.showErrors) ? 
            <div className={classes.feedback}>
              <Typography className={classes.errorText}>
                {formState.errors.size[0]}
              </Typography>
            </div>
            : <br/>
        } 
        
      </div>

      <div className={classes.measuresTable}>
        <IconButton className={classes.iconButton}>
          <CropFreeIcon />
        </IconButton>
        <Typography className={classes.label} style={{ padding: '1% 8px 0' }}>
          <b>TABELA DE MEDIDAS</b>
        </Typography>
      </div>
      

      <FormControl error={!!(formState.errors.color) && formState.showErrors}>
        <FormLabel style={{marginBottom: '8px'}} className={classes.label}><b>COR</b></FormLabel>
        <ToggleButtonGroup size='large' exclusive value={formState.values.color} onChange={handleChangeColor}>
          {renderColorButtons()}
        </ToggleButtonGroup>
        <FormHelperText className={classes.errorText}>
          {
            (formState.errors.color && formState.errors.color[0] && formState.showErrors) ? 
              formState.errors.color[0] : null
          }
        </FormHelperText>
      </FormControl>

      <Divider style={{ margin: '6% 0' }} />

      {/* Preço e compra */}

      <Typography className={classes.priceContainer}>
        <span className={classes.price}> {(product.product.promotionalUnitPrice).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} </span>
        <span className={classes.creditCardPayment}>
          {' '}
          ou 12x de {(parseFloat((product.product.promotionalUnitPrice / 12).toFixed(2))).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
        </span>
      </Typography>

      <div className={classes.toBuyContainer}>
        <div className={classes.numberFieldContainer}>
          <IconButton className={classes.numberFieldButton} onClick={(e) => handleChangeQuantity(e, document.getElementsByName('numberField')[0].attributes[4].nodeValue, false)}>
            <RemoveCircleOutline className={classes.iconNumberButton} color="primary"/>
          </IconButton>

          <TextField
            name="numberField"
            error={!!(formState.errors.quantity) && formState.showErrors}    
            className={classes.numberField}
            value={formState.values.quantity || ''}
            onChange={(e) => handleChangeQuantity(e, e.target.value, null)}
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            variant='outlined'
          />
          
          <IconButton className={classes.numberFieldButton} onClick={(e) => handleChangeQuantity(e, document.getElementsByName('numberField')[0].attributes[4].nodeValue, true)}>
            <AddCircleOutline className={classes.iconNumberButton} color="primary" />
          </IconButton>
        </div>

        <Button className={classes.buyButton} variant='contained' onClick={handleSendToRedux}>
          COMPRAR
        </Button>
      </div>

      {/*Feedback quantidade a ser comprada */}
      {
        (formState.errors.quantity && formState.errors.quantity[0] && formState.showErrors) ? 
          <div className={classes.feedback}>
            <Typography className={classes.errorText}>
              {formState.errors.quantity[0]}
            </Typography>
          </div>
          : null
      }

      <Grid item className={classes.getCepDataContainer}>
        <Typography style={{marginBottom: '4px'}} className={classes.label}>
          <b>CALCULAR FRETE E PRAZO</b>
        </Typography>

        <div className={classes.cepFieldContainer}>
          <TextField
            className={classes.cepField}
            type='text'
            placeholder='Seu CEP'
            InputLabelProps={{
              shrink: true,
            }}
            variant='outlined'
            size='small'
          />

          <Button className={classes.okButton} size='small' variant='contained'>
            OK
          </Button>
        </div>

        <Link href='#' color='inherit' className={classes.cepText}>
          Não sei o meu cep
        </Link>
      </Grid>
    </div>
  )
}

export default ProductData
