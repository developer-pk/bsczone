import axios from 'axios'
import {
    SERVICE_URL,
    DEFAULT_SERVICE_VERSION,
} from './../../../../constants/utility'

export const GET_HOBBY = 'GET_HOBBY'
export const CREATE_HOBBY = 'CREATE_HOBBY'
export const DELETE_HOBBY = 'DELETE_HOBBY'
const accessToken = window.localStorage.getItem('accessToken')

export const getHobby = () => (dispatch) => {
    axios
        .get(`${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/hobby', {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        })
        .then((res) => {
            dispatch({
                type: GET_HOBBY,
                payload: res.data,
            })
        })
}

export const deleteHobby = (id) => (dispatch) => {
    axios
        .delete(
            `${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/hobby/' + id,
            {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                },
            }
        )
        .then((res) => {
            dispatch({
                type: DELETE_HOBBY,
                payload: res.data,
            })
        })
}

export const createHobby = (hobby) => (dispatch) => {
    axios
        .post(
            `${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/hobby',
            hobby,
            { headers: { Authorization: 'Bearer ' + accessToken } }
        )
        .then((res) => {
            dispatch({
                type: CREATE_HOBBY,
                payload: res.data,
            })
        })
}
