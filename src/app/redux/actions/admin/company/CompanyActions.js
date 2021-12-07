import axios from 'axios'
import {
    SERVICE_URL,
    DEFAULT_SERVICE_VERSION,
} from './../../../../constants/utility'

export const GET_COMPANY = 'GET_COMPANY'
export const CREATE_COMPANY = 'CREATE_COMPANY'
export const DELETE_COMPANY = 'DELETE_COMPANY'
const accessToken = window.localStorage.getItem('accessToken')

export const getCompany = () => (dispatch) => {
    axios
        .get(`${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/industry', {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        })
        .then((res) => {
            dispatch({
                type: GET_COMPANY,
                payload: res.data,
            })
        })
}

export const deleteCompany = (id) => (dispatch) => {
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
                type: DELETE_COMPANY,
                payload: res.data,
            })
        })
}

export const createCompany = (industry) => (dispatch) => {
    axios
        .post(
            `${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/industry',
            industry,
            { headers: { Authorization: 'Bearer ' + accessToken } }
        )
        .then((res) => {
            dispatch({
                type: CREATE_COMPANY,
                payload: res.data,
            })
        })
}
