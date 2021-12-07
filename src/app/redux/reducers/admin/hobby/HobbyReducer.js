import {
    GET_HOBBY,
    CREATE_HOBBY,
    DELETE_HOBBY,
} from '../../../actions/admin/hobby/HobbyActions'

const initialState = []

const HobbyReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_HOBBY: {
            return [...action.payload]
        }
        case CREATE_HOBBY: {
            return [...state,action.payload]
        }
        case DELETE_HOBBY: {
            return [...state,action.payload]
        }
        default: {
            return [...state]
        }
    }
}

export default HobbyReducer
