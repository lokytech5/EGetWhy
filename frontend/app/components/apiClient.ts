import axios from 'axios';

// Create the Axios instance
const apiClient = axios.create({
    baseURL: 'https://olikwzthj7.execute-api.us-east-1.amazonaws.com/dev',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Include credentials with requests
});

// Request interceptor
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Retrieve token from local storage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Add token to request headers
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle 401 errors globally, e.g., redirect to login
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default apiClient;