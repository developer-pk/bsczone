import React from 'react'
import CollegeTable from './CollegeTable'
import { Breadcrumb, SimpleCard } from 'app/components'

const CollegeList = () => {
    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: 'College', path: '/college/list' },
                        { name: 'List' },
                    ]}
                />
            </div>
            <SimpleCard title="College">
                <CollegeTable />
            </SimpleCard>
        </div>
    )
}

export default CollegeList
