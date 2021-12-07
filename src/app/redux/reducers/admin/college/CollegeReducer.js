import {
    GET_COLLEGE,
    CREATE_COLLEGE,
    DELETE_COLLEGE,
} from '../../../actions/admin/college/CollegeActions'

const initialState = []

const CollegeReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_COLLEGE: {
            return [...action.payload]
        }
        case CREATE_COLLEGE: {
            return [...state,action.payload]
        }
        case DELETE_COLLEGE: {
            return [...state,action.payload]
        }
        default: {
            return [...state]
        }
    }
}

export default CollegeReducer
