import App from './App.vue';
import Vue from 'vue';
import router from './router'
import axios from './http';
import store from "./store";

//Vue.config.productionTip = true;
Vue.prototype.$axios = axios;

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')