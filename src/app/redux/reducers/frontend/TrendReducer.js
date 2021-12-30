import {
    GET_TRENDS,
} from '../../actions/frontend/TokenApiActions'

const initialState = {data:{}}

const TrendReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_TRENDS: {
            return {...state, data: action.payload}
        }
        default: {
            return {...state}
        }
    }
}

export default TrendReducer
