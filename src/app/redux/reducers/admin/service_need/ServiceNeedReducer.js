import {
    GET_SERVICE_NEED,
    CREATE_SERVICE_NEED,
    DELETE_SERVICE_NEED,
} from '../../../actions/admin/service_need/ServiceNeedActions'

const initialState = []

const ServiceNeedReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_SERVICE_NEED: {
            return [...action.payload]
        }
        case CREATE_SERVICE_NEED: {
            return [...state,action.payload]
        }
        case DELETE_SERVICE_NEED: {
            return [...state,action.payload]
        }
        default: {
            return [...state]
        }
    }
}

export default ServiceNeedReducer
