import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Typography, Link, Hidden, Select } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { useRouter } from 'next/router'
import UserHeader from './components/UserHeader'
import PersonalInfo from './components/PersonalInfo'
import Customizations from './components/Customizations'
import Favorites from './components/Favorites'
import History from './components/History/History'
import {Breadcrumbs} from '../../components'


const useStyles = makeStyles(theme => ({
  root: {
    margin: '18px 188px',
    [theme.breakpoints.down('md')]: {
      margin: '18px 28px',
    }
  },
  history: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    position: 'relative',
    marginRight: '80%',
    [theme.breakpoints.down('sm')]: {
      margin: '2% 52.1% 0 0'
    }
  },
  link: {
    fontSize: '12px',
    color: '#6F6C6B',
    fontWeight: 400,
  },
  arrowIcon: {
    fontSize: '8px',
    margin: '0px 8px',
  },
  prod: {
    fontSize: '12px',
    fontWeight: 600,
  },
  header: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  },
  tabSelector: {
    marginTop: theme.spacing(7),
  },
  tabButtom: {
    width: theme.spacing(34.5),
    borderBottom: '4px solid rgba(255,255,255,.5)',
    borderRadius: 0,
    textTransform: 'capitalize',
    fontWeight: 400,
    color: '#6F6C6B',
    fontSize: theme.spacing(2.5),
  },
  divider: {
    borderBottom: '1px solid #C2C2C2',
  },
  menuMobileContainer: {
    margin: `${theme.spacing(2)}px 28px`,
  },
}))

const mockUser = {
  name: 'Fernanda Oliveira',
  email: 'olifer@gmail.com',
  password: 'senha@123',
  phone: '31 99877-6455',
  cpf: '000.983.477-91',
  address: {
    state: 'MG',
    street: 'Rua Antônio Dias',
    number: '345',
    complement: 'apto 302',
    neighborhood: 'Santo Antônio',
    city: 'Belo Horizonte',
    postal: '30.350.765',
  }
}

const selectTab = (i) => {
  switch (i) {
    case 0:
      return (<History />)
      break;
    case 1:
      return (<Customizations />)
      break;
    case 2:
      return (<Favorites />)
      break;
  
    default:
      return (<History />)
      break;
  }
}

function Index() {
  const classes = useStyles()
  const router = useRouter()
  const [tabIndex, setTabIndex] = useState<number>(0)

  const handleIndexChange = (e) => {
    setTabIndex(Number(e.target.value))
  }

  return (
    <div className={classes.root}>
      <Breadcrumbs page='Minha conta'/>
      <UserHeader className={classes.header} logout={()=> {}} name={mockUser.name}/>
      <PersonalInfo user={mockUser}/>
      <Hidden smDown>
        <div className={classes.tabSelector}>
          <Button className={classes.tabButtom} style={ tabIndex === 0 ? {borderBottom: '4px solid #000000', fontWeight: 600, color: '#1D1D1F'} : {}} onClick={() => setTabIndex(0)}>Histórico de compras</Button>
          <Button className={classes.tabButtom} style={ tabIndex === 1 ? {borderBottom: '4px solid #000000', fontWeight: 600, color: '#1D1D1F'} : {}} onClick={() => setTabIndex(1)}>Customizações</Button>
          <Button className={classes.tabButtom} style={ tabIndex === 2 ? {borderBottom: '4px solid #000000', fontWeight: 600, color: '#1D1D1F'} : {}} onClick={() => setTabIndex(2)}>Favoritos</Button>
        </div>
      </Hidden>
      <Hidden mdUp>
            <div className={classes.menuMobileContainer}>
                <Select
                    native
                    value={tabIndex}
                    onChange={handleIndexChange}
                    label=""
                    fullWidth
                    variant='outlined'
                >
                    <option value={0} > Histórico de compras </option>
                    <option value={1} > Customizações </option>
                    <option value={2} > Favoritos </option>
                </Select>
            </div>
        </Hidden>
      <div className={classes.divider}/>
      {selectTab(tabIndex)}
    </div>
  )
}

export default Index