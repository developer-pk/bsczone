import axios from 'axios'
import {
    SERVICE_URL,
    DEFAULT_SERVICE_VERSION,
} from './../../../../constants/utility'

export const GET_JOBTITLE = 'GET_JOBTITLE'
export const CREATE_JOBTITLE = 'CREATE_JOBTITLE'
export const DELETE_JOBTITLE = 'DELETE_JOBTITLE'
const accessToken = window.localStorage.getItem('accessToken')

export const getJobTitle = () => (dispatch) => {
    axios
        .get(`${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/jobtitle', {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        })
        .then((res) => {
            dispatch({
                type: GET_JOBTITLE,
                payload: res.data,
            })
        })
}

export const deleteJobTitle = (id) => (dispatch) => {
    axios
        .delete(
            `${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/jobtitle/' + id,
            {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                },
            }
        )
        .then((res) => {
            dispatch({
                type: DELETE_JOBTITLE,
                payload: res.data,
            })
        })
}

export const createJobTitle = (jobtitle) => (dispatch) => {

    axios
        .post(
            `${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/jobtitle',
            jobtitle,
            { headers: { Authorization: 'Bearer ' + accessToken } }
        )
        .then((res) => {
            dispatch({
                type: CREATE_JOBTITLE,
                payload: res.data,
            })
        })
}
