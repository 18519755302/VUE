import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import api from "./api";
import {
    store
} from "./store";
//提示 接口
import {
    toast
} from './util/tips/index.js'

//将接口放在vue原型上，方便调用接口
Vue.prototype.$api = api;
//提示 接口
Vue.prototype.$toast = toast;

//createApp(App).mount('#app')
const vm = new Vue({
    render: function (h) {
        return h(App)
    },
    router,
    store
}).$mount('#app1');