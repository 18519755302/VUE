import App from './App.vue';
import Vue from 'vue';
import router from './router'
import axios from './http'

//Vue.config.productionTip = true;
Vue.prototype.$axios = axios;
console.log(axios);

new Vue({
    render: h => h(App),
    router
}).$mount('#app')