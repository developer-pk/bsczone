import {
    GET_TCAKE,
} from '../../actions/frontend/TokenApiActions'

const initialState = {data:[]}

const TcakeReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_TCAKE: {
            return {...state,data:action.payload}
        }
        default: {
            return {...state}
        }
    }
}

export default TcakeReducer