import axios from 'axios';

const configOMB = {
    baseURL: 'https://www.omdbapi.com/',
};
const key = '417b3c1';
const axiosInstance = axios.create(configOMB);

const API = {
    searchFilmsByTitle: (title: string) => {
        return axiosInstance.get(`?s=${title}&apikey=${key}`)
    },
    searchFilmsByType: (title: string, type: string) => {
        return axiosInstance.get(`?t=${title}&type=${type}&apikey=${key}`)
            .then(response => {
                return response.data
            })
    }
};


export default API;
