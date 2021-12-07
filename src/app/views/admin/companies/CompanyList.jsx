import React from 'react'
import CompanyTable from './CompanyTable'
import { Breadcrumb, SimpleCard } from 'app/components'

const CompanyList = () => {
    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Company', path: '/company/list' },
                        { name: 'List' },
                    ]}
                />
            </div>
            <SimpleCard title="Company">
                <CompanyTable />
            </SimpleCard>
        </div>
    )
}

export default CompanyList
