interface Event {
    action: string,
    data: EventData
}

interface EventData {
    type: string
    id: string
    geometry: EventGeometry
    properties: EventProperties
}

interface EventGeometry {
    type: string
    coordinates: number[]
}

interface EventProperties {
    lastupdate: Date
    magtype: string
    evtype: string
    lon: number
    auth: string
    lat: number
    depth: number
    mag: number
    time: Date
    source_id: string
    source_catalog: string
    flynn_region: string
    unid: string
}

export default Event