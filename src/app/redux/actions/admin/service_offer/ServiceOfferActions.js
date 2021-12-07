import axios from 'axios'
import {
    SERVICE_URL,
    DEFAULT_SERVICE_VERSION,
} from './../../../../constants/utility'

export const GET_SERVICE_OFFER = 'GET_SERVICE_OFFER'
export const CREATE_SERVICE_OFFER = 'CREATE_SERVICE_OFFER'
export const DELETE_SERVICE_OFFER = 'DELETE_SERVICE_OFFER'
const accessToken = window.localStorage.getItem('accessToken')

export const getServiceOffer = () => (dispatch) => {
    axios
        .get(`${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/industry', {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        })
        .then((res) => {
            dispatch({
                type: GET_SERVICE_OFFER,
                payload: res.data,
            })
        })
}

export const deleteServiceOffer = (id) => (dispatch) => {
    axios
        .delete(
            `${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/industry/' + id,
            {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                },
            }
        )
        .then((res) => {
            dispatch({
                type: DELETE_SERVICE_OFFER,
                payload: res.data,
            })
        })
}

export const createServiceOffer = (industry) => (dispatch) => {
    axios
        .post(
            `${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/industry',
            industry,
            { headers: { Authorization: 'Bearer ' + accessToken } }
        )
        .then((res) => {
            dispatch({
                type: CREATE_SERVICE_OFFER,
                payload: res.data,
            })
        })
}
