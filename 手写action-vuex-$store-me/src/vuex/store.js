import mixin from './mixin'
import ModuleCollection from './module/module-collection'
import {
    forEachValue,
    isObject,
    isPromise
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

/** 实现mutation
 * 1. 将各个模块上的mutations都统一的放到store上，无论是root上的还是其他子模块上
 *  store._mutations = {
 *    countAdd: [fn, fn],
 *    numAdd: [fn]
 *  }
 * 
 * 2. 如果有命名空间。对应的mutation函数的名字前应该加上命名空间的名字，如：
 *  store._mutations = {
 *    countAdd: [fn],
 *    student/numAdd: [fn]
 *    student/countAdd: [fn]
 *  }
 * 
 * 3. 由于需要commit一个mutation。所以在store上应有commit方法
 * 
 * 4. 在严格模式下，只能通过mutation更改state，通过其他的方式需要报出警告
 */

/**实现action
 * 
 * 1. 将各个模块上的actions都统一的放到store上，无论是root上的还是其他子模块上
 *  store._actions = {
 *    countAdd: [fn, fn],
 *    numAdd: [fn]
 *  }
 * 
 * 2. 如果有命名空间。对应的action函数的名字前应该加上命名空间的名字，如：
 *  store._actions = {
 *    countAdd: [fn],
 *    student/numAdd: [fn]
 *    student/countAdd: [fn]
 *  }
 * 
 * 3. 由于需要dispatch一个action。所以在store上应有dispatch方法
 * dispatch上有6个参数依次为 
 *   3.1当个模块的commit （如果没有命名空间就是主模块的commit）
 *   3.2当个模块的dispatch（如果没有命名空间就是主模块的dispatch）
 *   3.3当个模块的getters（如果没有命名空间就是主模块的getters）
 *   3.4主模块getters rootGetters
 *   3.5主模块state rootState
 *   3.6当个模块state
 * 4. action 函数的返回值应该promise
 * 
 * 5. 如果一个模块拥有命名空间，那么它内部的action函数，在提交mutation/ 分发其他action时，不需要再type前加上命名空间
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

        //实现 mutations
        this._mutations = {};

        //实现 actions
        this._actions = {};
        //实现 在action中调用 commit 和 dispatch
        const store = this;
        const {
            commit,
            dispatch
        } = this;
        this.commit = function (type, payload) {
            return commit.call(store, type, payload);
        }
        this.dispatch = function (type, payload) {
            return dispatch.call(store, type, payload);
        }

        //是否开始严格模式
        this.strict = !!options.strict;

        //判断是否提交mutation去更改状态
        this._commiting = false;




        //将参数moduleCollection 加入state （实现store state）（实现getters）
        installState(this, [], this.state, this.moduleCollection.root);
        //重置vm （实现store state）（实现getters）
        resetStoreVm(this, options.state);
    }

    //用commit方法提交所调用的mutation函数 （实现mutation 3）
    commit(_type, _payload) {
        let {
            type,
            payload
        } = unifyStyle(_type, _payload);
        // 入口函数数组
        let entry = this._mutations[type];
        this._withCommit(() => {
            entry.forEach(fn => fn(payload));
        })
    }

    //通过mutation去改变state （实现mutation 4）
    _withCommit(fn) {
        let commiting = this._commiting;
        this._commiting = true;
        fn();
        this._commiting = commiting;
    }

    //通过调用dispatch 来调用action
    dispatch(_type, _payload) {
        let {
            type,
            payload
        } = unifyStyle(_type, _payload);
        const entry = this._actions[type];
        if (!entry) {
            return;
        }
        //如果result为一个值就直接执行，因为action也为promise组成
        //如果result为很多值则依次执行
        const result = entry > 1 ?
            Promise.all(entry.map(handle => handle(payload))) :
            entry[0](payload);
        return result;
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

    //获得命名空间名字 （实现getters 实现mutation 2）
    let namespace = store.moduleCollection.getNamespace(path);
    //获得本地上下文 （实现getters--实现4.2 实现mutation 1）
    let local = getLocalContext(store, path, namespace);
    //遍历module的getters，得到$store._wrappedGetters（实现getters）
    module.forEachGetters((key, fn) => {
        //实现getters 4.1
        let getterName = namespace + key;
        //注册_wrappedGetters
        //store._wrappedGetters[key] = value; 这样写参数传不进去
        registerGetter(store, getterName, fn, local);
    });

    //遍历mutation 注册_mutations （实现mutation 1）
    module.forEachMutations((name, fn) => {
        let mutationName = namespace + name;
        //注册store._mutations
        registerMutation(store, mutationName, fn, local);
    });

    //遍历actions 注册actions （实现action）
    module.forEachActions((name, fn) => {
        let actionName = namespace + name;
        //注册store._actions
        registerAction(store, actionName, fn, local);
    });

}
/**
 * 注册action（ 实现action）
 * @param {Store} store 
 * @param {String} action名字 
 * @param {*} fn action对应函数
 * @param {*} local action所在环境（具体在哪个模块）
 */
function registerAction(store, actionName, fn, local) {
    const actionArr = store._actions[actionName] || (store._actions[actionName] = []);
    //将方法放于数组中
    actionArr.push((payload) => {
        let res = fn.call(store, {
            'commit': local.commit,
            'dispatch': local.dispatch,
            'getters': local.getters,
            'rootGetters': store.getters,
            'rootState': store.state,
            'state': local.state
        }, payload);
        //由于dispatch为action结果，且为promise，所以现将action全都变为promise
        if (!isPromise(res)) {
            res = Promise.resolve(res);
        }
        return res;
    })
}



/**
 * 注册Mutation（ 实现mutation 1）
 * @param {Store} Store实例 store
 * @param {String} mutationName 
 * @param {*} fn 
 * @param {*} local 
 */
function registerMutation(store, mutationName, fn, local) {
    // 使store._mutations = {
    //      countAdd: [fn, fn],
    //      numAdd: [fn] 
    //  }，方法集中在数组里
    let mutationArr = store._mutations[mutationName] || (store._mutations[mutationName] = []);
    //将方法放于数组中
    mutationArr.push((payload) => {
        //使用call 这样调用fn时的this可以指向store
        fn.call(store, local.state, payload);
    });
}


/**
 * 获取本地上下文（实现getters）（实现mutation)（实现action)
 * @param {Store} Store 实例
 * @param {Array} path 路径
 * @param {String} namespace 命名空间的名字
 */
function getLocalContext(store, path, namespace) {
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
    let local = {
        //为action 提供commit方法 （实现action)
        'commit': noNamespace ? store.commit : (_type, _payload) => {
            let {
                type,
                payload
            } = unifyStyle(_type, _payload);
            const name = namespace + type;
            store.commit(name, payload);
        },
        //为action 提供dispatch方法 （实现action)
        'dispatch': noNamespace ? store.dispatch : (_type, _payload) => {
            let {
                type,
                payload
            } = unifyStyle(_type, _payload);
            const name = namespace + type;
            store.dispatch(name, payload);
        },
    }
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
        },

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
 * 重置vm（ 实现store state）（ 实现getters）（实现mutation）
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

    //实现mutation 4
    //是否开启严格模式（如果开启严格模式，则vuex中state改变必须通过store中commit方法）
    if (store.strict) {
        enableStrictMode(store);
    }


}

/**
 * 统一传来的参数风格（ 实现mutation 3）
 * @param {String or Object}} type 所调用的mutation方法名 如果是对象则是方法名和载荷
 * @param {Object or undefined} payload 载荷
 */
function unifyStyle(type, payload) {
    if (isObject(type)) {
        payload = type;
        type = type.type;
    }
    return {
        type,
        payload
    }
}

/**
 * 开启严格模式（在严格模式下更新state）(实现mutation 4)
 * @param {Store} Store实例 store 
 */
function enableStrictMode(store) {
    store._vm.$watch(
        function () {
            return this.state;
        }, () => {
            //如果state改变，且没有提交commit则报错
            if (!store._commiting) {
                throw new Error('[vuex] do not mutate vuex store state outside mutation handlers.');
            }
        }, {
            //开启深度执行
            deep: true,
            //是否开启同步
            sync: true
        }
    )
}