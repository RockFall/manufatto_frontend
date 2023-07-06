import React, { useState, useEffect } from 'react'
import SwipeableViews from 'react-swipeable-views'
import { makeStyles, Theme, useTheme, withStyles, createStyles } from '@material-ui/core/styles'
import { 
  Box,
  Button,
  Divider, 
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  InputAdornment,
  Link,
  OutlinedInput,
  Tabs, 
  Tab, 
  TextField,
  Typography 
} from '@material-ui/core'
import { LoginForm, RegisterForm } from '../../components'
import validate from 'validate.js'

const DetailTabs = withStyles({
  root: {
    borderBottom: '2px solid',
  },
  indicator: {
    backgroundColor: 'black',
  },
})(Tabs)

interface DetailTabProps {
  label: string
}

const DetailTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'none',
      fontSize: '18px',
      width: '50%',
      marginRight: theme.spacing(1),
    }
  }),
)((props: DetailTabProps) => <Tab disableRipple {...props} />)

interface TabPanelProps {
  children?: React.ReactNode
  dir?: string
  index: any
  value: any
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
      react-swipeable-views
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '500px',
    //marginBottom: '4%',
    //marginTop: '2%',
    //padding:'0 19% 0 19%',
    boxSizing: 'border-box'
  }
}))

interface LoginTabsProps {
  //product: any
}

export default function LoginTabs(props: LoginTabsProps) {
  const classes = useStyles();
  const theme = useTheme();

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  const handleChangeIndex = (index: number) => {
    setValue(index)
  }

  const onSubmit = (user: any) => {
    //
    //
  }

  return (
    <div className={classes.root}>
      <DetailTabs value={value} onChange={handleChange}>
        <DetailTab label='Login' />
        <DetailTab label='Cadastrar' />
      </DetailTabs>
      <Divider />
      <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChangeIndex}>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <LoginForm onSubmit={onSubmit}/>
        </TabPanel>

        <TabPanel value={value} index={1} dir={theme.direction}>
          <RegisterForm onSubmit={onSubmit}/>
        </TabPanel>
      </SwipeableViews>
    </div>
  )
}
