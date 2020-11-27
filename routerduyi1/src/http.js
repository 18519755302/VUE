import axios from 'axios';

//请求拦截器
axios.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    config.url = config.url + '.json';
    return config;
})

//相应拦截器
axios.interceptors.response.use(response => {
    // 对响应数据做点什么
    if (response.status == 200) {
        return response.data.data;
    }
    return response;
})

export default axios;