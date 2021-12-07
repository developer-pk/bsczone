import {
    GET_COMPANY,
    CREATE_COMPANY,
    DELETE_COMPANY,
} from '../../../actions/admin/company/CompanyActions'

const initialState = []

const CompanyReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_COMPANY: {
            return [...action.payload]
        }
        case CREATE_COMPANY: {
            return [...state,action.payload]
        }
        case DELETE_COMPANY: {
            return [...state,action.payload]
        }
        default: {
            return [...state]
        }
    }
}

export default CompanyReducer
