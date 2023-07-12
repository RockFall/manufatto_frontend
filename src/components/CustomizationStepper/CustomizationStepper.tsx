import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import {
  Button,
  FormControlLabel,
  Radio,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  TextareaAutosize
} from '@material-ui/core';
import { StepIconProps } from '@material-ui/core/StepIcon';
//import { ArtGrid } from '../../components'
import AddIcon from '@material-ui/icons/Add'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { CartItemType, addCartItem } from '../../actions'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    stepper: {
      width: '1086px',
      [theme.breakpoints.down('lg')]: {
        width: '84%',
      },
      display: 'block',
      margin: '0 auto'
    },
    content: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '3%'
    },
    cardContainer: {
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    productInfo: {
      display: 'flex',
      flexDirection: 'column',

      marginLeft: '20px'
    },
    brand: {
      fontWeight: 400,
      fontSize: '14px',
      color: '#999999',
    },
    name: {  
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '16px',
      color: '#1D1D1F',
    },
    ref: {
      fontWeight: 600,
      fontSize: '12px',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: '#999999',
    },
    colorNSize: {
      marginTop: '2%',
      fontWeight: 400,
      fontSize: '12px',
      color: '#999999',
    },
    container: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column'
    },
    customizedCardContainer: {
      width: '680px',
      [theme.breakpoints.down(700)]: {
        width: '100%'
      },
      height: '155px',
      margin: '0 auto',
      padding: '0 1%',
      backgroundColor: '#F3F3F3',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    icon: {
      width: '10%',
      fontSize: 50,
      marginRight: '35px'
    },
    artImage: {
      width: '20%',
      objectFit: 'cover',
      height: 130
    },
    stepOneText: {
      display: 'flex',
      width: '500px',
      margin: '2% auto',

      textAlign: 'center'
    },
    stepTwoText1: {
      display: 'flex',
      width: '500px',
      [theme.breakpoints.down(500)]: {
        width: '100%'
      },
      margin: '2% auto 0',

      textAlign: 'center'
    },
    stepTwoText2: {
      fontSize: '14px',
      fontWeight: 500,
      color: '#999999',
      marginBottom: '4%',

      textAlign: 'center'
    },
    stepThreeText1: {
      margin: '0 auto 1.4%',
      textAlign: 'center'
    },
    stepThreeText2: {
      width: '536px',
      [theme.breakpoints.down(536)]: {
        width: '100%'
      },
      fontWeight: 300,
      color: '#6F6C6B',
      fontSize: '24px',
      margin: '1.5% auto 2%',

      textAlign: 'center'
    },
    actionsContainer: {
      width: '400px',
      [theme.breakpoints.down(400)]: {
        width: '100%'
      },
      display: 'flex',
      flexDirection: 'column',
      margin: '0 auto'
    },
    radioLabel: {
      marginBottom: '3%',
      fontSize: '12px',
      color: '#6F6C6B'
    }
  }),
);

const ManufattoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 11.5px)',
    right: 'calc(50% + 11.5px)',
  },
  active: {
    '& $line': {
      borderColor: '#87C7C5',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#87C7C5',
    },
  },
  line: {
    border: '2px solid #BFBBBA',
  },
})(StepConnector);

const useManufattoStepIconStyles = makeStyles({
  root: {
    color: '#BFBBBA',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#87C7C5',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
    zIndex: 1
  },
  completed: {
    width: 24,
    height: 24,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
    color: '#87C7C5',
    zIndex: 1
  },
});

function ManufattoStepIcon(props: StepIconProps) {
  const classes = useManufattoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <div className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
};

interface Art {
  path: string,
  smallPrice: string,
  mediumPrice: string,
  largePrice: string
}

interface ArtList {
  artist: {
    name: string,
    avatar: string
  },
  images: Art[]
};

interface CustomizationStepperProps {
  step: number,
  artData?: ArtList[],
};


