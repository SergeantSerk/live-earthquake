import { FunctionComponent } from 'react'
import { Circle, Marker, useMap } from 'react-leaflet'
import { LatLng } from 'leaflet'
import { SeismicEvent } from '@/websocket/seismicevent'

import SeismicMarkerPopup from '../seismic/seismicmarkerpopup'

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

        const circleRadius = Math.pow(properties.mag, 2) * 2000
        return (
            <Marker position={latLng}>
                <SeismicMarkerPopup properties={properties}/>
                <Circle center={latLng} radius={circleRadius} pathOptions={{ color: 'darkRed', fillColor: 'red', }} />
            </Marker>
        )
    } else {
        return null
    }
}

export default SeismicMarker