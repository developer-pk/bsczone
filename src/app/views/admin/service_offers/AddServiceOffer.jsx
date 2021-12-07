import React, { Component } from 'react'
import { Breadcrumb } from 'app/components'
import AddServiceOfferForm from './AddServiceOfferForm'
import { Card } from '@material-ui/core'

class AddServiceOffer extends Component {
    render() {
        return (
            <div className="m-sm-30">
                <div className="mb-sm-30">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Service Offering', path: '/service_offering/list' },
                            { name: 'Add' },
                        ]}
                    />
                </div>
                <Card className="px-6 pt-2 pb-4">
                    <AddServiceOfferForm />
                </Card>
            </div>
        )
    }
}

export default AddServiceOffer
