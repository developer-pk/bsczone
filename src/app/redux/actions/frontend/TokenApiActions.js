import axios from 'axios'
import {
    TOKEN_API_URL,
    TOKEN_STAT_API_URL,
    DEFAULT_SERVICE_VERSION,
    CRYPTO_API_KEY,
} from './../../../constants/utility'
import { toast } from 'material-react-toastify'

export const GET_TOKEN_SYMBOL = 'GET_TOKEN_SYMBOL'
export const GET_TOKEN_INFO = 'GET_TOKEN_INFO'
export const GET_TOKEN_TRANSFER_LIST = 'GET_TOKEN_TRANSFER_LIST'
export const GET_TOKEN_OTHER_INFO = 'GET_TOKEN_OTHER_INFO'

export const getTokenBySymbol = (searchSymbol) => (dispatch) => {
    axios
        .get(`${TOKEN_API_URL}` + '/token/token_search?search='+ searchSymbol +'&key=ACCwyjHCjjGNk&format=structure', {
        })
        .then((res) => {
            dispatch({
                type: GET_TOKEN_SYMBOL,
                payload: res.data,
            })
        })
        .catch((error) => {
            console.log(error,'sdfdf');
                //toast.error(error.response.data.errors[0].messages[0])
        })
}

export const getTokenInfo = (address) => (dispatch) => {
    axios
        .get(`${TOKEN_API_URL}` + '/token/token_stat?token='+ address +'&key=ACCwyjHCjjGNk&format=structure', {
        })
        .then((res) => {
            dispatch({
                type: GET_TOKEN_INFO,
                payload: res.data,
            })
        })
        .catch((error) => {
            console.log(error,'sdfdf');
                //toast.error(error.response.data.errors[0].messages[0])
        })
}

export const getTokenTransferList = (token) => (dispatch) => {
    axios
        .get(`${TOKEN_API_URL}` + '/token/transfers?token='+ token +'&limit=100&key=ACCwyjHCjjGNk&format=structure', {
        })
        .then((res) => {
            dispatch({
                type: GET_TOKEN_TRANSFER_LIST,
                payload: res.data,
            })
        })
        .catch((error) => {
            console.log(error,'sdfdf');
                //toast.error(error.response.data.errors[0].messages[0])
        })
}

export const getTokenOtherInfo = (symbol) => (dispatch) => {
    axios
        .get(`${TOKEN_STAT_API_URL}/${DEFAULT_SERVICE_VERSION}` + '/currencies?api_key='+ `${CRYPTO_API_KEY}` +'&symbols='+ symbol +'&optionalFields=images,links', {
        })
        .then((res) => {
            dispatch({
                type: GET_TOKEN_OTHER_INFO,
                payload: res.data,
            })
        })
        .catch((error) => {
            console.log(error,'sdfdf');
                //toast.error(error.response.data.errors[0].messages[0])
        })
}