import { FunctionComponent } from "react"
import { Popup } from "react-leaflet"
import SeismicInfoTable from "./seismicinfotable"
import { SeismicEventProperties } from "@/websocket/seismicevent"

import styles from '@/styles/Home.module.css'

interface SeismicMarkerPopupProps {
    properties: SeismicEventProperties
}

const SeismicMarkerPopup: FunctionComponent<SeismicMarkerPopupProps> = ({ properties }) => {
    return (
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
            <SeismicInfoTable properties={properties}/>
        </Popup>
    )
}

export default SeismicMarkerPopup
