import React from 'react'
import SwipeableViews from 'react-swipeable-views'
import { makeStyles, useTheme, withStyles, createStyles } from '@mui/styles'
import { Theme } from '@mui/material/styles';
import { Divider, Box, Tabs, Tab, Typography } from '@mui/material'
import { Product } from '../../../../../../generated/graphql'
const DetailTabs = withStyles({
  root: {
    borderBottom: '1px solid',
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
      width: '26%',
      marginRight: theme.spacing(1),
    },
  }),
)((props: DetailTabProps) => <Tab disableRipple {...props} />)

interface TabPanelProps {
  children?: React.ReactNode
  dir?: string
  index: number
  value: number
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
    //width: '400px',
    marginBottom: '4%',
    marginTop: '2%',
    padding:'0 19% 0 19%',
    [theme.breakpoints.between('md', 'xl')]: {
      padding:'0 19%',
    },
    [theme.breakpoints.up(1800)]: {
      padding:'0 24%',
    },
    [theme.breakpoints.up(2700)]: {
      padding:'0 33%',
    },
    boxSizing: 'border-box'
  },
}))

interface DetailsTabsProps {
  product: Product
}

export default function detailsTabs(props: DetailsTabsProps) {
  const classes = useStyles()
  const theme = useTheme()
  const [value, setValue] = React.useState(0)
  const { product } = props

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  const handleChangeIndex = (index: number) => {
    setValue(index)
  }

  return (
    <div className={classes.root}>
      <DetailTabs value={value} onChange={handleChange} aria-label='ant example'>
        <DetailTab label='Detalhes do produto' />
        <DetailTab label='Tamanhos e medidas' />
        <DetailTab label='Devoluções' />
      </DetailTabs>
      <Divider />
      <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChangeIndex}>
        <TabPanel value={value} index={0} dir={theme.direction}>
          {product.description}
        </TabPanel>

        <TabPanel value={value} index={1} dir={theme.direction}>
          ...
        </TabPanel>

        <TabPanel value={value} index={2} dir={theme.direction}>
          ...
        </TabPanel>
      </SwipeableViews>
    </div>
  )
}
