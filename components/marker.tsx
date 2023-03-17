import { FunctionComponent } from 'react'
import { Marker, Popup, useMap } from 'react-leaflet'
import { LatLng } from 'leaflet'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import SeismicEvent from '@/websocket/seismicevent'

import styles from '@/styles/Home.module.css'

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

        dayjs.extend(relativeTime)
        const t0ToNow = dayjs(properties.time).fromNow()
        const lastUpdateToNow = dayjs(properties.lastupdate).fromNow()

        return (
            <Marker position={latLng}>
                <Popup>
                    <div className={styles['simple-center']}>
                        <div className={styles['tooltip']}>
                            <b>{properties.auth}</b>
                            <span className={styles['tooltiptext']}>{properties.unid}</span>
                        </div>
                    </div>
                    <div className={styles['simple-center']}>
                        {properties.flynn_region}
                    </div>
                    <hr />
                    <table>
                        <tr>
                            <th>Mag:</th>
                            <th>{properties.mag} {properties.magtype}</th>
                        </tr>
                        <tr>
                            <th>Depth:</th>
                            <th>{properties.depth} km</th>
                        </tr>
                        <tr>
                            <th>T+0:</th>
                            <th>
                                <div className={styles['tooltip']}>
                                    <b>{t0ToNow}</b>
                                    <span className={styles['tooltiptext']}>{properties.time}</span>
                                </div>
                            </th>
                        </tr>
                        {
                            properties.time === properties.lastupdate ? null : (
                                <tr>
                                    <th>Last:</th>
                                    <th>
                                        <div className={styles['tooltip']}>
                                            <b>{lastUpdateToNow}</b>
                                            <span className={styles['tooltiptext']}>{properties.lastupdate}</span>
                                        </div>
                                    </th>
                                </tr>
                            )
                        }
                    </table>
                </Popup>
            </Marker>
        )
    } else {
        return null
    }
}

export default SeismicMarker