import { useEffect, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { SeismicEvent } from '@/websocket/seismicevent'
import SeismicMarker from './seismicmarker'

import 'leaflet/dist/leaflet.css'
import styles from '@/styles/Home.module.css'

const wsUrl = 'wss://www.seismicportal.eu/standing_order/websocket'

function SeismicMap() {
    const [ws, setWs] = useState<WebSocket>()
    const [events, setEvents] = useState<Map<string, SeismicEvent>>(new Map<string, SeismicEvent>())
    const [latestSeismicEvent, setLatestSeismicEvent] = useState<SeismicEvent | undefined>()

    useEffect(() => {
        if (!ws) {
            const newWs = new WebSocket(wsUrl)
            setWs(newWs)
        } else {
            ws.onopen = (ev: globalThis.Event) => {
                console.debug('websocket opened', ev)
                setEvents(new Map<string, SeismicEvent>())
            }
            ws.onmessage = (ev: MessageEvent<any>) => {
                console.debug('websocket new message', ev)
                const seismicEvent = JSON.parse(ev.data) as SeismicEvent
                if (seismicEvent.action === 'create' || seismicEvent.action === 'update') {
                    events.set(seismicEvent.data.id, seismicEvent)
                    setLatestSeismicEvent(seismicEvent)
                } else {
                    console.error('unrecognized action in message', seismicEvent)
                }
            }
            ws.onerror = (ev: globalThis.Event) => { console.debug('websocket error', ev) }
            ws.onclose = (ev: CloseEvent) => {
                console.debug('websocket closed', ev)
                setWs(undefined)
            }
        }
    }, [ws, setWs, events, latestSeismicEvent])

    return (
        <MapContainer className={styles.leaflet} center={[51.505, -0.09]} zoom={8} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <SeismicMarker seismicEvent={latestSeismicEvent} />
        </MapContainer>
    )
}

export default SeismicMap