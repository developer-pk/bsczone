import {
    OTP_VERIFY,
} from '../../actions/frontend/OtpActions'

const initialState = []

const OtpReducer = function (state = initialState, action) {
    switch (action.type) {
        case OTP_VERIFY: {
            return [...action.payload]
        }
        default: {
            return [...state]
        }
    }
}

export default OtpReducer
