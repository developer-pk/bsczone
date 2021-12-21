import {
    ADD_FAVOURITE,
} from '../../actions/frontend/TokenApiActions'

const initialState = []

const FavouriteReducer = function (state = initialState, action) {
    switch (action.type) {
        case ADD_FAVOURITE: {
            return [...state,action.payload]
        }
        default: {
            return [...state]
        }
    }
}

export default FavouriteReducer
