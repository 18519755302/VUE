import Vue from 'vue';
import Vuex from 'vuex';

//vue使用Vuex
Vue.use(Vuex);

//注册Store选项，并导出
export default new Vuex.Store({
    state: {
        count: 0,
        studentList: []
    },
    getters: {
        studentsLength(state) {
            return state.studentList.length;
        },
        addCount: (state) => {
            return num => state.count + num;
        },
        //addCount: state => num => state.count + num
        studentsUnderAge(state) {
            return state.studentList.filter(item => {
                return item.age < 18
            })
        }

    }
});