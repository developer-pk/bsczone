import React, { Component } from 'react'
import { Breadcrumb } from 'app/components'
import AddHobbyForm from './AddHobbyForm'
import { Card } from '@material-ui/core'

class AddHobby extends Component {
    render() {
        return (
            <div className="m-sm-30">
                <div className="mb-sm-30">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Hobby', path: '/hobby/list' },
                            { name: 'Add' },
                        ]}
                    />
                </div>
                <Card className="px-6 pt-2 pb-4">
                    <AddHobbyForm />
                </Card>
            </div>
        )
    }
}

export default AddHobby
