import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import {
  Button,
  Dialog,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Grid,
  Link,
  Radio,
  RadioGroup,
  Typography,
  DialogContent,
} from '@mui/material';
import { Close } from '@mui/icons-material/';
import { addCustomizedProduct, CustomizedProductType } from '../../actions'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles(theme => ({
  root: {},
  dialogContainer: {
    padding: '4.5% 11% 6% 13%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '587px',
    minHeight: '460px'
  },
  title: {
    width: '90%',
    fontSize: '24px',
    fontWeight: 600,
    textAlign: 'justify'
  },
  image: {
    width: 230,
    height: 340,
    [theme.breakpoints.down(1280)]: {
      width: 170,
      height: 280,
    },
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(0.6),
    color: theme.palette.grey[500],
    alignContent: 'center'
  },
  fieldControl:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  fieldLabel: {
    color: 'black',
    fontWeight: 500
  },
  radioLabel: {
    fontSize: '12px',
    color: '#6F6C6B'
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  continueButton: {
    fontSize: '11.2px',
    letterSpacing: '0.1em',
    height: '52px',
    marginBottom: '24px'
  },
  cancelLink: {
    fontSize: '16px',
    color: '#6F6C6B',
    textDecoration: 'underline'
  }
}));

interface Art {
  path: string,
  smallPrice: number,
  mediumPrice: number,
  largePrice: number
}

interface ArtDialogProps {
  image: Art
  //onSubmit: () => any
};



const ArtDialog = (props: ArtDialogProps) => {
  const { image, ...rest } = props;
  const classes = useStyles();
  const router = useRouter()
  const dispatch = useDispatch()

  const [product, setProduct] = useState<CustomizedProductType>()

  const [option, setOption] = React.useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let customizedProduct = JSON.parse(window.localStorage.getItem('customizedProduct'))

    if(customizedProduct){      
      setProduct(customizedProduct.customizedProduct.addCustomizedProduct)
    }else router.push('errors/404')    
  }, [])

  const handleClickOpen = () => {
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false)
  };  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOption(parseInt((event.target as HTMLInputElement).value));
  };

  const addItem = (item: CustomizedProductType) => {
    //dispatch(addCustomizedProduct(item)) FIXME: 
  };

  const handleUpdateRedux = (e) => {
    e.preventDefault()

    let artData = {
      size: '',
      price: null,
      image: ''
    } 
  
    switch(option){
      case 0: 
        artData.size = 'small', 
        artData.price = image.smallPrice,
        artData.image = image.path
        break;
      case 1: 
        artData.size = 'medium', 
        artData.price = image.mediumPrice,
        artData.image = image.path
        break;
      case 2:
        artData.size = 'large', 
        artData.price = image.largePrice ,
        artData.image = image.path
        break;
    }
    
    addItem({
      ...product,
      customDetails: {
        ...product.customDetails,
        artSize: artData.size,
        artPrice: artData.price,
        artImage: artData.image
      }      
    })
    router.push('/customizar/2')
  };
  
  console.log(option)
  return (
    <div className={classes.root}>

      <Link
        component="button"
        onClick={handleClickOpen}
      >
        <img className={classes.image} src={image.path}/>
      </Link>

      <div>
        <Dialog fullWidth open={open} scroll="body">
          <DialogTitle>
            <IconButton className={classes.closeButton} onClick={handleClose} size="large">
              <Close color="action"/>
            </IconButton>      
          </DialogTitle>

          <DialogContent className={classes.dialogContainer}>
            <Typography className={classes.title} component="p" variant="h4">
              Escolha o tamanho da arte que será customizada na sua peça
            </Typography>
            <Grid container direction="row" justifyContent="space-between">
              {/*Imagem ilustrativa */}
              <img style={{objectFit: 'cover'}} src={image.path} width="132" height="132"/>
              

              {/*Formulário para seleção do tamanho da arte*/}
              <FormControl className={classes.fieldControl} component="fieldset">
                <FormLabel className={classes.fieldLabel}>Selecionar tamanho:</FormLabel>
                <RadioGroup aria-label="size" name="size" value={option} onChange={handleChange}>
                  <FormControlLabel className={classes.radioLabel} value={0} control={<Radio size="small"/>} label={"Pequeno detalhe: " + `R$ ${image.smallPrice},00`} />
                  <FormControlLabel className={classes.radioLabel} value={1} control={<Radio size="small"/>} label={"Arte média: " + `R$ ${image.mediumPrice},00`}/>
                  <FormControlLabel className={classes.radioLabel} value={2} control={<Radio size="small"/>} label={"Arte na peça inteira: " + `R$ ${image.largePrice},00`}/>
                </RadioGroup>
              </FormControl> 
            </Grid>
            
            <div className={classes.buttonsContainer}>
              <Button className={classes.continueButton} size="small" variant="contained" fullWidth color="primary" onClick={e => handleUpdateRedux(e)}>
                Continuar
              </Button>
              <Link className={classes.cancelLink} component="button" color="primary" onClick={handleClose}>
                Cancelar
              </Link>
            </div>
          </DialogContent> 
        </Dialog>
      </div>
    </div>
  );
}
      
      

export default ArtDialog