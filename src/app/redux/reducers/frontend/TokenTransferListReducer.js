import {
    GET_TOKEN_TRANSFER_LIST,
} from '../../actions/frontend/TokenApiActions'

const initialState = {}

const TokenTransferListReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_TOKEN_TRANSFER_LIST: {
            return {...state,data:action.payload}
        }
        default: {
            return {...state}
        }
    }
}

export default TokenTransferListReducer
