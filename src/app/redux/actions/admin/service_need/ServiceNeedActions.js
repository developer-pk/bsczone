import axios from 'axios'
import {
    SERVICE_URL,
    DEFAULT_SERVICE_VERSION,
} from './../../../../constants/utility'

export const GET_SERVICE_NEED = 'GET_SERVICE_NEED'
export const CREATE_SERVICE_NEED = 'CREATE_SERVICE_NEED'
export const DELETE_SERVICE_NEED = 'DELETE_SERVICE_NEED'
const accessToken = window.localStorage.getItem('accessToken')

export const getServiceNeed = () => (dispatch) => {
    axios
        .get(`${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/serviceNeed', {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        })
        .then((res) => {
            dispatch({
                type: GET_SERVICE_NEED,
                payload: res.data,
            })
        })
}

export const deleteServiceNeed = (id) => (dispatch) => {
    axios
        .delete(
            `${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/serviceNeed/' + id,
            {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                },
            }
        )
        .then((res) => {
            dispatch({
                type: DELETE_SERVICE_NEED,
                payload: res.data,
            })
        })
}

export const createServiceNeed = (serviceNeed) => (dispatch) => {
    axios
        .post(
            `${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/serviceNeed',
            serviceNeed,
            { headers: { Authorization: 'Bearer ' + accessToken } }
        )
        .then((res) => {
            dispatch({
                type: CREATE_SERVICE_NEED,
                payload: res.data,
            })
        })
}
