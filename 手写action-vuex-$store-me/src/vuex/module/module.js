import {
    forEachValue
} from '../util';

export default class Module {
    constructor(currentModule) {
        this.rawModule = currentModule || {};
        this.state = currentModule.state || {};
        this.children = currentModule.modules || {};
        this.namespaced = !!currentModule.namespaced;
    }

    /**
     * @desc 得到一个子模块
     * @param key 
     */
    getChild(key) {
        return this.children[key] || {};
    }

    /**
     * 是否被命名
     */
    isNamespaced() {
        return this.namespaced;
    }

    /**
     * 循环child执行fn
     * @param {*} 函数fn 
     */
    forEachChild(fn) {
        forEachValue(this.children, (key, value) => {
            fn(key, value);
        });
    }

    /**
     * 循环getters执行fn
     * @param {*} 函数fn 
     */
    forEachGetters(fn) {
        if (this.rawModule.getters) {
            forEachValue(this.rawModule.getters, (key, value) => {
                fn(key, value);
            })
        }
    }

    /**
     * 循环Mutations,执行fn
     * @param {Function} 函数fn 
     */
    forEachMutations(fn) {
        //console.log(this.rawModule);
        if (this.rawModule.mutations) {
            forEachValue(this.rawModule.mutations, (key, value) => {
                fn(key, value);
            })
        }
    }

    /**
     * 循环actions,执行fn
     * @param {Function} 函数fn 
     */
    forEachActions(fn) {
        if (this.rawModule.actions) {
            forEachValue(this.rawModule.actions, (key, value) => {
                fn(key, value);
            })
        }
    }


}