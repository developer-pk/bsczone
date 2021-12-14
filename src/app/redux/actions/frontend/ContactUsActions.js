import axios from 'axios'
import {
    SERVICE_URL,
    DEFAULT_SERVICE_VERSION,
} from './../../../constants/utility'
import { toast } from 'material-react-toastify'

export const GET_CONTACT_US = 'GET_CONTACT_US'
export const CREATE_CONTACT_US = 'CREATE_CONTACT_US'
export const DELETE_CONTACT_US = 'DELETE_CONTACT_US'
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
            localStorage.setItem('accessToken', res.accessToken)
            localStorage.setItem('refreshToken', res.refreshToken)
        })
        .catch((error) => {})
}

export const getContactUs = () => (dispatch) => {
    axios
        .get(`${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/message', {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        })
        .then((res) => {
            dispatch({
                type: GET_CONTACT_US,
                payload: res.data,
            })
        })
        .catch((error) => {
            if (
                error.response.data.code == 401 &&
                error.response.data.message == 'jwt expired'
            ) {
                generateRefreshToken();
                
            } else {
                toast.error(error.response.data.errors[0].messages[0])
            }
        })
}

export const deleteContactUs = (id) => (dispatch) => {
    axios
        .delete(
            `${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/message/' + id,
            {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                },
            }
        )
        .then((res) => {
            if (res.status == 200) {
                toast.success(res.data.message)
            }
            dispatch({
                type: DELETE_CONTACT_US,
                payload: res.data,
            })
        })
        .catch((error) => {
            if (
                error.response.data.code == 401 &&
                error.response.data.message == 'jwt expired'
            ) {
                generateRefreshToken();
                
            } else {
                toast.error(error.response.data.errors[0].messages[0])
            }
        })
}

export const createContactUs = (contact) => (dispatch) => {
    axios
        .post(
            `${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/message',
            contact,
            { headers: { Authorization: 'Bearer ' + accessToken } }
        )
        .then((res) => {
            if (res.status == 201) {
                toast.success(res.data.message)
            }
            dispatch({
                type: CREATE_CONTACT_US,
                payload: res.data,
            })
        })
        .catch((error) => {
            if (
                error.response.data.code == 401 &&
                error.response.data.message == 'jwt expired'
            ) {
                generateRefreshToken();
                
            } else {
                toast.error(error.response.data.errors[0].messages[0])
            }
        })
}