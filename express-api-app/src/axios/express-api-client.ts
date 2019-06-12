import axios from 'axios'


//base http request
export const expressApiClient = axios.create({
    baseURL: 'http://ec2-18-222-61-49.us-east-2.compute.amazonaws.com:3030/',
    //baseURL: 'http://localhost:3030/',
    headers:{
        'Content-Type': 'application/json'
    },
    withCredentials: true
}
)
