import axios from 'axios'

export const LOGIN = 'LOGIN'
export const REGISTER = 'REGISTER'

export const login = () => (dispatch) => {
    axios.get('http://3e54-223-187-107-68.ngrok.io/v1/auth/login').then((res) => {
        dispatch({
            type: LOGIN,
            payload: res.data,
        })
    })
}

export const register = () => (dispatch) => {
    axios.get('http://3e54-223-187-107-68.ngrok.io/v1/auth/register').then((res) => {
        dispatch({
            type: REGISTER,
            payload: res.data,
        })
    })
}