import React, { Component } from 'react'
import { Breadcrumb } from 'app/components'
import EditForm from './EditForm'
import { Card } from '@material-ui/core'

class EditIndustry extends Component {
    render() {
        return (
            <div className="m-sm-30">
                <div className="mb-sm-30">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Industry', path: '/industry/list' },
                            { name: 'Edit' },
                        ]}
                    />
                </div>
                <Card className="px-6 pt-2 pb-4">
                    <EditForm />
                </Card>
            </div>
        )
    }
}

export default EditIndustry
