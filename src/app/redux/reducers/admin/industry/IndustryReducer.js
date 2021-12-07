import {
    GET_INDUSTRY,
    CREATE_INDUSTRY,
    DELETE_INDUSTRY,
} from '../../../actions/admin/industry/IndustryActions'

const initialState = []

const IndustryReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_INDUSTRY: {
            return [...action.payload]
        }
        case CREATE_INDUSTRY: {
            return [...state,action.payload]
        }
        case DELETE_INDUSTRY: {
            return [...state,action.payload]
        }
        default: {
            return [...state]
        }
    }
}

export default IndustryReducer
