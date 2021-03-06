import React, { Component } from 'react'
import { Breadcrumb } from 'app/components'
import AddForm from './AddForm'
import { Card } from '@material-ui/core'

class AddIndustry extends Component {
    render() {
        return (
            <div className="m-sm-30">
                <div className="mb-sm-30">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Industry', path: '/industry/list' },
                            { name: 'Add' },
                        ]}
                    />
                </div>
                <Card className="px-6 pt-2 pb-4">
                    <AddForm />
                </Card>
            </div>
        )
    }
}

export default AddIndustry
