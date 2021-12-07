import {
    GET_SERVICE_OFFER,
    CREATE_SERVICE_OFFER,
    DELETE_SERVICE_OFFER,
} from '../../../actions/admin/service_offer/ServiceOfferActions'

const initialState = []

const ServiceOfferReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_SERVICE_OFFER: {
            return [...action.payload]
        }
        case CREATE_SERVICE_OFFER: {
            return [...state,action.payload]
        }
        case DELETE_SERVICE_OFFER: {
            return [...state,action.payload]
        }
        default: {
            return [...state]
        }
    }
}

export default ServiceOfferReducer
