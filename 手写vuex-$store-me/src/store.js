import Vue from 'vue';
import Vuex from './vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        student: {
            state: {
                num: 100
            },
            modules: {
                a: {
                    state: {
                        numa: 101
                    }
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
    }
})