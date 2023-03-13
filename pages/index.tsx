import Head from 'next/head'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
const SeismicMap = dynamic(() => import('../components/seismicmap'), { ssr: false })

import styles from '@/styles/Home.module.css'
//import { Inter } from 'next/font/google'
//const inter = Inter({ subsets: ['latin'] })

const ws_url = 'wss://www.seismicportal.eu/standing_order/websocket'

export default function Home() {
  const [ws, setWs] = useState<WebSocket>()
  const [events, setEvents] = useState<Event[]>()

  useEffect(() => {
    if (!ws) {
      const new_ws = new WebSocket(ws_url)
      setWs(new_ws)
    } else {
      ws.onopen = (ev: globalThis.Event) => {
        console.debug('websocket opened', ev)
        setEvents([])
      }
      ws.onmessage = (ev: MessageEvent<Event | string>) => {
        console.debug('websocket new message', ev)
      }
      ws.onerror = (ev: globalThis.Event) => { console.debug('websocket error', ev) }
      ws.onclose = (ev: CloseEvent) => {
        console.debug('websocket closed', ev)
        setWs(undefined)
      }
    }
  }, [ws, setWs])

  return (
    <>
      <Head>
        <title>Live Earthquake</title>
        <meta name="description" content="A near realtime earthquake monitoring app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SeismicMap />
    </>
  )
}
