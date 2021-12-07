import {
    GET_ADS,
    CREATE_ADS,
    DELETE_ADS,
} from '../../../actions/admin/ads/AdsActions'

const initialState = []

const AdsReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_ADS: {
            return [...action.payload]
        }
        case CREATE_ADS: {
            return [...state,action.payload]
        }
        case DELETE_ADS: {
            return [...state,action.payload]
        }
        default: {
            return [...state]
        }
    }
}

export default AdsReducer
