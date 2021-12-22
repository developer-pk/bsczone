import React, { createContext, useEffect, useReducer } from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios.js'
import { MatxLoading } from 'app/components'
import { SERVICE_URL, DEFAULT_SERVICE_VERSION } from "./../constants/utility"
import { authRoles } from '../auth/authRoles'
import history from 'history.js'

const initialState = {
    isAuthenticated: false,
    isInitialised: false,
    user: null,
}

const isValidToken = (accessToken) => {
    if (!accessToken) {
        return false
    }

    const decodedToken = jwtDecode(accessToken)
    const currentTime = Date.now() / 1000
    console.log(decodedToken)
    return decodedToken.exp > currentTime
}

const setSession = (accessToken) => {
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    } else {
        localStorage.removeItem('accessToken')
        delete axios.defaults.headers.common.Authorization
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            const { isAuthenticated, user } = action.payload

            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user,
            }
        }
        case 'LOGIN': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }
        }
        case 'REGISTER': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login: () => Promise.resolve(),
    logout: () => {},
    register: () => Promise.resolve(),
})

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const login = async (email, password) => {
        const response = await axios.post(`${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}`+'/auth/login', {
            email,
            password,
        })
        // const response = await axios.post('/api/auth/login', {
        //     email,
        //     password,
        // })
        //const {accessToken, user} = response.data
         const user = response.data.user
         const accessToken = response.data.token.accessToken
        //const { accessToken, user } = response.data
        setSession(accessToken)
        console.log(response.data,'login data');
        localStorage.setItem('step', response.data.user.steps)
        localStorage.setItem('userRole', response.data.user.role)
        localStorage.setItem('email', response.data.user.email)
        localStorage.setItem('refreshToken', response.data.token.refreshToken);
        dispatch({
            type: 'LOGIN',
            payload: {
                user,
            },
        })
    }

    const register = async (email, firstname, lastname, password, step) => {
        const response = await axios.post(`${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}`+'/auth/register', {
            email,
            firstname,
            lastname,
            password,
            step,
        })

        //const { accessToken, user } = response.data
        const user = response.data.user
        const accessToken = response.data.token.accessToken
        //console.log(response.data,'register data');
        setSession(accessToken)
        localStorage.setItem('firstname', response.data.user.firstname)
        localStorage.setItem('lastname', response.data.user.lastname)
        localStorage.setItem('email', response.data.user.email)
        localStorage.setItem('step', response.data.user.steps)
        localStorage.setItem('refreshToken', response.data.token.refreshToken);
        login(email,password)
        dispatch({
            type: 'REGISTER',
            payload: {
                user,
            },
        })
    }

    const logout = () => {
        setSession(null)
        dispatch({ type: 'LOGOUT' })
        history.push('/session/signin')
    }

    useEffect(() => {
        ;(async () => {
            try {
                const accessToken = window.localStorage.getItem('accessToken')

                if (accessToken && isValidToken(accessToken)) {
                    setSession(accessToken)
                    //const response = await axios.get('/api/auth/profile')
                      const response = await axios.get(`${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}`+'/users/profile',{headers: { 
                        'Authorization': 'Bearer '+accessToken
                      }})
                    const user  = response.data

                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: true,
                            user,
                        },
                    })
                } else {
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    })
                }
            } catch (err) {
                console.error(err)
                dispatch({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                })
            }
        })()
    }, [])

    if (!state.isInitialised) {
        return <MatxLoading />
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                logout,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
