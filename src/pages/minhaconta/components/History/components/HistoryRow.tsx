import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Select, IconButton, TableCell, TableRow, Typography, Collapse, TableHead, Box, TableBody, Table } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { formatMoney } from '../../../../../mixins/formatter'

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

import HistoryItem from './HistoryItem'
import HistoryPriceDisplay from './HistoryPriceDisplay'

const useStyles = makeStyles((theme) => ({
  root: {
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
  infoDisplay: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      alignItems: 'flex-start',
    },
  },
  historyPriceDisplay: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      margin: 0,
    },
  },
  infoShipmentText: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(6),
    fontWeight: 600,
    fontSize: theme.spacing(1.5),
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  priceText: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    fontWeight: 400,
    fontSize: theme.spacing(2),
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  tableItems: {
    fontSize: theme.spacing(2),
  },
  tableDate: {
    fontSize: theme.spacing(1.5),
    fontWeight: 600
  }
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

interface HistoryRowProps {
  className?: string
  historyItem: HistoryItemType
  mobile?: boolean
}

const HistoryRow = (props: HistoryRowProps) => {
  const { className, historyItem } = props
  const [open, setOpen] = React.useState(false)
  const totalPrice = historyItem.orderShops?.reduce((acc, item) => (item.products.reduce((acc, item) => (item.price + acc), 0) + item.shipmentPrice + acc), 0) || 0
  const classes = useStyles()
    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          
          <TableCell component="th" scope="row" style={{letterSpacing: '0.08em'}}>
            {`PEDIDO ${historyItem.orderId}`}
          </TableCell>
          <TableCell className={classes.tableDate}>{historyItem.date}</TableCell>
          <TableCell className={classes.tableItems}>{historyItem.status}</TableCell>
          <TableCell className={classes.tableItems}>{formatMoney(totalPrice)}</TableCell>
          <TableCell align="right">
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              {historyItem && historyItem.orderShops.map((store, i) => (
                <Box margin={1}>
                  <Typography variant="h6" gutterBottom component="div">
                    {store.shopName}
                  </Typography>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell style={{borderBottom: 'none', width:'90%'}}></TableCell>
                        <TableCell style={{borderBottom: 'none' }} align="right"></TableCell>
                        <TableCell style={{borderBottom: 'none' }} align="right"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {store.products && store.products.map((item, i) => (
                        <HistoryItem historyItem={item} shopName={store.shopName} key={i}/>
                      ))}
                    </TableBody>
                  </Table>
                  <div style={{width: '100%', borderTop: '1px solid #C2C2C2', borderBottom: '1px solid #C2C2C2'}}>
                    <div style={{display: 'flex', justifyContent: 'flex-start', width: '100%', alignItems:'center'}}>
                      <div className={classes.infoDisplay} style={{width: '90%', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                        <Typography className={classes.infoShipmentText}>Subtotal frete</Typography>
                      </div>
                      <div className={classes.historyPriceDisplay} style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                        <Typography className={classes.priceText}> {formatMoney(store.shipmentPrice)} </Typography>
                      </div>
                    </div>
                  </div>
                </Box>
              ))}
              <div style={{display: 'flex', justifyContent: 'flex-start', width: '100%'}}>
                <HistoryPriceDisplay subtotal={100000} shipmentPrice={1000} totalPrice={101000}/>
              </div>
            </Collapse>
          </TableCell>
        </TableRow>
        
      </React.Fragment>
  )
}

export default HistoryRow