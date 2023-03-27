import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Typography, Hidden, Select } from '@material-ui/core'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'

const useStyles = makeStyles(theme => ({
  root: {
  },
  menuText: {
    
  },
  menuButton: {
    width: '90%',
    display: 'flex',
    justifyContent: 'flex-start'
  },
  menuContainer: {
    width: theme.spacing(42),
  },
  menuMobileContainer: {
    margin: `${theme.spacing(2)}px 28px`,
  },
  buttonDivider: {
    borderBottom: '1px solid #E0E0E0',
    margin: `${theme.spacing(2)}px 0px`,
  },
  iconColor: {
    color: '#E0E0E0'
  },
  select: {
    
  }
}))

interface SelectionMenuProps{
    texts: any[],
    index: number,
    setIndex: any,
}

export default function SelectionMenu(props: SelectionMenuProps) {
  const {texts, index, setIndex, ...rest} = props
  const classes = useStyles()
  const handleIndexChange = (i) => {
    setIndex(i)
  }
  
  return (
    <div className={classes.root}>
        <Hidden smDown>
            <div className={classes.menuContainer}>
                {texts.map((t, i) => (
                    <React.Fragment>
                    <div key={i} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}> 
                        <Button className={classes.menuButton} onClick={() => handleIndexChange(i)}> 
                        <Typography align='left' className={classes.menuText} style={ index === i ? {fontWeight: 600} : {}} >
                            {t.title}
                        </Typography>
                        </Button>
                        {index === i ? <ArrowRightIcon className={classes.iconColor}/> : <div/>}
                    </div>
                    <div className={classes.buttonDivider}/>
                    </React.Fragment>
                ))}
            </div>
        </Hidden>
        <Hidden mdUp>
            <div className={classes.menuMobileContainer}>
                <Select
                    className={classes.select}
                    native
                    value={index}
                    onChange={(e)=> setIndex(e.target.value)}
                    label=""
                    fullWidth
                    variant='outlined'
                >
                    {texts.map((t, i) => <option value={i} > {t.title} </option> )}
                </Select>
            </div>
        </Hidden>
    </div>
  )
}
