import React, { createContext, useEffect, useReducer } from 'react'
import axios from 'axios'
import { SERVICE_URL, DEFAULT_SERVICE_VERSION } from "./../../../constants/utility"

const reducer = (state, action) => {
    switch (action.type) {
        case 'GET_INDUSTRY': {
            return {
                ...state,
                industries: action.payload,
            }
        }
        case 'DELETE_INDUSTRY': {
            return {
                ...state,
                industries: action.payload,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const IndustryContext = createContext({
    industries: [],
    deleteIndustry: () => {},
    getIndustry: () => {},
    createIndustry: () => {},
})

export const IndustryProvider = ({ settings, children }) => {
    const [state, dispatch] = useReducer(reducer, [])

    const deleteIndustry = async (industryID) => {
        try {
            const res = await axios.post('/api/industry/delete', {
                id: industryID,
            })
            dispatch({
                type: 'DELETE_INDUSTRY',
                payload: res.data,
            })
        } catch (e) {
            console.error(e)
        }
    }

    const getIndustry = async () => {
        try {
            const accessToken = window.localStorage.getItem('accessToken')
            const res = await axios.get(`${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}`+'/industry',{headers: { 
                   'Authorization': 'Bearer '+accessToken
                  }})
            console.log(res,'industry list');
            dispatch({
                type: 'GET_INDUSTRY',
                payload: res.data,
            })
        } catch (e) {
            console.error(e)
        }
    }
    const createIndustry = async (industry) => {
        try {
            const accessToken = window.localStorage.getItem('accessToken')
            const res = await axios.post(`${SERVICE_URL}/${DEFAULT_SERVICE_VERSION}`+'/industry', {
                industry,
            },{headers: { 'Authorization': 'Bearer '+accessToken }})
            dispatch({
                type: 'CREATE_INDUSTRY',
                payload: res.data,
            })
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getIndustry()
    }, [])

    return (
        <IndustryContext.Provider
            value={{
                industries: state.industries,
                deleteIndustry,
                getIndustry,
                createIndustry,
            }}
        >
            {children}
        </IndustryContext.Provider>
    )
}

export default IndustryContext
