import {
    GET_ALERT_TOKEN_INFO,
} from '../../actions/frontend/TokenApiActions'

const initialState = []

const AlertTokenReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_ALERT_TOKEN_INFO: {
            return [...action.payload]
        }
        default: {
            return [...state]
        }
    }
}

export default AlertTokenReducer
