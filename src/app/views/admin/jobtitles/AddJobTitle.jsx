import React, { Component } from 'react'
import { Breadcrumb } from 'app/components'
import AddJobForm from './AddJobForm'
import { Card } from '@material-ui/core'

class AddJobTitle extends Component {
    render() {
        return (
            <div className="m-sm-30">
                <div className="mb-sm-30">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Job Title', path: '/job-title/list' },
                            { name: 'Add' },
                        ]}
                    />
                </div>
                <Card className="px-6 pt-2 pb-4">
                    <AddJobForm />
                </Card>
            </div>
        )
    }
}

export default AddJobTitle
