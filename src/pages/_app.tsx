import {QueryParamProvider} from 'use-query-params';
import NextAdapterApp from 'next-query-params/app';

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../../components/Layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryParamProvider adapter={NextAdapterApp}>
      <Layout> 
        <Component {...pageProps}/>
      </Layout>
    </QueryParamProvider>
    
  )
}
