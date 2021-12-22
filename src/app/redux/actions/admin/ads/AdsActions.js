import axios from 'axios'
import {
    SERVICE_URL,
    DEFAULT_SERVICE_VERSION,
} from './../../../../constants/utility'
import { toast } from 'material-react-toastify'
export const GET_ADS = 'GET_ADS'
export const CREATE_ADS = 'CREATE_ADS'
export const DELETE_ADS = 'DELETE_ADS'
const accessToken = window.localStorage.getItem('accessToken')
const refreshToken = window.localStorage.getItem('refreshToken')
const email = window.localStorage.getItem('email')

export const generateRefreshToken = () => (dispatch) => {
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

export const getAds = () => (dispatch) => {
    axios
        .get(`${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/ads', {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        })
        .then((res) => {
            console.log(res, 'get list response ')
            dispatch({
                type: GET_ADS,
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

export const deleteAds = (id) => (dispatch) => {
    axios
        .delete(`${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/ads/' + id, {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        })
        .then((res) => {
            if (res.status == 200) {
                toast.success(res.data.message)
            }
            console.log(res, 'get delete response ')
            dispatch({
                type: DELETE_ADS,
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

export const createAds = (ads) => (dispatch) => {
    axios
        .post(`${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/ads', ads, {
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type':
                    'multipart/form-data; boundary=<calculated when request is sent>',
            },
        })
        .then((res) => {
            if (res.status == 201) {
                toast.success(res.data.message)
            }
            //console.log(res.data.message,'get create response ');
            dispatch({
                type: CREATE_ADS,
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
