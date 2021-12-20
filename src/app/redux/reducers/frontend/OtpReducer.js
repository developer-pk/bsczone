import {
    OTP_VERIFY,
    OTP_RESEND,
} from '../../actions/frontend/OtpActions'

const initialState = []

const OtpReducer = function (state = initialState, action) {
    switch (action.type) {
        case OTP_VERIFY: {
            return [...state,action.payload]
        }
        case OTP_RESEND: {
            return [...state,action.payload]
        }
        default: {
            return [...state]
        }
    }
}

export default OtpReducer
