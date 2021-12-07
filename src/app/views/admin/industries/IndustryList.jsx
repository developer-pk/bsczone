import React from 'react'
import IndustryTable from './IndustryTable'
import { Breadcrumb, SimpleCard } from 'app/components'

const IndustryList = () => {
    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Industry', path: '/industry/list' },
                        { name: 'List' },
                    ]}
                />
            </div>
            <SimpleCard title="Industry">
                <IndustryTable />
            </SimpleCard>
        </div>
    )
}

export default IndustryList
