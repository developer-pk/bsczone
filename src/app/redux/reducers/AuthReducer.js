import {
    LOGIN,
    REGISTER,
} from '../actions/AuthActions'

const initialState = []

const AuthReducer = function (state = initialState, action) {
    switch (action.type) {
        case LOGIN: {
            return [...action.payload]
        }
        case REGISTER: {
            return [...action.payload]
        }
        default: {
            return [...state]
        }
    }
}

export default AuthReducer
