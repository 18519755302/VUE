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
     * 循环执行getters执行fn
     * @param {*} 函数fn 
     */
    forEachGetters(fn) {
        if (this.rawModule.getters) {
            forEachValue(this.rawModule.getters, (key, value) => {
                fn(key, value);
            })
        }
    }






}