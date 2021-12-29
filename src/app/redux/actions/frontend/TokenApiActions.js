import axios from 'axios'
import {
    TOKEN_API_URL,
    TOKEN_STAT_API_URL,
    DEFAULT_SERVICE_VERSION,
    CRYPTO_API_KEY,
    SERVICE_URL,
} from './../../../constants/utility'
import { toast } from 'material-react-toastify'
import history from 'history.js'

export const GET_TOKEN_SYMBOL = 'GET_TOKEN_SYMBOL'
export const GET_TOKEN_INFO = 'GET_TOKEN_INFO'
export const GET_TOKEN_TRANSFER_LIST = 'GET_TOKEN_TRANSFER_LIST'
export const GET_TOKEN_OTHER_INFO = 'GET_TOKEN_OTHER_INFO'
export const GET_ALERT_TOKEN_INFO = 'GET_ALERT_TOKEN_INFO'
export const ADD_FAVOURITE = 'ADD_FAVOURITE'
export const REMOVE_FAVOURITE = 'REMOVE_FAVOURITE'
export const REMOVE_ALERT = 'REMOVE_ALERT'
const accessToken = window.localStorage.getItem('accessToken')
const refreshToken = window.localStorage.getItem('refreshToken')
const email = window.localStorage.getItem('email')
const endpoint = "https://graphql.bitquery.io/";

export const generateRefreshToken = () => {
    axios
        .post(
            `${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/auth/refresh-token',
            { email: email, refreshToken: refreshToken }
        )
        .then((res) => {
            console.log(res, 'get token response ')
            localStorage.setItem('accessToken', res.data.accessToken)
            localStorage.setItem('refreshToken', res.data.refreshToken)
        })
        .catch((error) => {})
}

export const getTokenBySymbol = (searchSymbol) => (dispatch) => {
    // axios
    //     .get(`${TOKEN_API_URL}` + '/token/token_search?search='+ searchSymbol +'&key=ACCwyjHCjjGNk&format=structure', {
    //     })
    //     .then((res) => {
    //         dispatch({
    //             type: GET_TOKEN_SYMBOL,
    //             payload: res.data,
    //         })
    //     })
    //     .catch((error) => {
    //         console.log(error,'sdfdf');
    //     })

    return fetch(endpoint, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "X-API-KEY": "BQYAOLGxCUZFuXBEylRKEPm2tYHdi2Wu"
        },
        body: JSON.stringify({ query: `query SearchToken($token: String!, $limit: Int!, $offset: Int!) {
          search(string: $token, offset: $offset, limit: $limit,  network: bsc) {
            network {
              network
              protocol
            }
            subject {
              ... on Address {
                address
                annotation
              }
              ... on Currency {
                address
                name
                symbol
                decimals
                tokenId
                tokenType
                
              }
              ... on SmartContract {
                address
                annotation
                contractType
                
              }
              ... on TransactionHash {
                __typename
                hash
              }
            }
          }
        }`,
            variables: {"limit":10,"offset":0,"token":searchSymbol} }) // ({ QUERY })
      })
        .then((response) => {
            
          if (response.status >= 400) {
            throw new Error("Error fetching data");
          } else {
            
            return response.json();
          }
        })
        .then((data) => {
            var symbols1 = [];
            // data.data.search.map((search) => {
            //     // console.log(search,'yes there');
                
            //      symbols1.push(search.subject);
            //  });
            //  dispatch({
            //         type: GET_TOKEN_SYMBOL,
            //         payload: symbols1,
            //     })
            console.log(data,'yes there');
             //setSearchArr(symbols1)
        });
}

export const getTokenInfo = (address) => (dispatch) => {
    axios
        .get(`${TOKEN_API_URL}` + '/token/token_stat?token='+ address +'&key=ACCwyjHCjjGNk&format=structure', {
        })
        .then((res) => {
            //console.log(res.data[0],'get token info');
            dispatch({
                type: GET_TOKEN_INFO,
                payload: res.data[0] ? res.data[0]:{},
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
            //console.log(res.data,'transfers');
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
            //console.log(res,'anj123');
            dispatch({
                type: GET_TOKEN_OTHER_INFO,
                payload: res.data.data[0] ? res.data.data[0]:{},
            })
        })
        .catch((error) => {
            console.log(error,'sdfdf');
                //toast.error(error.response.data.errors[0].messages[0])
        })
}

export const getAlertTokenInfo = (token) => (dispatch) => {
    axios
        .get(`${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/alert/get-saved-alert/'+ token, {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        })
        .then((res) => {
            history.push('/home')
            dispatch({
                type: GET_ALERT_TOKEN_INFO,
                payload: res.data,
            })
        })
        .catch((error) => {
            if(error){
                if (
                    error.response.data.code == 401 &&
                    (error.response.data.message == 'jwt expired' ||
                        error.response.data.message == 'jwt malformed')
                ) {
                    generateRefreshToken()
                } else if (error.response.status == 400) {
                    toast.error(error.response.data.message)
                } else {
                    toast.error(error.response.data.errors[0].messages[0])
                }
            }
        })
}

export const addTokenInFavourite = (tokenInfo) => (dispatch) => {
    axios
        .post(`${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/alert/add-favorite', tokenInfo, {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        })
        .then((res) => {
            if (res.status == 201 || res.status == 200) {
                toast.success(res.data.message)
                history.push('/home');
            }
            dispatch({
                type: ADD_FAVOURITE,
                payload: res.data,
            })
        })
        .catch((error) => {
            if(error){
                if (
                    error.response.data.code == 401 &&
                    (error.response.data.message == 'jwt expired' ||
                        error.response.data.message == 'jwt malformed')
                ) {
                    generateRefreshToken()
                } else if (error.response.status == 400) {
                    toast.error(error.response.data.message)
                } else {
                    toast.error(error.response.data.errors[0].messages[0])
                }
            }
        })
}

export const removeTokenFromFavourite = (tokenInfo) => (dispatch) => {
    axios
        .post(`${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/alert/un-favorite', tokenInfo, {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        })
        .then((res) => {
            if (res.status == 201 || res.status == 200) {
                toast.success(res.data.message)
                history.push('/home');
            }
            dispatch({
                type: REMOVE_FAVOURITE,
                payload: res.data,
            })
        })
        .catch((error) => {
            if(error){
                if (
                    error.response.data.code == 401 &&
                    (error.response.data.message == 'jwt expired' ||
                        error.response.data.message == 'jwt malformed')
                ) {
                    generateRefreshToken()
                } else if (error.response.status == 400) {
                    toast.error(error.response.data.message)
                } else {
                    toast.error(error.response.data.errors[0].messages[0])
                }
            }
        })
}

export const removeAlert = (tokenInfo) => (dispatch) => {
    axios
        .post(`${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}` + '/alert/remove-alert', tokenInfo, {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        })
        .then((res) => {
            if (res.status == 201 || res.status == 200) {
                toast.success(res.data.message)
                history.push('/home');
            }
            dispatch({
                type: REMOVE_ALERT,
                payload: res.data,
            })
        })
        .catch((error) => {
            console.log(error,'sdfdf');
                //toast.error(error.response.data.errors[0].messages[0])
        })
}

