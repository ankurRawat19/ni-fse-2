import axios from 'axios';

const API_BASE_URL = 'https://vxoxv98g3j.execute-api.eu-north-1.amazonaws.com/prod';  // Replace with the actual base URL of your API

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        // You can add other headers if needed (e.g., authorization)
    },
});

// Interceptor to handle request errors globally
api.interceptors.request.use(
    (config) => config,
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Interceptor to handle response errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Response error:', error);
        return Promise.reject(error);
    }
);

export default api;
