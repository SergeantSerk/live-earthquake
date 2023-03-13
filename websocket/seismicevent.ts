interface SeismicEvent {
    action: string,
    data: SeismicEventData
}

interface SeismicEventData {
    type: string
    id: string
    geometry: SeismicEventGeometry
    properties: SeismicEventProperties
}

interface SeismicEventGeometry {
    type: string
    coordinates: number[]
}

interface SeismicEventProperties {
    lastupdate: string
    magtype: string
    evtype: string
    lon: number
    auth: string
    lat: number
    depth: number
    mag: number
    time: string
    source_id: string
    source_catalog: string
    flynn_region: string
    unid: string
}

export default SeismicEvent