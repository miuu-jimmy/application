import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Fragment } from 'react'
import { NextPage } from 'next'
import NavBar from '../components/NavBar'
import MainPage from ".";

import {wrapper} from "../store/store";
import { SnackbarProvider } from "nextjs-toast";

function MyApp(props: AppProps) {

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover"
        />

        <link rel="icon" href="/favicon.ico" />
        //<link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
        <link rel="stylesheet" href="../styles/font.css"></link>
        <title>Music Payments</title>
      </Head>
      <NavBar/>
      <div className='App pt-16'>
      <SnackbarProvider SnackbarProps={{ autoHideDuration: 4000 }}>
        
        <App {...props} />
        
        </SnackbarProvider>
      </div>
      </>
  )
}

type NextPageWithLayout = NextPage & {
  Layout?: React.FC
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const Layout = Component.Layout || Fragment

  return (

    <Layout><Component {...pageProps} /></Layout>

  )
}

export default wrapper.withRedux(MyApp)
