import axios from 'axios'
import {
    SERVICE_URL,
    DEFAULT_SERVICE_VERSION,
} from './../../../constants/utility'

export const GET_ALERT = 'GET_ALERT'
export const CREATE_ALERT = 'CREATE_ALERT'
export const DELETE_ALERT = 'DELETE_ALERT'
const accessToken = window.localStorage.getItem('accessToken')

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
            dispatch({
                type: CREATE_ALERT,
                payload: res.data,
            })
        })
}
