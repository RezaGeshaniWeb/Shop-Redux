import axios from "axios";

const api = axios.create(
    { baseURL: 'https://fakestoreapi.com' }
)

api.interceptors.request.use(
    (request) => {
        return request
    },
    (error) => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api