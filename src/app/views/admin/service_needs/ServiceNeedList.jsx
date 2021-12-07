import React from 'react'
import ServiceNeedTable from './ServiceNeedTable'
import { Breadcrumb, SimpleCard } from 'app/components'

const ServiceNeedList = () => {
    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Service Needs', path: '/service_need/list' },
                        { name: 'List' },
                    ]}
                />
            </div>
            <SimpleCard title="Service Needs">
                <ServiceNeedTable />
            </SimpleCard>
        </div>
    )
}

export default ServiceNeedList
