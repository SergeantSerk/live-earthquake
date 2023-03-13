import { FunctionComponent, useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { Icon, IconOptions, LatLng } from 'leaflet'
import SeismicEvent from '@/websocket/seismicevent'

import 'leaflet/dist/leaflet.css'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
const MarkerIcon = new Icon<IconOptions>({ iconUrl: markerIcon.src })
import styles from '@/styles/Home.module.css'

const wsUrl = 'wss://www.seismicportal.eu/standing_order/websocket'

interface SeismicMarkerProps {
    seismicEvent: SeismicEvent | undefined
}

const SeismicMarker: FunctionComponent<SeismicMarkerProps> = ({ seismicEvent }) => {
    const map = useMap()
    if (seismicEvent) {
        const properties = seismicEvent.data.properties
        const latLng = new LatLng(properties.lat,
            properties.lon,
            properties.depth)
        map.flyTo(latLng, map.getZoom())

        return (
            <Marker icon={MarkerIcon} position={latLng}>
                <Popup>You are here</Popup>
            </Marker>
        )
    } else {
        return null
    }
}

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
                if (seismicEvent.action === 'create') {
                    if (!events.has(seismicEvent.data.id)) {
                        events.set(seismicEvent.data.id, seismicEvent)
                        setLatestSeismicEvent(seismicEvent)
                    } else {
                        console.error('tried to create an event that already exists', seismicEvent)
                    }
                } else if (seismicEvent.action === 'update') {
                    if (events.has(seismicEvent.data.id)) {
                        events.set(seismicEvent.data.id, seismicEvent)
                        setLatestSeismicEvent(seismicEvent)
                    } else {
                        console.error('tried to update an event that does not exist', seismicEvent)
                    }
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
        <MapContainer className={styles.leaflet} center={[51.505, -0.09]} zoom={6} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <SeismicMarker seismicEvent={latestSeismicEvent} />
        </MapContainer>
    )
}

export default SeismicMap