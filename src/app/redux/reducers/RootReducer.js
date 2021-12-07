import { combineReducers } from 'redux'
import ScrumBoardReducer from './ScrumBoardReducer'
import NotificationReducer from './NotificationReducer'
import EcommerceReducer from './EcommerceReducer'
import NavigationReducer from './NavigationReducer'
import AuthReducer from './AuthReducer'
import IndustryReducer from './admin/industry/IndustryReducer'
import JobTitleReducer from './admin/jobtitle/JobTitleReducer'
import CountryReducer from './common/CountryReducer'
import StateReducer from './common/StateReducer'
import CityReducer from './common/CityReducer'
import HobbyReducer from './admin/hobby/HobbyReducer'
import CompanyReducer from './admin/company/CompanyReducer'
import ServiceNeedReducer from './admin/service_need/ServiceNeedReducer'
import ServiceOfferReducer from './admin/service_offer/ServiceOfferReducer'
import CollegeReducer from './admin/college/CollegeReducer'
import AdsReducer from './admin/ads/AdsReducer'

const RootReducer = combineReducers({
    notifications: NotificationReducer,
    navigations: NavigationReducer,
    scrumboard: ScrumBoardReducer,
    ecommerce: EcommerceReducer,
    auth:AuthReducer,
    industry:IndustryReducer,
    jobtitle:JobTitleReducer,
    country:CountryReducer,
    states:StateReducer,
    city:CityReducer,
    hobby:HobbyReducer,
    company:CompanyReducer,
    serviceneeds:ServiceNeedReducer,
    serviceoffering:ServiceOfferReducer,
    college:CollegeReducer,
    ads:AdsReducer,
})

export default RootReducer
