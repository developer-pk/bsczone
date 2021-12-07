import React, { Component } from 'react'
import { Breadcrumb } from 'app/components'
import AddServiceNeedForm from './AddServiceNeedForm'
import { Card } from '@material-ui/core'

class AddServiceNeed extends Component {
    render() {
        return (
            <div className="m-sm-30">
                <div className="mb-sm-30">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Service Needs', path: '/service_need/list' },
                            { name: 'Add' },
                        ]}
                    />
                </div>
                <Card className="px-6 pt-2 pb-4">
                    <AddServiceNeedForm />
                </Card>
            </div>
        )
    }
}

export default AddServiceNeed
