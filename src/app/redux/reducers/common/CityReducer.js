import {
    GET_CITY,
} from '../../actions/common/CityActions'

const initialState = []

const CityReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_CITY: {
            return [action.payload]
        }
        default: {
            return [...state]
        }
    }
}

export default CityReducer
