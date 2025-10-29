import axios from  'axios'
import {BASE_URL} from './apiPath.js';


const axiosInstance=axios.create({
    baseURL:BASE_URL,
    timeout:80000,
    headers:{
        "Content-Type":"application/json",
        Accept:"appliaction/json",
    },
});

//Request Interceptor
axiosInstance.interceptors.request.use(
    (config)=>{
        const accessToken=localStorage.getItem("token");
        if(accessToken){
            config.headers.Authorization=`Bearer ${accessToken}`;

        }
        return config;
    },
    (error)=>{
        return  Promise.reject(error);
    }
);


//Respose Interceptor

axiosInstance.interceptors.response.use(
    (response)=>{
        return response;
    },
    (error)=>{
        //handling common errors globally
        if(error.response){
            if(error.response.status=== 500){
                console.log(error)
                console.error("server error.Please try again later.");
            }
        }
        else if(error.code=== "ECONNABORTED"){
            console.error("request timeout.Please try again.");
        }
        return Promise.reject(error)
    }
)


export default axiosInstance