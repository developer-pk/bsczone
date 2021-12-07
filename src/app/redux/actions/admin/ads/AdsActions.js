import axios from 'axios'
import {
    SERVICE_URL,
    DEFAULT_SERVICE_VERSION,
} from './../../../../constants/utility'

export const GET_ADS = 'GET_ADS'
export const CREATE_ADS = 'CREATE_ADS'
export const DELETE_ADS = 'DELETE_ADS'
const accessToken = window.localStorage.getItem('accessToken')

export const getAds = () => (dispatch) => {
    axios
        .get(`${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/ads', {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        })
        .then((res) => {
            dispatch({
                type: GET_ADS,
                payload: res.data,
            })
        })
}

export const deleteAds = (id) => (dispatch) => {
    axios
        .delete(
            `${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/ads/' + id,
            {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                },
            }
        )
        .then((res) => {
            dispatch({
                type: DELETE_ADS,
                payload: res.data,
            })
        })
}

export const createAds = (ads) => (dispatch) => {
    axios
        .post(
            `${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/ads',
            ads,
            { headers: { Authorization: 'Bearer ' + accessToken } }
        )
        .then((res) => {
            dispatch({
                type: CREATE_ADS,
                payload: res.data,
            })
        })
}
