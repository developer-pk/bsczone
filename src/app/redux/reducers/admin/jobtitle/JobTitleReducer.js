import {
    GET_JOBTITLE,
    CREATE_JOBTITLE,
    DELETE_JOBTITLE,
} from '../../../actions/admin/jobtitle/JobTitleActions'

const initialState = []

const JobTitleReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_JOBTITLE: {
            return [...action.payload]
        }
        case CREATE_JOBTITLE: {
            return [...state,action.payload]
        }
        case DELETE_JOBTITLE: {
            return [...state,action.payload]
        }
        default: {
            return [...state]
        }
    }
}

export default JobTitleReducer
