import axios from 'axios'
import {
    SERVICE_URL,
    DEFAULT_SERVICE_VERSION,
} from './../../../constants/utility'

export const GET_PROFILE = 'GET_PROFILE'
export const CREATE_PROFILE = 'CREATE_PROFILE'
const accessToken = window.localStorage.getItem('accessToken')

export const getProfile = () => (dispatch) => {
    axios
        .get(`${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/industry', {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        })
        .then((res) => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data,
            })
        })
}

export const createProfile = (data) => (dispatch) => {
    axios
        .post(
            `${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/profile/step-2',
            data,
            { headers: { Authorization: 'Bearer ' + accessToken } }
        )
        .then((res) => {
            dispatch({
                type: CREATE_PROFILE,
                payload: res.data,
            })
        })
}
