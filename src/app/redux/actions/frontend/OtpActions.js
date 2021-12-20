import axios from 'axios'
import {
    SERVICE_URL,
    DEFAULT_SERVICE_VERSION,
} from './../../../constants/utility'
import { toast } from 'material-react-toastify'
import history from 'history.js'

export const OTP_VERIFY = 'OTP_VERIFY'
export const OTP_RESEND = 'OTP_RESEND'
const accessToken = window.localStorage.getItem('accessToken')
const refreshToken = window.localStorage.getItem('refreshToken')
const email = window.localStorage.getItem('email')

export const generateRefreshToken = () => {
    axios
        .post(
            `${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/auth/refresh-token',
            { email: email, refreshToken: refreshToken }
        )
        .then((res) => {
            console.log(res, 'get token response ')
            localStorage.setItem('accessToken', res.accessToken)
            localStorage.setItem('refreshToken', res.refreshToken)
        })
        .catch((error) => {})
}

export const verifyOtp = (otp) => (dispatch) => {
    axios
        .post(
            `${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/otp/verify',
            otp,
            {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                },
            }
        )
        .then((res) => {
            if (res.status == 201 || res.status == 200) {
                toast.success(res.data.message)
                history.push('/home');
            }
            dispatch({
                type: OTP_VERIFY,
                payload: res.data,
            })
        })
        .catch((error) => {console.log(error,'error found');
            if(error){
                if (
                    error.response.data.code == 401 &&
                    (error.response.data.message == 'jwt expired' ||
                        error.response.data.message == 'jwt malformed')
                ) {
                    generateRefreshToken()
                } else if (error.response.status == 400) {
                    toast.error(error.response.data.message)
                } else {
                    toast.error(error.response.data.errors[0].messages[0])
                }
            }
           
        })
}

export const resendOtp = () => (dispatch) => {
    axios
        .get(
            `${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/otp/resendOtp',
            {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                },
            }
        )
        .then((res) => {
            if (res.status == 201 || res.status == 200) {
                toast.success(res.data.message)
            }
            dispatch({
                type: OTP_RESEND,
                payload: res.data,
            })
        })
        .catch((error) => {
            if (
                error.response.data.code == 401 &&
                (error.response.data.message == 'jwt expired' ||
                    error.response.data.message == 'jwt malformed')
            ) {
                generateRefreshToken()
            } else if (
                error.response.data.message == 'OTP not correct, Try Again'
            ) {
                toast.error(error.response.data.message)
            } else {
                toast.error(error.response.data.errors[0].messages[0])
            }
        })
}
