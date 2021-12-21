import {
    GET_ALERT,
    CREATE_ALERT,
    DELETE_ALERT,
    REMOVE_ALERT,
} from '../../actions/common/AlertActions'

const initialState = []

const AlertReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_ALERT: {
            return [...action.payload]
        }
        case CREATE_ALERT: {
            return [...state,action.payload]
        }
        case DELETE_ALERT: {
            return [...state,action.payload]
        }
        case REMOVE_ALERT: {
            return [...state,action.payload]
        }
        default: {
            return [...state]
        }
    }
}

export default AlertReducer
