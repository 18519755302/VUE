import mixin from './mixin'
import ModuleCollection from './module/module-collection'
import {
    forEachValue
} from './util'

/** 实现getters
 * 1. 将各个模块上的getters都统一的放到store上，无论是root上的还是其他子模块上
 *   this._wrappedGetters = {
 *     countDouble (state) { return state.count * 2},
 *     numDouble (state) { return state.num * 2}
 *   },
 * 2. 通过_wrappedGetters 得到 $store.getters
 * 3. getters应该是vm上的计算属性
 * 4. 要考虑命名空间的问题，加上命名空间，会发生两个改变：
 * 4.1 getter中的属性名字前面需要加上 模块的名字， 比如说： $store.getters['student/numDouble'] 
 * student为模块名 numDouble为属性名
 * 4.2 getter 函数接收的参数有改变，
 * 分别是 本模块的state，本模块的getters，根模块的state，根模块的getters
 * 4.2.1 不管有没有命名空间，都显示本模块的state，根模块就显示主模块的state，模块就显示模块的state
 * 4.2.2 有命名空间的话，是本模块getters，没有的话，无论写在哪，都是是根模块getters
 * 4.2.3 根模块state
 * 4.2.4 根模块getters
 */



let Vue;
//挂载$store
export function install(_vue) {
    //混入 得出$store
    mixin(_vue);
    //将_vue赋给全局vue
    Vue = _vue;
}

export class Store {
    constructor(options) {
        //将参数变为 ModuleCollection （实现store state）
        this.moduleCollection = new ModuleCollection(options);
        //获取主干root上的state （实现store state）
        this.state = this.moduleCollection.root.state;

        //通过这个变量给$store.getters赋值 （实现getters）
        this._wrappedGetters = {};

        //getters缓存 ***
        this._makeLocalGetterCache = {};

        //将参数moduleCollection 加入state （实现store state）（实现getters）
        installState(this, [], this.state, this.moduleCollection.root);
        //重置vm （实现store state）（实现getters）
        resetStoreVm(this, options.state);
    }
}

/**
 * 安装module
 * @store {Store} Store实例
 * @param {Array} path 路径
 * @param {Object} rootState 根模块state
 * @param {Object} module 模块
 */
function installState(store, path, rootState, module) {

    const isRoot = path.length === 0;
    if (!isRoot) {
        //获取父模块
        const parent = getModuleState(path.slice(0, -1), rootState);
        //获取子模块名称
        const moduleName = path[path.length - 1];
        //向父模块挂载子模块
        parent[moduleName] = module.state;
    }

    //循环遍历module的children，安装state （实现store state）
    module.forEachChild((key) => {
        installState(store, path.concat(key), rootState, module.children[key]);
    });

    //获得命名空间名字 （实现getters）
    let namespace = store.moduleCollection.getNamespace(path);
    //获得本地上下文 （实现getters 实现4.2）
    let local = getLocalContext(store, path, namespace);
    //遍历module的getters，得到$store._wrappedGetters（实现getters）
    module.forEachGetters((key, fn) => {
        //实现getters 4.1
        let getterName = namespace + key;
        //注册_wrappedGetters
        //store._wrappedGetters[key] = value; 这样写参数传不进去
        registerGetter(store, getterName, fn, local);
    });
}

/**
 * 获取本地上下文（实现getters）
 * @param {Store} Store 实例
 * @param {Array} path 路径
 * @param {String} namespace 命名空间的名字
 */
function getLocalContext(store, path, namespace) {
    let local = {};
    let noNamespace = namespace === '';
    // //安装state
    // Object.defineProperty(local, 'state', {
    //     get: () => {
    //         return getModuleState(path, store.state);
    //     },
    //     enumerable: true
    // })

    // //安装getters
    // Object.defineProperty(local, 'getters', {
    //     get() {
    //         return noNamespace ? store.getters : getLocalGetters(store, namespace);
    //     },
    //     enumerable: true
    // })
    //安装state 和 安装getters 也可写在一起
    Object.defineProperties(local, {
        'state': {
            get: () => {
                return getModuleState(path, store.state);
            },
            enumerable: true
        },
        'getters': {
            get() {
                return noNamespace ? store.getters : getLocalGetters(store, namespace);
            },
            enumerable: true
        }
    })


    return local;
}

/**
 * 获取本都getters（ 实现getters）
 * @param {Store} Store 实例
 * @param {String} namespace 命名空间名称
 */
function getLocalGetters(store, namespace) {
    //store._makeLocalGetterCache为添加的缓存
    if (!store._makeLocalGetterCache[namespace]) {
        let getters = {};
        let splitPos = namespace.length;
        Object.keys(store.getters).forEach(getterName => {
            if (getterName.slice(0, splitPos) !== namespace) {
                return;
            }
            let fnName = getterName.slice(splitPos);
            Object.defineProperty(getters, fnName, {
                get() {
                    return store.getters[getterName];
                },
                enumerable: true
            })
        });
        store._makeLocalGetterCache[namespace] = getters;
    }
    return store._makeLocalGetterCache[namespace];
}

/**
 * 注册getters（ 实现getters）
 * @param {Store} Store实例 
 * @param {*} local 
 * @param {函数名} fnName 
 * @param {函数} fn 
 */
function registerGetter(store, fnName, fn, local) {
    store._wrappedGetters[fnName] = function (store) {
        return fn(local.state, local.getters, store.state, store.getters);
    }
}

/**
 * 获取对应模块State（ 实现store state）（ 实现getters）
 * @param {*} path 路径
 * @param {*} rootState 根模块state
 */
function getModuleState(path, rootState) {
    const result = path.reduce((module, curValue) => {
        return module[curValue];
    }, rootState);
    return result;
}

/**
 * 重置vm（ 实现store state）（ 实现getters）
 * @param {*} store store实例
 * @param {*} state state值
 */
function resetStoreVm(store, state) {
    let computed = {
        // countDouble () { return wrappedGetters['countDouble'](); }
    };
    let wrappedGetters = store._wrappedGetters;
    store.getters = {};

    forEachValue(wrappedGetters, (key, fn) => {
        //安装computed
        computed[key] = function () {
            return fn(store);
        }
        //安装store.getters
        Object.defineProperty(store.getters, key, {
            get() {
                return store._vm[key];
            },
            enumerable: true
        })
    })
    store._vm = new Vue({
        data: {
            //挂载state 一遍state内部数据修改时，可以重新渲染页面
            state: state
        },
        computed
    })
}