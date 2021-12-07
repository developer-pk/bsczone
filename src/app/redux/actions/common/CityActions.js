import axios from 'axios'
import {
    SERVICE_URL,
    DEFAULT_SERVICE_VERSION,
} from './../../../constants/utility'

export const GET_CITY = 'GET_CITY'
const accessToken = window.localStorage.getItem('accessToken')

export const getCity = (stateId) => (dispatch) => {
    axios
        .get(`${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/country/'+stateId+'/cities', {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        })
        .then((res) => {
            dispatch({
                type: GET_CITY,
                payload: res.data,
            })
        })
}
