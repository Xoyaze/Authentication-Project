import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/'
})

api.interceptors.request.use(config => {
    const accessToken = localStorage.getItem('accessToken');
    if(accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
})


api.interceptors.response.use(response => {
    return response;
}, async error => {
    const originalRequest = error.config;

    if(error.response.status === 401 && !originalRequest._retry){
        originalRequest._retry = true;
    }
    try{
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post('http://localhost:8000/api/token/refresh/',{refresh: refreshToken})

        if(response.status === 200){
            const newToken = response.data.access;
            localStorage.setItem('accessToken', newToken);

            api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

            return api(originalRequest)
        }
    }catch(error){
        console.log('Refreshing the token failed.' , error);
    }
    return Promise.reject(error);
});

export default api;