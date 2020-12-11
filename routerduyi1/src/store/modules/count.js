import {
    COUNT_PLUS
} from '../mutation-types';

export default {
    namespaced: true,
    state: {
        count: 0,
    },
    getters: {
        addCount: (state, getters, rootState) => {
            console.log(getters, rootState);
            return num => state.count + num;
        },
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

};