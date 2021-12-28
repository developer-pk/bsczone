import {
    GET_TOKEN_SYMBOL,
} from '../../actions/frontend/TokenApiActions'

const initialState = []

const TokenApiReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_TOKEN_SYMBOL: {
            return [...state,action.payload]
        }
        default: {
            return [...state]
        }
    }
}

export default TokenApiReducer
