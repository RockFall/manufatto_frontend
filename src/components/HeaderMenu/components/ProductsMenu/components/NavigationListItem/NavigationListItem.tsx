/* eslint-disable react/display-name */
import React, { useState, forwardRef } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { ListItem, Button, Collapse, colors, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  item: {
    display: 'block',
    paddingTop: 0,
    paddingBottom: 0,
    color: '#000',
  },
  itemLeaf: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    padding: '10px 8px',
    justifyContent: 'flex-start',
    alignItems: 'center',
    textAlign: 'center',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
  },
  buttonLeaf: {
    padding: '10px 8px',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightRegular,
    '&.depth-0': {
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
  icon: {
    color: colors.grey[500],
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1),
  },
  expandIcon: {
    marginLeft: 'auto',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main,
    },
  },
}))

interface NavigationListItemProp {
  children?: React.ReactNode
  className?: string
  depth: number
  href?: string
  icon?: any
  label?: any
  open: boolean
  title: string
}

const NavigationListItem = (props: NavigationListItemProp) => {
  const { title, href, depth, children, className, open: openProp, ...rest } = props

  const classes = useStyles()
  const [open, setOpen] = useState(openProp)

  const handleToggle = () => {
    setOpen(open => !open)
  }

  let paddingLeft = 8

  if (depth > 0) {
    paddingLeft = 32 + 8 * depth
  }

  const style = {
    paddingLeft,
  }

  if (children) {
    return (
      <ListItem {...rest} className={clsx(classes.item, className)} disableGutters>
        <Button className={classes.button} onClick={handleToggle} style={style}>
          <Typography variant='h3'>
            {title} {open ? '-' : '+'}{' '}
          </Typography>
        </Button>
        <Collapse in={open}>{children}</Collapse>
      </ListItem>
    )
  } else {
    return (
      <ListItem {...rest} className={clsx(classes.itemLeaf, className)} disableGutters>
        <Button className={clsx(classes.buttonLeaf, `depth-${depth}`)} style={style}>
          <Typography variant='h6'>{title} </Typography>
        </Button>
      </ListItem>
    )
  }
}

export default NavigationListItem
