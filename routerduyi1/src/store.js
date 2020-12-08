import Vue from 'vue';
import Vuex from 'vuex';

//vue使用Vuex
Vue.use(Vuex);

//注册Store选项，并导出
export default new Vuex.Store({
    state: {
        count: 0,
        studentList: []
    }
});