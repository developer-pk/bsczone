import {
    ADD_FAVOURITE,
    REMOVE_FAVOURITE,
    GET_FAVOURITE_LIST,
} from '../../actions/frontend/TokenApiActions'

const initialState = []

const FavouriteReducer = function (state = initialState, action) {
    switch (action.type) {
        case ADD_FAVOURITE: {
            return [...state,action.payload]
        }case REMOVE_FAVOURITE: {
            return [...state,action.payload]
        }
        case GET_FAVOURITE_LIST: {
            return [...state,action.payload]
        }
        default: {
            return [...state]
        }
    }
}

export default FavouriteReducer
