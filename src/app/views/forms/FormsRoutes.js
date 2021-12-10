import React from 'react'
import JwtRegisterNextStep from '../sessions/register/JwtRegisterNextStep'
import JwtRegisterNextStep1 from '../sessions/register/JwtRegisterNextStep1'
import JwtRegisterNextStep2 from '../sessions/register/JwtRegisterNextStep2'
import JwtRegisterNextStep3 from '../sessions/register/JwtRegisterNextStep3'
import JwtRegisterNextStep4 from '../sessions/register/JwtRegisterNextStep4'
import AddCompany from '../admin/companies/AddCompany'
import CompanyList from '../admin/companies/CompanyList'
import AddServiceNeed from '../admin/service_needs/AddServiceNeed'
import ServiceNeedList from '../admin/service_needs/ServiceNeedList'
import AddServiceOffer from '../admin/service_offers/AddServiceOffer'
import ServiceOfferList from '../admin/service_offers/ServiceOfferList'
import AddCollege from '../admin/colleges/AddCollege'
import CollegeList from '../admin/colleges/CollegeList'
import AdsList from '../admin/ads/AdsList'
import AddAds from '../admin/ads/AddAds'
import AlertList from '../admin/alerts/AlertList'
import ContactList from '../admin/contacts/ContactList'

const formsRoutes = [
    {
        path: '/forms/basic',
        component: React.lazy(() => import('./BasicForm')),
    },
    {
        path: '/forms/editor',
        component: React.lazy(() => import('./EditorForm')),
    },
    {
        path: '/forms/upload',
        component: React.lazy(() => import('./UploadForm')),
    },
    {
        path: '/industry/add',
        component: React.lazy(() => import('../admin/industries/AddIndustry')),
    },
    {
        path: '/industry/list',
        component: React.lazy(() => import('../admin/industries/IndustryList')),
    },
    {
        path: '/industry/edit',
        component: React.lazy(() => import('../admin/industries/EditIndustry')),
    },
    {
        path: '/job-title/list',
        component: React.lazy(() => import('../admin/jobtitles/JobTitleList')),
    },
    {
        path: '/job-title/add',
        component: React.lazy(() => import('../admin/jobtitles/AddJobTitle')),
    },
    {
        path: '/job-title/add',
        component: React.lazy(() => import('../admin/jobtitles/AddJobTitle')),
    },
    {
        path: '/session/signup-step-2',
        component: JwtRegisterNextStep,
    },
    {
        path: '/session/signup-step-3',
        component: JwtRegisterNextStep1,
    },
    {
        path: '/session/signup-step-4',
        component: JwtRegisterNextStep2,
    },
    {
        path: '/session/signup-step-5',
        component: JwtRegisterNextStep3,
    },
    {
        path: '/session/signup-step-6',
        component: JwtRegisterNextStep4,
    },
    {
        path: '/hobby/add',
        component: React.lazy(() => import('../admin/hobbies/AddHobby')),
    },
    {
        path: '/hobby/list',
        component: React.lazy(() => import('../admin/hobbies/HobbyList')),
    },
    {
        path: '/company/add',
        component: AddCompany,
    },
    {
        path: '/company/list',
        component: CompanyList,
    },
    {
        path: '/service_need/add',
        component: AddServiceNeed,
    },
    {
        path: '/service_need/list',
        component: ServiceNeedList,
    },
    {
        path: '/service_offering/add',
        component: AddServiceOffer,
    },
    {
        path: '/service_offering/list',
        component: ServiceOfferList,
    },
    {
        path: '/college/add',
        component: AddCollege,
    },
    {
        path: '/college/list',
        component: CollegeList,
    },
    {
        path: '/ads/list',
        component: AdsList,
    },
    {
        path: '/ads/add',
        component: AddAds,
    },
    {
        path: '/alert/list',
        component: AlertList,
    },
    {
        path: '/contacts/list',
        component: ContactList,
    },
]

export default formsRoutes
