import {
    GET_COUNTRY,
    GET_STATE,
    GET_CITY,
} from '../../actions/common/CountryActions'

const initialState = []

const CountryReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_COUNTRY: {
            return [...action.payload]
        }
        case GET_STATE: {
            return [action.payload]
        }
        case GET_CITY: {
            return [action.payload]
        }
        default: {
            return [...state]
        }
    }
}

export default CountryReducer
