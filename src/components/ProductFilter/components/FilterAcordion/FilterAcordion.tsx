import React, { useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@mui/styles'
import { Button, Typography } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: '14px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '356px',
  },
  button: {
    fontFamily: "Suisse Int\\'l",
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '20px',
    lineHeight: '32px',
    color: '#1d1d1f',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    textTransform: 'none',
  },
  iconColor: {
    color: '#6F6C6B',
    marginLeft: '0px',
  },
  title: {
    marginLeft: '10px',
  },
}))

interface FilterAcordionProps {
  children?: any
  title: string
  expanded?: boolean
  className?: string
}

const FilterAcordion = (props: FilterAcordionProps) => {
  const { expanded, children, className, title, ...rest } = props
  const classes = useStyles()
  const [isExpanded, setIsExpanded] = useState(expanded)

  return (
    <div className={clsx(classes.root, className)}>
      <Button onClick={() => setIsExpanded(!isExpanded)} className={classes.button}>
        {isExpanded ? <ArrowDropDownIcon className={classes.iconColor} /> : <ArrowRightIcon className={classes.iconColor} />}
        <Typography className={classes.title} style={{ fontFamily: 'Akshar' }}>{title}</Typography>
      </Button>
      {isExpanded ? children : <React.Fragment />}
    </div>
  )
}

export default FilterAcordion
