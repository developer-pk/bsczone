import {
    GET_ALERT_TOKEN_INFO,
} from '../../actions/frontend/TokenApiActions'
import {
    REMOVE_ALERT,
} from '../../actions/common/AlertActions'
const initialState = []

const AlertTokenReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_ALERT_TOKEN_INFO: {
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

export default AlertTokenReducer
