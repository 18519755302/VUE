import Vue from 'vue';
//实际上调用的./vuex/index.js 可简写./vuex
import Vuex from './vuex';
//import Vuex from 'vuex';

//会调用./vuex/index.js中导出的install方法
Vue.use(Vuex);

//会调用./vuex/index.js中导出的类Store
export default new Vuex.Store({
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
                    }
                }
            },
            getters: {
                doubleNum(state, getters, rootState, rootGetters) {
                    return state.num * 2;
                }
            }

        },
        // studentTwo: {
        //     state: {
        //         num: 200
        //     }
        // }
    },
    state: {
        count: 0
    },
    getters: {
        doubleCount(state, getter) {
            // console.log(state, getter);
            return state.count * 2;
        }
    }
})