import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Login from './components/Login';
import StepOne from './components/StepOne';
import StepTwo from './components/StepTwo';
import StepThree from './components/StepThree';
import { useRouter } from 'next/router';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  text2: {
    width: '536px',
    fontWeight: 300,
    color: '#6F6C6B',
    fontSize: '24px',
    margin: '1.5% auto 2%',

    textAlign: 'center'
  },
  history: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,

    position: 'relative',
    padding: '0 6% 0 4%',
    margin: '2% 50% 0 0',
    [theme.breakpoints.down('sm')]: {
      margin: '2.3% 20.7% 0 17%',
    },
  },
  divider: {
    margin: '2% 6% 4.2% 4%',
    [theme.breakpoints.down('sm')]: {
      margin: '3% 20.7% 4.2%',
    },
  },
  arrowIcon: {
    fontSize: '8px',
    margin: '0px 8px',
  },
  prod: {
    fontSize: '12px',
    fontWeight: 600,
  },  
  link: {
    fontSize: '12px',
    color: '#6F6C6B',
    fontWeight: 400,
  },
  container: {
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
  },
}));

const artData = [
    {
      artist: {
          name: 'Rafael Motta',
          avatar: '/avatar/avatar1.svg'
      },
      images: [
        {
          path:'/art/art1.svg',
          smallPrice: '89',
          mediumPrice: '179',
          largePrice: '344'
        }, 
        {
          path:'/art/art2.svg',
          smallPrice: '89',
          mediumPrice: '179',
          largePrice: '344'
        }, 
        {
          path:'/art/art3.svg',
          smallPrice: '89',
          mediumPrice: '179',
          largePrice: '344'
        }, 
        {
          path:'/art/art5.svg',
          smallPrice: '89',
          mediumPrice: '179',
          largePrice: '344'
        }
      ]
      
    },
    {
      artist: {
          name: 'Flávia Monteiro',
          avatar: '/avatar/avatar2.svg'
      },
      images: [
        {
          path:'/art/art1.svg',
          smallPrice: '89',
          mediumPrice: '179',
          largePrice: '344'
        }, 
        {
          path:'/art/art2.svg',
          smallPrice: '89',
          mediumPrice: '179',
          largePrice: '344'
        }, 
        {
          path:'/art/art3.svg',
          smallPrice: '89',
          mediumPrice: '179',
          largePrice: '344'
        }, 
        {
          path:'/art/art4.svg',
          smallPrice: '89',
          mediumPrice: '179',
          largePrice: '344'
        }, 
        {
          path:'/art/art5.svg',
          smallPrice: '89',
          mediumPrice: '179',
          largePrice: '344'
        }, 
        {
          path:'/art/art6.svg',
          smallPrice: '89',
          mediumPrice: '179',
          largePrice: '344'
        }
      ]
    },
    {      
      artist: {
          name: 'Ana Carolina',
          avatar: '/avatar/avatar3.svg'
      },
      images: [
        {
          path:'/art/art1.svg',
          smallPrice: '89',
          mediumPrice: '179',
          largePrice: '344'
        },
        {
          path:'/art/art2.svg',
          smallPrice: '89',
          mediumPrice: '179',
          largePrice: '344'
        }, 
        {
          path:'/art/art3.svg',
          smallPrice: '89',
          mediumPrice: '179',
          largePrice: '344'
        }, 
        {
          path:'/art/art4.svg',
          smallPrice: '89',
          mediumPrice: '179',
          largePrice: '344'
        }
      ]
      
    }
  ];

export default function Index() {
    const classes = useStyles();
    const router = useRouter();
    //mude para false para visualizar a tela de login
    const [logged, setLogged] = useState<boolean>(true);
    const { step } = router.query;
    
    function getStep() {
      switch(step){
        case "0": return <StepOne artData={artData}/>
        case "1": return <StepTwo artData={artData}/>
        case "2": return <StepThree/>
        default: return <StepOne artData={artData}/>
      }
    }

  
    return (
      <div className={classes.root}>
        {(logged) ? (step && getStep()) : (<Login /*product={product}*//>)}
      </div>
    )
};

