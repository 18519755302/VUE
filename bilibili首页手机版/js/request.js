axios.defaults.baseURL = 'https://developer.duyiedu.com/vue/bz';
//添加拦截器
axios.interceptors.response.use(response => {
    //console.log(response);
    if (response.status === 200) {
        if (response.config.baseURL + '/video' === response.config.url) {
            //console.log(response.data.data);
            return {
                count: response.data.count,
                data: response.data.data
            }
        }
        return response.data.data;
    }
    return response;
})