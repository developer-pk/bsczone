import axios from 'axios'
import {
    SERVICE_URL,
    DEFAULT_SERVICE_VERSION,
} from './../../../constants/utility'

export const GET_CONTACT_US = 'GET_CONTACT_US'
export const CREATE_CONTACT_US = 'CREATE_CONTACT_US'
export const DELETE_CONTACT_US = 'DELETE_CONTACT_US'
const accessToken = window.localStorage.getItem('accessToken')

export const getContactUs = () => (dispatch) => {
    axios
        .get(`${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/contact-us', {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        })
        .then((res) => {
            dispatch({
                type: GET_CONTACT_US,
                payload: res.data,
            })
        })
}

export const deleteContactUs = (id) => (dispatch) => {
    axios
        .delete(
            `${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/contact-us/' + id,
            {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                },
            }
        )
        .then((res) => {
            dispatch({
                type: DELETE_CONTACT_US,
                payload: res.data,
            })
        })
}

export const createContactUs = (alert) => (dispatch) => {
    axios
        .post(
            `${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/contact-us',
            alert,
            { headers: { Authorization: 'Bearer ' + accessToken } }
        )
        .then((res) => {
            dispatch({
                type: CREATE_CONTACT_US,
                payload: res.data,
            })
        })
}
