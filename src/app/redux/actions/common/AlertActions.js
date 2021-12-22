import axios from 'axios'
import {
    SERVICE_URL,
    DEFAULT_SERVICE_VERSION,
} from './../../../constants/utility'
import { toast } from 'material-react-toastify'
import history from 'history.js'

export const GET_ALERT = 'GET_ALERT'
export const CREATE_ALERT = 'CREATE_ALERT'
export const DELETE_ALERT = 'DELETE_ALERT'
export const REMOVE_ALERT = 'REMOVE_ALERT'
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
            window.localStorage.setItem('accessToken', res.data.accessToken)
            window.localStorage.setItem('refreshToken', res.data.refreshToken)
        })
        .catch((error) => {})
}

export const getAlert = () => (dispatch) => {
    axios
        .get(`${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/alert', {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        })
        .then((res) => {
            dispatch({
                type: GET_ALERT,
                payload: res.data,
            })
        })
}

export const deleteAlert = (id) => (dispatch) => {
    axios
        .delete(
            `${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/alert/' + id,
            {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                },
            }
        )
        .then((res) => {
            dispatch({
                type: DELETE_ALERT,
                payload: res.data,
            })
        })
}

export const createAlert = (alert) => (dispatch) => {
    axios
        .post(
            `${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/alert',
            alert,
            { headers: { Authorization: 'Bearer ' + accessToken } }
        )
        .then((res) => {
            if (res.status == 201 || res.status == 200) {
                toast.success('Alert added successfully.')
            }
            dispatch({
                type: CREATE_ALERT,
                payload: res.data,
            })
        })
        .catch((error) => {
            if(error){
                if (
                    error.response.data.code == 401 &&
                    (error.response.data.message == 'jwt expired' ||
                        error.response.data.message == 'jwt malformed')
                ) {
                    generateRefreshToken()
                } else if (error.response.status == 400) {
                    if(error.response.data.errors){
                        toast.error(error.response.data.errors[0].messages[0])
                    }else{
                        toast.error(error.response.data.message)
                    }
                    
                } else {
                    toast.error(error.response.data.errors[0].messages[0])
                }
            }
        })
}

export const removeAlert = (tokenInfo) => (dispatch) => {
    axios
        .post(`${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/alert/remove-alert', tokenInfo, {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        })
        .then((res) => {
            if (res.status == 201 || res.status == 200) {
                toast.success(res.data.message)
                history.push('/home');
            }
            dispatch({
                type: REMOVE_ALERT,
                payload: res.data,
            })
        })
        .catch((error) => {
            console.log(error,'sdfdf');
                //toast.error(error.response.data.errors[0].messages[0])
        })
}
