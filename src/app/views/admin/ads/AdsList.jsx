import React from 'react'
import AdsTable from './AdsTable'
import { Breadcrumb, SimpleCard } from 'app/components'

const AdsList = () => {
    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Ads', path: '/ads/list' },
                        { name: 'List' },
                    ]}
                />
            </div>
            <SimpleCard title="Ads">
                <AdsTable />
            </SimpleCard>
        </div>
    )
}

export default AdsList
