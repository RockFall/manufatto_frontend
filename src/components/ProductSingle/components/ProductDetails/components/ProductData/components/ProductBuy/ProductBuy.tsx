import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import CropFreeIcon from '@mui/icons-material/CropFree';
import { 
  Button, 
  Divider, 
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton, 
  InputLabel,
  Link, 
  MenuItem, 
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { 
  Check,
  RemoveCircleOutline,
  AddCircleOutline,
  Clear
} from '@mui/icons-material';
import { ToggleButton, ToggleButtonGroup } from '@mui/lab';
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { addCustomizedProduct, CustomizedProductType, CartItemType } from '../../../../../../../../actions'
import { CepMask } from '../../../../../../../../components'
//import { ProductDetail, ProductSize } from '../../../../../../../../generated/graphql'
import { ProductDetail } from '../../../../../../../../util/custom_types'
import Image from "next/legacy/image";
import validate from 'validate.js'
import { SelectChangeEvent } from '@mui/material';

const useStyles = makeStyles(theme => ({
  root: {
    width: '480px',
  },
  ref: {
    display: 'inline',
    verticalAlign: 'text-top',
    fontWeight: 500,
    fontSize: '10px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#6F6C6B',
  },
  brand: {
    display: 'block',
    margin: '2% 0 0',
    fontWeight: 500,
    fontSize: '18px',
    color: '#6F6C6B',
  },
  name: {
    margin: '3.5% 0 1.7% 0',

    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '27px',
    color: '#1D1D1F',
  },
  bio: {
    margin: '0',
    fontSize: '13px',
    textAlign: 'justify',
    color: '#999999',
  },
  label: {
    color: 'black',
    letterSpacing: '0.08em',
    fontSize: theme.spacing(1.125),
    fontWeight: 900
  },
  measuresTable: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: '11px',
    margin: '20px 0 0 0',
  },
  selectFieldControl: {
    minWidth: theme.spacing(16.25),
    justifyContent: 'center'
  },
  iconButton: {
    padding: '0 5px',
  },
  colorButton: {
    border: '1px solid',
    width: theme.spacing(4),
    height: theme.spacing(4),
    //marginRight: theme.spacing(1),
    borderRadius: 0
  },
  oldPrice: {
    fontWeight: 500,
    fontSize: '12px',
    color: '#6F6C6B',

    textDecoration: 'line-through',
  },
  container: {
    margin: '10% 0 0',
    alignItems: 'center'
  },
  selectField: {
    marginTop: theme.spacing(1),
    maxHeight: theme.spacing(5),
  },
  price: {
    marginLeft: '2%',
    fontWeight: 900,
    fontSize: '18px',
  },
  creditCardPayment: {
    display: 'inline-block',
    fontWeight: 500,
    fontSize: '12px',
    color: '#6F6C6B',
    marginLeft: '3%',
    paddingBottom: '2%',
  },
  numberFieldContainer: {
    marginTop: '7%',
  },
  numberField: {
    width: '14%',
    [theme.breakpoints.down(1120)]: {
      width: '17%',
    },
  },
  numberFieldButton: {
    fontSize: '12px',
    padding: '5px'
  },
  errorText: {
    color: '#ff1744',
    fontSize: '11px',
  },
  cepFieldContainer: {
    marginTop: '7%',
  },
  cepField: {
    width: '40%',
  },
  underlineText: {
    display: 'inline-block',
    fontWeight: 500,
    fontSize: theme.spacing(1.6),
    color: '#6F6C6B',
    textDecoration: 'underline',
  },
  buyButton: {
    width: '50%',
    height: '40px',

    fontSize: '11.2px',
    letterSpacing: '0.1em',

    marginLeft: '5%',
  },
  okButton: {
    width: '15%',
    height: '40px',
    margin: '0 7% 0 3%',
  },
  customizationButton:{
    display: 'inline-block',
    fontWeight: 500,
    fontSize: '14px',
    color: '#C1BBA7',
    textDecoration: 'underline',
    textTransform: 'none',
    margin: '10px 0 0 20px',
    padding: '0',
    '&:hover': {
      backgroundColor: 'transparent',
      textDecoration: 'underline',
    }

  },
  customizationContainer: {
    display: 'flex',
  }
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

interface ProductBuyProp {
  image: string,
  product: CartItemType
  addToCart: (item: CartItemType) => any
  setVariant: (variant: ProductDetail) => any
  setCount: (count: number) => any
}

const ProductBuy = (props: ProductBuyProp) => {
  const { addToCart, setVariant, setCount, image, product, ...rest } = props;
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();


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
    //dispatch(addCustomizedProduct(item))
    // FIXME: 
  };
  
  //Envia dados para o Redux
  const handleSendToRedux = (e) => {
    e.preventDefault()

    if (formState.isValid) {
      let variant_color, variant_size;
      const variant = product.product.variants.nodes.find((variant) => {
        variant.selectedOptions.forEach(option => {
          if (option.name === "Color") variant_color = option.value;
          if (option.name === "Size") variant_size = option.value;
        });
    
        return (variant_color == formState.values.color && variant_size == formState.values.size);
      });
    
      // You might want to handle the case when no matching variant is found.
      if (!variant) {
        throw new Error('No matching variant found'); // TODO: handle this case
      }

      addToCart({
        productDetail: {
          color: variant_color,
          size: variant_size,
          quantity: formState.values.quantity
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
  const handleChangeSize = (event: SelectChangeEvent<string>) => {
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
      product.product.variants.nodes.map((variant, _id) => {
        let variant_color, variant_size;
        variant.selectedOptions.forEach(option => {
          if (option.name === "Color") variant_color = option.value;
          if (option.name === "Size") variant_size = option.value;
        });

        if(!visited.includes(variant_size)){
          if(formState.values.color && formState.values.color != ''){
            if(formState.values.color  == variant_color){
              visited.push(variant_size)
              return (
                <MenuItem key={_id} value={variant_size}>
                  {variant_size}
                </MenuItem>
              )
            }else return null
          }else{
            visited.push(variant_size)
            return (
              <MenuItem key={_id} value={variant_size}>
                {variant_size}
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
      product.product.variants.nodes.map((variant) => {
        let variant_color, variant_size;
        variant.selectedOptions.forEach(option => {
          if (option.name === "Color") variant_color = option.value;
          if (option.name === "Size") variant_size = option.value;
        });

        if(!(visited.includes(variant_color))){
          if(formState.values.size && formState.values.size != ''){
            if(formState.values.size == variant_size){
              visited.push(variant_color)
              return (<ToggleButton disabled={variant.inventoryQuantity == 0} className={classes.colorButton} style={{ background: variant_color }} value={variant_color} key={variant.id.toString()} id={variant.id.toString()}>
                        {(variant.inventoryQuantity == 0) ? <Clear color="secondary"/> : ((document.getElementById(variant.id.toString())) && (product.productDetail.color == variant_color)) ? <Check color="secondary"/> : '' }
                      </ToggleButton>)

            }else return null
          }else{
            visited.push(variant_color)
            return <ToggleButton className={classes.colorButton} style={{ background: variant_color }} value={variant_color} key={variant.id.toString()} id={variant.id.toString()}>
                      {((document.getElementById(variant.id.toString())) && (document.getElementById(variant.id.toString()).attributes[4].nodeValue == 'true')) ? <Check color="secondary"/> : ''}
                    </ToggleButton>

          }
        } else return null
      })
    )
  }

  const getPostalCodeData = () => {
    /*
    let args = {
      sCepOrigem: '81200100',
      sCepDestino: '21770200',
      nVlPeso: '1',
      nCdFormato: '1',
      nVlComprimento: '20',
      nVlAltura: '20',
      nVlLargura: '20',
      nCdServico: ['04014', '04510'],
      nVlDiametro: '0',
    };    
    
    correiosBrasil.calcularPrecoPrazo(args).then( (response) => {
      console.log(response);
    });
    */
  }
  
  return (
    <div className={classes.root}>
      {/* Elementos de texto do produto */}
      <Typography className={classes.ref}> REF: 1234567GH </Typography>
      <Typography className={classes.brand}> {product.product.vendor} </Typography>
      <Typography className={classes.name}> {product.product.title} </Typography>
      <Typography className={classes.bio}> {product.product.description} </Typography>

      {/* Formulários de cor e tamanhos */}
      <Grid className={classes.container} container direction='row' justifyContent="space-between">
        <FormControl error={!!(formState.errors.size) && formState.showErrors} className={classes.selectFieldControl}>
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
            onChange={(e) => handleChangeSize(e)} // FIXME: broken?
            displayEmpty
          >
            <MenuItem value="">
              Selecione
            </MenuItem>
            {renderSelectItems()}
          </Select>
        </FormControl>

        <div className={classes.measuresTable}>
          <IconButton className={classes.iconButton} size="large">
            <CropFreeIcon />
          </IconButton>
          <Typography className={classes.label} style={{ padding: '5px 0 0 6px' }}>
            TABELA DE MEDIDAS
          </Typography>
        </div>
      </Grid>

      {/*Feedback do campo de tamanhos */}
      {
        (formState.errors.size && formState.errors.size[0] && formState.showErrors) ? 
          <div style={{margin: '4px 0'}}>
            <Typography style={{display: 'inline', verticalAlign: 'text-top'}} className={classes.errorText}>
              {formState.errors.size[0]}
            </Typography>
          </div>
          : <br/>
      } 

      <FormControl error={!!(formState.errors.color) && formState.showErrors}>
        <FormLabel style={{marginBottom: '7px'}} className={classes.label}><b>COR</b></FormLabel>
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
      <div>
        <Typography>
          <span className={classes.oldPrice}> {(product.product.contextualPricing.maxVariantPricing.compareAtPrice?.amount)?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} </span>
          <span className={classes.price}> {(product.product.contextualPricing.maxVariantPricing.price.amount).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} </span>
          <span className={classes.creditCardPayment}>
            {' '}
            ou 12x de {(parseFloat((product.product.contextualPricing.maxVariantPricing.price.amount / 12).toFixed(2))).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
          </span>
        </Typography>
      </div>

      <div className={classes.numberFieldContainer}>
        <IconButton
          className={classes.numberFieldButton}
          onClick={(e) => handleChangeQuantity(e, document.getElementsByName('numberField')[0].attributes[4].nodeValue, false)}
          size="large">
          <RemoveCircleOutline color="primary"/>
        </IconButton>

        <TextField
          name="numberField"
          error={!!(formState.errors.quantity) && formState.showErrors}    
          className={classes.numberField}
          value={formState.values.quantity || ''}
          onChange={(e) => handleChangeQuantity(e, e.target.value, null)}
          type="text"
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          variant='outlined'
        />
        
        <IconButton
          className={classes.numberFieldButton}
          onClick={(e) => handleChangeQuantity(e, document.getElementsByName('numberField')[0].attributes[4].nodeValue, true)}
          size="large">
          <AddCircleOutline color="primary" />
        </IconButton>
        
        <Button className={classes.buyButton} variant='contained' onClick={handleSendToRedux}>
          COMPRAR
        </Button>
      </div>

      {/*Feedback quantidade a ser comprada */}
      {
        (formState.errors.quantity && formState.errors.quantity[0] && formState.showErrors) ? 
          <Typography className={classes.errorText}>
            {formState.errors.quantity[0]}
          </Typography>
          : null
      }

      <Grid item className={classes.cepFieldContainer}>
        <p className={classes.label}>
          <b>CALCULAR FRETE E PRAZO</b>
        </p>
        <TextField
          error={hasError('postal')}
          helperText={(hasError('postal') && formState.showErrors) ? formState.errors.quantity[0] : null}
          className={classes.cepField}
          value={formState.values.postal}
          onChange={e => handleFieldChange(e, 'postal')}
          type='text'
          placeholder='Seu CEP'
          InputLabelProps={{
            shrink: true,
          }}
          variant='outlined'
          size='small'
          InputProps={{ inputComponent: CepMask }}
        />

        <Button className={classes.okButton} size='small' variant='contained' onClick={getPostalCodeData}>
          OK
        </Button>
        <Link href='#' color='inherit' className={classes.underlineText}>
          Não sei meu CEP
        </Link>
      </Grid>

      <Divider style={{margin: '25px 0'}}/>
      <div className={classes.customizationContainer}>
        <Image
          src={'/selo-customizavel.svg'}
          width="75"
          height="75"
          alt=""
        />
        <Button className={classes.customizationButton} color='inherit' onClick={(e) => handleSendToRedux(e)}>
          Customizar este produto
        </Button>
      </div>
    </div>
  );
}

export default ProductBuy
