import {
    GET_STATE,
} from '../../actions/common/StateActions'

const initialState = []

const StateReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_STATE: {
            return [action.payload]
        }
        default: {
            return [...state]
        }
    }
}

export default StateReducer
