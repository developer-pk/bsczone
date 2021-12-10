import React from 'react'
import ContactTable from './ContactTable'
import { Breadcrumb, SimpleCard } from 'app/components'

const ContactList = () => {
    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Contact Us', path: '/contacts/list' },
                        { name: 'List' },
                    ]}
                />
            </div>
            <SimpleCard title="Contact Us">
               <ContactTable />
            </SimpleCard>
        </div>
    )
}

export default ContactList
