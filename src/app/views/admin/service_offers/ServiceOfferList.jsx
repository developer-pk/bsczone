import React from 'react'
import ServiceOfferTable from './ServiceOfferTable'
import { Breadcrumb, SimpleCard } from 'app/components'

const ServiceOfferList = () => {
    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Service Offering', path: '/service_offering/list' },
                        { name: 'List' },
                    ]}
                />
            </div>
            <SimpleCard title="Service Offering">
                <ServiceOfferTable />
            </SimpleCard>
        </div>
    )
}

export default ServiceOfferList
