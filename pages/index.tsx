import Head from 'next/head'
import dynamic from 'next/dynamic'
const SeismicMap = dynamic(() => import('../components/seismic/seismicmap'), { ssr: false })

import styles from '@/styles/Home.module.css'
//import { Inter } from 'next/font/google'
//const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Live Earthquake</title>
        <meta name="description" content="A near-realtime earthquake monitoring app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SeismicMap />
    </>
  )
}
