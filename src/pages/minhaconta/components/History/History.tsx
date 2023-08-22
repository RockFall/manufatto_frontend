import React, {useState} from 'react'
import clsx from 'clsx'
import { makeStyles } from '@mui/styles'
import { Typography, Grid, Button, TableBody, TableCell, TableRow, TableHead, Table ,Hidden, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import HistoryRow from './components/HistoryRow'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const useStyles = makeStyles(theme => ({
  root:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  noHistory:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  noHistoryText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(7),
    marginTop: theme.spacing(3),
  },
  logoutText: {
    fontSize: theme.spacing(1.5),
    color: '#999999',
    textTransform: 'capitalize',
  },
  infoColumn: {
    marginLeft: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
  },
  storeName: {
    fontSize: theme.spacing(1.5),
    fontFeatureSettings: "'liga' off, 'kern' off",
    color: '#999999',
  },
  nameText: {
    fontSize: theme.spacing(2),
  },
  codeText: {
    fontWeight: 600,
    fontSize: theme.spacing(1.5),
    letterSpacing: '1px',
    textTransform: 'uppercase',
    color: '#999999',
  },
  infoText: {
    marginTop: theme.spacing(0.5),
    fontSize: theme.spacing(1.5),
    fontFeatureSettings: "'liga' off, 'kern' off",
    color: '#999999',
  },
  inner: {},
  button: {
    color: '#6F6C6B',
    fontSize: theme.spacing(1.3),
    margin: '0 5px',
    padding: '1.5% 4%',
    letterSpacing: '0.16em',
    border: '1px solid #6F6C6B',
    whiteSpace: 'nowrap',
    overflowWrap: 'inherit',
  },
}))

interface ProductItemType 
{
  image: string,
  productName: string,
  ref: string,
  size: string,
  color: string,
  price: number,
}

interface ShopItemType {
  shopName: string,
  shipmentPrice: number,
  products:ProductItemType[]
}

interface HistoryItemType 
{
  orderId: string,
  storeName: string,
  date: string,
  status: string,
  orderShops: ShopItemType[]
}



interface HistoryProp {
    className?: string
}

const historyList2 = [
  {
    orderId: '1221',
    storeName: 'loja 1',
    date: '09/08/2020',
    status: 'Entregue',
    orderShops: [
      {
        shopName: 'nome da loja 1',
        shipmentPrice: 2000,
        products: [
          {
            image: '',
            productName: 'Nome do produto',
            ref: '12321321',
            size: 'G',
            color: 'Verde',
            price: 18989,
          },{
            image: '',
            productName: 'Nome do produto 2',
            ref: '3213213',
            size: 'GG',
            color: 'azul',
            price: 18989,
          },
        ] 
      },
      {
        shopName: 'nome da loja 2',
        shipmentPrice: 1000,
        products: [
          {
            image: '',
            productName: 'Nome do produto 43',
            ref: '12321321',
            size: 'G',
            color: 'Verde',
            price: 1389,
          },{
            image: '',
            productName: 'produto 2',
            ref: '3213213',
            size: 'GG',
            color: 'azul',
            price: 18989,
          },
        ] 
      }
    ]
  },
  {
    orderId: '1221',
    date: '09/08/2020',
    status: 'Em análise',
    orderShops: [
      {
        shopName: 'nome da loja 1',
        shipmentPrice: 2000,
        products: [
          {
            image: '',
            productName: 'produto 3',
            ref: '2344321',
            size: 'G',
            color: 'Verde',
            price: 18989,
          },
        ]
      }
    ]
  }
]


const History = (props: HistoryProp) => {
  const { className, ...rest } = props
  const classes = useStyles()
  const historyList = historyList2

  if(!historyList){
    return (
      <div {...rest} className={clsx(classes.noHistory, className)}>
        <div className={classes.noHistoryText}>
          <Typography variant='h6'>🙁</Typography>
          <Typography variant='h6'>Você ainda não fez compras</Typography>
          <Typography variant='body1'>Vamos começar?</Typography>
        </div>
        <Grid container justifyContent='center' alignItems='center'>
            <Button className={classes.button} color='inherit'>
              ROUPAS +
            </Button>
            <Button className={classes.button} color='inherit'>
              BOLSAS +
            </Button>
            <Button className={classes.button} color='inherit'>
              ACESSÓRIOS +
            </Button>
            <Button className={classes.button} color='inherit'>
              CALÇADOS +
            </Button>
          </Grid>
      </div>
    );
  }
  

  return (
    <div {...rest} className={clsx(classes.root, className)}>
        <Table>
          <Hidden mdDown>
            <TableHead>
              <TableRow>
                <TableCell style={{width:'40%'}}>Item</TableCell>
                <TableCell style={{width:'25%'}}>Data</TableCell>
                <TableCell style={{width:'25%'}}>
                  Status
                </TableCell>
                <TableCell >
                  Valor
                </TableCell>
                <TableCell >
                </TableCell>
              </TableRow>
            </TableHead>
          </Hidden>
          <TableBody>
            {historyList && historyList.map((item, i) => (
              <HistoryRow historyItem={item as HistoryItemType} key={i}/>
            ))}
          </TableBody>
        </Table>
    </div>
  );
}

export default History


