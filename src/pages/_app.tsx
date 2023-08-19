import { QueryParamProvider } from 'use-query-params';

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../../components/Layout';
import { ComponentProps } from 'react';
import { NextAdapter } from 'next-query-params';


function Adapter(props: ComponentProps<typeof NextAdapter>) {
  return <NextAdapter {...props} shallow={true} />;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryParamProvider adapter={Adapter}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryParamProvider>

  )
}
