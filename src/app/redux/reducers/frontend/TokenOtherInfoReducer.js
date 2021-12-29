import {
    GET_TOKEN_OTHER_INFO,
} from '../../actions/frontend/TokenApiActions'

const initialState = {data:{}}

const TokenOtherInfoReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_TOKEN_OTHER_INFO: {
//console.log(action.payload,'anj');
            return {...state, data: action.payload}
        }
        default: {
            return {...state}
        }
    }
}

export default TokenOtherInfoReducer
