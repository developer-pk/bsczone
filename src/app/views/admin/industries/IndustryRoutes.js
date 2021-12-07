import React from 'react'
import AddForm from './AddIndustry'

const IndustryRoutes = [
    {
        path: '/industry/add',
        component: React.lazy(() => AddForm),
    },
]

export default IndustryRoutes
