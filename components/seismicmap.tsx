import { MapContainer, TileLayer, useMap } from 'react-leaflet'

import styles from '@/styles/Home.module.css'

function SeismicMap() {
    return (
        <MapContainer className={styles.leaflet} center={[51.505, -0.09]} zoom={6} scrollWheelZoom={true}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    )
}

export default SeismicMap