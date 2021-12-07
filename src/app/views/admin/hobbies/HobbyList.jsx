import React from 'react'
import HobbyTable from './HobbyTable'
import { Breadcrumb, SimpleCard } from 'app/components'

const HobbyList = () => {
    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Hobby', path: '/hobby/list' },
                        { name: 'List' },
                    ]}
                />
            </div>
            <SimpleCard title="Hobby">
                <HobbyTable />
            </SimpleCard>
        </div>
    )
}

export default HobbyList
