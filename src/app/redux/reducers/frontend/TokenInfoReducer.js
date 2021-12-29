import {
    GET_TOKEN_INFO,
} from '../../actions/frontend/TokenApiActions'

const initialState = {data:{}}

const TokenInfoReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_TOKEN_INFO: {
            return {...state, data: action.payload}
        }
        default: {
            return {...state}
        }
    }
}

export default TokenInfoReducer
