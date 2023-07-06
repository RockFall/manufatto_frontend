import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Select, IconButton, TableCell, TableRow, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { formatMoney } from '../../../../../mixins/formatter'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing(2)
  },
  historyItem: {
    
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

interface HistoryItemProps {
  className?: string
  historyItem?: ProductItemType
  shopName?: string
  mobile?: boolean
}

const HistoryItem = (props: HistoryItemProps) => {
  const { shopName, className, historyItem } = props
  const classes = useStyles()
  return (
    <TableRow hover className={classes.historyItem}>
        <TableCell className={classes.row} style={{borderBottom: 'none' }}>
          <img width={100} height={123} src={historyItem.image || ''} />
          <div className={classes.infoColumn}>
            <Typography className={classes.storeName}>{shopName}</Typography>
            <Typography className={classes.nameText}>{historyItem.productName}</Typography>
            <Typography className={classes.codeText}>{historyItem.ref}</Typography>
            <Typography className={classes.infoText}> {`tamanho: ${historyItem.size} - Cor: ${historyItem.color}`} </Typography>
          </div>
        </TableCell>
        <TableCell style={{borderBottom: 'none', fontSize: '16px' }}>
        {formatMoney(historyItem.price)}
        </TableCell>
        <TableCell style={{borderBottom: 'none' }}></TableCell>
      </TableRow>
  )
}

export default HistoryItem

