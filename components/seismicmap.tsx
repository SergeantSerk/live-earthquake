import { MapContainer, TileLayer, useMap } from 'react-leaflet'

function SeismicMap() {
    return (
        <MapContainer center={[51.505, -0.09]} zoom={1} scrollWheelZoom={true}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    )
}

export default SeismicMap