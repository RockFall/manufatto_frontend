import '../../styles/globals.sass'
import { Provider } from 'react-redux'
import { useStore } from '../store'
import ShopLayout from '../layouts/ShopLayout'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import '../components/BannerCarousel/BannerCarousel.css'
import { PersistGate } from 'redux-persist/integration/react';
import React from 'react'
import Head from 'next/head'
import { ThemeProvider, Theme, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'
import theme from '../theme'


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


export default function MyApp(props: any) {
  const { Component, pageProps } = props
  const {store, persistor} = useStore(pageProps.initialReduxState)
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>Manufatto</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />

        {/* Só por enquanto.. */}
        <script src='https://assets.pagar.me/checkout/1.1.0/checkout.js'></script>
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <ShopLayout>
                <Component {...pageProps} />
              </ShopLayout>
            </ThemeProvider>
          </StyledEngineProvider>
        </PersistGate>
      </Provider>
    </React.Fragment>
  );
}
