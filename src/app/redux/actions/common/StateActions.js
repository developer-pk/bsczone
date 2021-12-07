import axios from 'axios'
import {
    SERVICE_URL,
    DEFAULT_SERVICE_VERSION,
} from './../../../constants/utility'

export const GET_STATE = 'GET_STATE'
const accessToken = window.localStorage.getItem('accessToken')

export const getState = (stateId) => (dispatch) => {
    axios
        .get(`${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/country/'+stateId+'/states', {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        })
        .then((res) => {
            dispatch({
                type: GET_STATE,
                payload: res.data,
            })
        })
}
