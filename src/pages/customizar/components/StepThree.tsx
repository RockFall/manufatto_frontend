import React from 'react'
import { makeStyles } from '@mui/styles'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import {
  Divider, 
  Link,
  Typography 
} from '@mui/material'
import { CustomizationStepper } from '../../../components'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  history: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,

    position: 'relative',
    padding: '0 6% 0 4%',
    margin: '2% 50% 0 0',
    [theme.breakpoints.down('md')]: {
      margin: '2.3% 20.7% 0 17%',
    },
  },
  divider: {
    margin: '2% 6% 4.2% 4%',
    [theme.breakpoints.down('md')]: {
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
}));

interface stepThreeProps{
}

export default function Index(props: stepThreeProps) {
    const classes = useStyles();
    const {  } = props;

    return (
      <div className={classes.root}>
        <div className={classes.history}>
            <Link href='#' className={classes.link}>
                {' '}
                Home{' '}
            </Link>
            <ArrowForwardIosIcon className={classes.arrowIcon} />
            <Link href='#' className={classes.link}>
                {' '}
                Customização{' '}
            </Link>
            <ArrowForwardIosIcon className={classes.arrowIcon} />
            <Typography className={classes.prod}> Finalizar </Typography>
        </div>

        <Divider className={classes.divider} />

        <CustomizationStepper step={2}/>
      </div>
    )
};

