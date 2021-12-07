import { SERVICE_URL, DEFAULT_SERVICE_VERSION } from "./../constants/utility"
import axios from 'axios';

/**
 * Fetch data from given url
 * @param {*} url
 * @param {*} options
 */
const fetchJSON = async (url, options = {}) => {
    return fetch(url, options)
        .then(response => {
            if (!response.status === 200) {
                throw response.json();
            }
            return response.json();
        })
        .then(json => {
            return json;
        })
        .catch(error => {
            throw error;
        });
};

 const servicePost = async (path, payload,headers=null) =>{
       return new Promise((resolve,reject)=>{
        axios.post(`${SERVICE_URL}/${path}`, payload,{
          headers: headers,
        })
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error)
        });
    })
  }

  const serviceGet = async (path, payload) =>{
    return new Promise((resolve,reject)=>{
        axios.get(`${SERVICE_URL}/${path}`, payload)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error)
        });
    })
  }

  const servicePostWithVersion = async (path, payload, version = DEFAULT_SERVICE_VERSION) =>{
    return new Promise((resolve,reject)=>{
        axios.post(`${SERVICE_URL}${version}/${path}`, payload)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error)
        });
    })
  }

export { fetchJSON, servicePost, serviceGet, servicePostWithVersion };
