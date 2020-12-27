import App from './App.vue';
import Vue from 'vue';
import router from './router'

import store from './store';

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')