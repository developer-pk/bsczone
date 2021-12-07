import axios from 'axios'
import {
    SERVICE_URL,
    DEFAULT_SERVICE_VERSION,
} from './../../../../constants/utility'

export const GET_COLLEGE = 'GET_COLLEGE'
export const CREATE_COLLEGE = 'CREATE_COLLEGE'
export const DELETE_COLLEGE = 'DELETE_COLLEGE'
const accessToken = window.localStorage.getItem('accessToken')

export const getCollege = () => (dispatch) => {
    axios
        .get(`${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/industry', {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        })
        .then((res) => {
            dispatch({
                type: GET_COLLEGE,
                payload: res.data,
            })
        })
}

export const deleteCollege = (id) => (dispatch) => {
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
                type: DELETE_COLLEGE,
                payload: res.data,
            })
        })
}

export const createCollege = (industry) => (dispatch) => {
    axios
        .post(
            `${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/industry',
            industry,
            { headers: { Authorization: 'Bearer ' + accessToken } }
        )
        .then((res) => {
            dispatch({
                type: CREATE_COLLEGE,
                payload: res.data,
            })
        })
}
