import axios from 'axios'
import {
    SERVICE_URL,
    DEFAULT_SERVICE_VERSION,
} from './../../../constants/utility'
import { toast } from 'material-react-toastify'

export const FORGOT_PASSWORD = 'FORGOT_PASSWORD'
export const RESET_PASSWORD = 'RESET_PASSWORD'
const accessToken = window.localStorage.getItem('accessToken')
const refreshToken = window.localStorage.getItem('refreshToken')
const email = window.localStorage.getItem('email')

export const generateRefreshToken = () =>{
    axios
        .post(
            `${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/auth/refresh-token',
            { email: email, refreshToken: refreshToken }
        )
        .then((res) => {
            console.log(res, 'get token response ')
            localStorage.setItem('accessToken', res.data.accessToken)
            localStorage.setItem('refreshToken', res.data.refreshToken)
        })
        .catch((error) => {})
}

export const forgotPassword = (email) => (dispatch) => {
    axios
        .post(`${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/auth/send-password-reset', email, {
        })
        .then((res) => {
            console.log(res.status,'forgot');
            if (res.status == 201 || res.status == 200) {
                toast.success('Reset Password Email Link has been sent.Kindly check your email.')
            }
            dispatch({
                type: FORGOT_PASSWORD,
                payload: res.data,
            })
        })
        .catch((error) => {
            if (
                error.response.data.code == 401 &&
                error.response.data.message == 'jwt expired'
            ) {
                generateRefreshToken();
                
            } else if (error.response.status == 400) {
                if(error.response.data.errors){
                    toast.error(error.response.data.errors[0].messages[0])
                }else{
                    toast.error(error.response.data.message)
                }
                
            } else {
                toast.error(error.response.data.errors[0].messages[0])
            }
        })
}

export const resetPassword = (password) => (dispatch) => {
    axios
        .post(`${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/auth/reset-password', password, {
        })
        .then((res) => {
            console.log(res.status,'forgot');
            if (res.status == 201 || res.status == 200) {
                toast.success('Password reset successfully.')
            }
            dispatch({
                type: RESET_PASSWORD,
                payload: res.data,
            })
        })
        .catch((error) => {
            if (
                error.response.data.code == 401 &&
                error.response.data.message == 'jwt expired'
            ) {
                generateRefreshToken();
                
            } else if (error.response.status == 400) {
                if(error.response.data.errors){
                    toast.error(error.response.data.errors[0].messages[0])
                }else{
                    toast.error(error.response.data.message)
                }
                
            } else {
                toast.error(error.response.data.errors[0].messages[0])
            }
        })
}


