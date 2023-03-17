import { FunctionComponent } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { SeismicEventProperties } from '@/websocket/seismicevent'

import styles from '@/styles/Home.module.css'

interface SeismicInfoTableProps {
    properties: SeismicEventProperties
}

const SeismicInfoTable: FunctionComponent<SeismicInfoTableProps> = ({ properties }) => {
    dayjs.extend(relativeTime)
    const t0ToNow = dayjs(properties.time).fromNow()
    const lastUpdateToNow = dayjs(properties.lastupdate).fromNow()

    return (
        <table>
            <tbody>
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
            </tbody>
        </table>
    )
}

export default SeismicInfoTable
