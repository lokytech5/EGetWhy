import axios from "axios";

axios.defaults.baseURL = "https://olikwzthj7.execute-api.us-east-1.amazonaws.com/dev"
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true; 

// Request interceptor->intercept any request sent to the API requiring info about the logged-in user to work
// It ll refresh the user access token before sending the request to the API
export const axiosReq = axios.create();
// Response interceptor-> it ll listen for when the API responds that the user s access token has expired and then refresh the token
// in the background. It ll keep the user logged in 24h
export const axiosRes = axios.create();