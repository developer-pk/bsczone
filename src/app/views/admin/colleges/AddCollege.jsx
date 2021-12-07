import React, { Component } from 'react'
import { Breadcrumb } from 'app/components'
import AddCollegeForm from './AddCollegeForm'
import { Card } from '@material-ui/core'

class AddCollege extends Component {
    render() {
        return (
            <div className="m-sm-30">
                <div className="mb-sm-30">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'College', path: '/college/list' },
                            { name: 'Add' },
                        ]}
                    />
                </div>
                <Card className="px-6 pt-2 pb-4">
                    <AddCollegeForm />
                </Card>
            </div>
        )
    }
}

export default AddCollege
