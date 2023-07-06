import { createMuiTheme } from '@material-ui/core'
import { red } from '@material-ui/core/colors'

import overrides from './theme/overrides'

const theme = createMuiTheme({
  typography: {
    fontFamily: "Suisse Int\\'l, Roboto, Helvetica, Arial, sans-serif",
  },
  palette: {
    primary: {
      main: '#000',
    },
    secondary: {
      main: '#868686',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  overrides,
})

export default theme
