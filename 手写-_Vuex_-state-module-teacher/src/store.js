import Vue from 'vue';
import Vuex from './vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        student: {
            state: {
                num: 100,
                hello: 'world'
            },
            modules: {
                a: {
                    state: {
                        name: 'a',
                    }
                }
            },
        },
        studentTwo: {
            state: {
                num: 200
            }
        }
    },
    state: {
        count: 0,
    }
})