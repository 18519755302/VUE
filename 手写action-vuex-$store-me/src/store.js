import Vue from 'vue';
//实际上调用的./vuex/index.js 可简写./vuex
import Vuex from './vuex';
//import Vuex from 'vuex';

//会调用./vuex/index.js中导出的install方法
Vue.use(Vuex);

//会调用./vuex/index.js中导出的类Store
export default new Vuex.Store({
    strict: true,
    modules: {
        student: {
            namespaced: true,
            state: {
                num: 100
            },
            modules: {
                a: {
                    state: {
                        b: 101
                    },
                    getters: {
                        twoB(state) {
                            return 2 * state.b;
                        }
                    },
                }
            },
            getters: {
                doubleNum(state, getters, rootState, rootGetters) {
                    return state.num * 2;
                },
            },
            mutations: {
                addNum(state, payLoad) {
                    console.log('子模块');
                    state.num += payLoad.num;
                },
                addCount(state, payLoad) {
                    console.log('子模块!');
                    state.num += payLoad.num;
                }
            },
            actions: {
                studentAddNum({
                    commit,
                    dispatch
                }, payload) {
                    //commit('addCount', payload);
                    dispatch('addCountActionSame', payload);
                },
                addCountActionSame({
                    dispatch
                }, payload) {
                    console.log('子模块');
                }
            }

        }
    },
    state: {
        count: 0
    },
    getters: {
        doubleCount(state, getter) {
            // console.log(state, getter);
            return state.count * 2;
        }
    },
    mutations: {
        addCount(state, payLoad) {
            state.count += payLoad.num;
        },
    },
    actions: {
        addCountAction({
            commit
        }, payload) {
            console.log('我是主模块');
            commit('addCount', payload);
        },
        addCountActionSame({
            dispatch
        }, payload) {
            console.log('主模块');
        }
    }
})