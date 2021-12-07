import axios from 'axios'
import {
    SERVICE_URL,
    DEFAULT_SERVICE_VERSION,
} from './../../../../constants/utility'

export const GET_INDUSTRY = 'GET_INDUSTRY'
export const CREATE_INDUSTRY = 'CREATE_INDUSTRY'
export const DELETE_INDUSTRY = 'DELETE_INDUSTRY'
const accessToken = window.localStorage.getItem('accessToken')

export const getIndustry = () => (dispatch) => {
    axios
        .get(`${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/industry', {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        })
        .then((res) => {
            dispatch({
                type: GET_INDUSTRY,
                payload: res.data,
            })
        })
}

export const deleteIndustry = (id) => (dispatch) => {
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
                type: DELETE_INDUSTRY,
                payload: res.data,
            })
        })
}

export const createIndustry = (industry) => (dispatch) => {
    axios
        .post(
            `${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/industry',
            industry,
            { headers: { Authorization: 'Bearer ' + accessToken } }
        )
        .then((res) => {
            dispatch({
                type: CREATE_INDUSTRY,
                payload: res.data,
            })
        })
}
