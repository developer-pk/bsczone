import {
    FORGOT_PASSWORD,
} from '../../actions/frontend/ForgotPasswordActions'

const initialState = []

const ForgotPasswordReducer = function (state = initialState, action) {
    switch (action.type) {
        case FORGOT_PASSWORD: {
            return [...state,action.payload]
        }
        default: {
            return [...state]
        }
    }
}

export default ForgotPasswordReducer
