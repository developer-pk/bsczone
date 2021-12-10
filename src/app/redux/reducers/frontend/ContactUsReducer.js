import {
    GET_CONTACT_US,
    CREATE_CONTACT_US,
    DELETE_CONTACT_US,
} from '../../actions/frontend/ContactUsActions'

const initialState = []

const ContactUsReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_CONTACT_US: {
            return [...action.payload]
        }
        case CREATE_CONTACT_US: {
            return [...state,action.payload]
        }
        case DELETE_CONTACT_US: {
            return [...state,action.payload]
        }
        default: {
            return [...state]
        }
    }
}

export default ContactUsReducer
