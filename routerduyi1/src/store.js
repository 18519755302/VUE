import Vue from 'vue';
import Vuex from 'vuex';
import {
    COUNT_PLUS
} from './store/mutation-types';

//vue使用Vuex
Vue.use(Vuex);

//注册Store选项，并导出
export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        count: 0,
        studentList: [],
        obj: {
            a: 1
        },
        msg: ''
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

    },
    mutations: {
        countPlus(state) {
            state.count++;
        },
        countPlusTwo(state) {
            state.count += 2;
        },
        countPlusN(state, n) {
            state.count += n;
        },
        countPlusPayload(state, payload) {
            state.count += payload.n;
        },
        [COUNT_PLUS](state) {
            state.count++;
        },
        input(state, value) {
            state.msg = value;
        }
    },
    actions: {
        countPlusNAction(context, payload) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    context.commit('countPlusPayload', payload);
                    //promise返回值
                    resolve();
                }, 1000)
            })
        }
    }

});