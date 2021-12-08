import React from 'react'
import AlertTable from './AlertTable'
import { Breadcrumb, SimpleCard } from 'app/components'

const AlertList = () => {
    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Alerts', path: '/alert/list' },
                        { name: 'List' },
                    ]}
                />
            </div>
            <SimpleCard title="Alerts">
                <AlertTable />
            </SimpleCard>
        </div>
    )
}

export default AlertList
