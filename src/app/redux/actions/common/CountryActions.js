import axios from 'axios'
import {
    SERVICE_URL,
    DEFAULT_SERVICE_VERSION,
} from './../../../constants/utility'

export const GET_COUNTRY = 'GET_COUNTRY'
export const GET_STATE = 'GET_STATE'
export const GET_CITY = 'GET_CITY'
const accessToken = window.localStorage.getItem('accessToken')

export const getCountry = () => (dispatch) => {
    axios
        .get(`${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/country/', {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        })
        .then((res) => {
            dispatch({
                type: GET_COUNTRY,
                payload: res.data,
            })
        })
}

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
