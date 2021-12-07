import React, { Component } from 'react'
import { Breadcrumb } from 'app/components'
import AddCompanyForm from './AddCompanyForm'
import { Card } from '@material-ui/core'

class AddCompany extends Component {
    render() {
        return (
            <div className="m-sm-30">
                <div className="mb-sm-30">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Company', path: '/company/list' },
                            { name: 'Add' },
                        ]}
                    />
                </div>
                <Card className="px-6 pt-2 pb-4">
                    <AddCompanyForm />
                </Card>
            </div>
        )
    }
}

export default AddCompany
