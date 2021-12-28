import {
    GET_TOKEN_OTHER_INFO,
} from '../../actions/frontend/TokenApiActions'

const initialState = []

const TokenOtherInfoReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_TOKEN_OTHER_INFO: {

            return [action.payload]
        }
        default: {
            return [...state]
        }
    }
}

export default TokenOtherInfoReducer
