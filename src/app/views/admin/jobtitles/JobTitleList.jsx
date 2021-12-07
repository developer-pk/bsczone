import React from 'react'
import JobTitleTable from './JobTitleTable'
import { Breadcrumb, SimpleCard } from 'app/components'

const JobTitleList = () => {
    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Job Title', path: '/job-title/list' },
                        { name: 'List' },
                    ]}
                />
            </div>
            <SimpleCard title="Job Title">
                <JobTitleTable />
            </SimpleCard>
        </div>
    )
}

export default JobTitleList
