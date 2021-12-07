import {
    GET_PROFILE,
    CREATE_PROFILE,
} from '../../../actions/common/UpdateProfileActions'

const initialState = []

const UpdateProfileReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_PROFILE: {
            return [...action.payload]
        }
        case CREATE_PROFILE: {
            return [...state,action.payload]
        }
        default: {
            return [...state]
        }
    }
}

export default UpdateProfileReducer