export default function CustomizationStepper(props: CustomizationStepperProps) {
  const { step, artData } = props
  const classes = useStyles()
  const router = useRouter()
  const dispatch = useDispatch()

  const steps = getSteps()

  const [checked, setChecked] = useState<boolean>(false)
  const [item, setItem] = useState<CartItemType>()
  const [message, setMessage] = useState<string>()
    
  useEffect(() => {
    let customizedProduct = JSON.parse(window.localStorage.getItem('customizedProduct'))
    
    if(customizedProduct){      
      setItem(customizedProduct.customizedProduct.addCustomizedProduct)  
    }else router.push('errors/404')    
  }, [])  

  const addItem = (item: CartItemType) => {
    dispatch(addCartItem(item))
  }
  
  const handleUpdateRedux = (e) => {
    e.preventDefault()

    addItem({
      ...item,
      customDetails:{
        ...item.customDetails,
        message: message
      }
    })
    //router.push('/carrinho/')
  }

  const handleChangeMessage = () => (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleCheck = () => {
    setChecked(!checked);
  };

  function getSteps() {
    return ['Escolha do artista', 'Escolha da arte', 'Finalizar'];
  };
  
  const ProductCard = () => {
    return (
      <div className={classes.cardContainer}>
        <img src={item.customDetails.image} width={120} height={150} />
        <div className={classes.productInfo}>
          <div className={classes.brand}>{item.product?.vendor}</div>
          <div className={classes.name}>{item.product?.title}</div>
          <div className={classes.ref}>REF:1234567GH</div>
          <div className={classes.colorNSize}>Tamanho: {item.productDetail?.size} - Cor: {item.productDetail?.color.name}</div>
        </div>
      </div>
    )
  };
  
  function getStepContent(stepIndex: number) {
    switch (stepIndex) {
      case 0:
        return (
          <div className={classes.container}>
            <ProductCard/>
            <h1 className={classes.stepOneText}>Agora escolha uma arte para customizar sua peça</h1>
            {(artData) && artData.map((artList, _id) => {
              return (
                <div key={_id}>
                  

                  <br style={{marginTop: '5%'}}/>
                </div>
              )})}
          </div>
        )

      case 1:
        return (
          <div className={classes.container}>
            <ProductCard/>
            <h1 className={classes.stepTwoText1}>Escolha uma arte como referência para customizar sua peça</h1>
            <p className={classes.stepTwoText2}>Você poderá solicitar alguma mudança ou personalização na arte</p>
            

            <br style={{marginTop: '5%'}}/>
          </div>        
        )

      case 2:
        return (
          <div className={classes.container}>
            <h2 className={classes.stepThreeText1}>Ótima escolha de customização!</h2>
            <div className={classes.customizedCardContainer}>
              <div style={{width: '60%'}}><ProductCard/></div>
              <AddIcon className={classes.icon}/>
              <img className={classes.artImage} src={item.customDetails.artImage}/>
            </div>

            <h2 className={classes.stepThreeText2}>Você pode fazer uma observação para o artista por mensagem ou seguir direto para o seu carrinho de compras</h2>
            <div className={classes.actionsContainer}>
              <FormControlLabel
                className={classes.radioLabel}
                checked={checked} 
                control={<Radio onClick={handleCheck} color="primary" />}
                label="Deseja enviar uma observação para o artista?"
              />
              {checked && 
                <TextareaAutosize
                  value={message}
                  onChange={handleChangeMessage}
                  style={{backgroundColor: '#F3F3F3', marginBottom: '25px',}}
                  rowsMin={8}
                  placeholder="Digite sua mensagem"
                />
              }

              <Button onClick={e => handleUpdateRedux(e)} color="primary" variant="contained" fullWidth size="small">Enviar e ir para o carrinho</Button>
            </div>
            <br style={{margin: '3% 0'}}/>
          </div>
        )
      default:
        return <div>Não encontrado</div>;
    }
  };
  return ( 
    <div className={classes.root}>
      { item &&
        <div>
          <div className={classes.stepper}>
            <Stepper activeStep={step} alternativeLabel connector={<ManufattoConnector />}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={ManufattoStepIcon}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>
          <div>
            <div className={classes.content}>
              {getStepContent(step)}
            </div>
          </div>
        </div>
      }
    </div>
  );
}