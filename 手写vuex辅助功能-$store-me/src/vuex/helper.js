import {
    isObject
} from './util'


/**
 * @param {String} namespace - 模块的命名空间
 * @param {Object|Array} states - 要获取的state
 * @return {object}
 * 用法：
 *  1. 无命名空间
 *    mapState(['count'])
 *    mapState({ 
 *      conuntAlias: 'count',
 *      countPlusLocalState (state, getters) {
 *        // this -> vm
 *        return state.count + this.lcoalCount
 *      }
 *    })
 *  2. 有命名空间
 *    mapState('namespace', ['count'])
 *    mapState('namespace', { 
 *      conuntAlias: 'count',
 *      countPlusLocalState (state, getters) {
 *        // this -> vm
 *        return state.count + this.lcoalCount
 *      }
 *    })
 */
export const mapState = normalNameSpace((nameSpace, states) => {
    let res = {};
    normalMap(states).forEach(({
        key,
        val
    }) => {
        res[key] = function () {
            let state = this.$store.state;
            let getters = this.$store.getters;
            if (nameSpace) {
                //获取所在module
                let module = getModule(this.$store, nameSpace, 'mapState');
                state = module.context.state;
                getters = module.context.getters;
            }
            //console.log(val);
            return typeof val === 'function' ?
                val.call(this.store, state, getters) : state[val];
        }
    })
    return res;
})

/**
 * @param {String} namespace 
 * @param {Object|Array} getters 
 * @return {Object}
 *  用法：
 *  1. 无命名空间
 *    mapGetters(['countDouble'])
 *    mapGetters({ 
 *      conuntDoubleAlias: 'countDouble',
 *    })
 *  2. 有命名空间
 *    mapState('namespace', ['countDouble'])
 *    mapState('namespace', { 
 *      conuntDoubleAlias: 'countDouble',
 *    })
 */
export const mapGetters = normalNameSpace((nameSpace, states) => {
    let res = {};
    normalMap(states).forEach(({
        key,
        val
    }) => {
        val = nameSpace + val;
        res[key] = function () {
            if (nameSpace && !getModule(this.$store, nameSpace, 'mapGetters')) {
                return;
            }
            if (!(val in this.$store.getters)) {
                console.error(`[vuex] unkown getter: ${val}`);
                return;
            }
            return this.$store.getters[val];
        }
    })
    return res;
})


/**
 * @param { String } namespace
 * @param { Object|Array } mutations
 * @return { Object } 对象形式的第二个参数的成员可以是一个函数。function(commit: function, ...args: any[])
 * 用法：
 *  1. 无命名空间
 *    mapMutations([''])
 *    mapMutations({ 
 *      conuntDoubleAlias: 'countDouble',
 *    })
 *  2. 有命名空间
 *    mapMutations('namespace', ['count'])
 *    mapMutations('namespace', {
 *      conuntDoubleAlias: 'countDouble',
 *    })
 */
export const mapMutations = normalNameSpace((nameSpace, states) => {
    let res = {};
    normalMap(states).forEach(({
        key,
        val
    }) => {
        res[key] = function (...arg) {
            let commit = this.$store.commit;
            if (nameSpace) {
                let module = getModule(this.$store, nameSpace, 'mapMutations');
                if (!module) {
                    return;
                }
                commit = module.context.commit;
            }
            commit.call(this.$store, val, ...arg);
        }
    })
    return res;
})
/**
 * @param { String } namespace
 * @param { Object|Array } mutations
 * @return { Object } 
 * 用法：
 *  1. 无命名空间
 *    mapActions([''])
 *    mapActions({ 
 *      conuntDoubleAlias: 'countDouble',
 *    })
 *  2. 有命名空间
 *    mapActions('namespace', ['count'])
 *    mapActions('namespace', { 
 *      conuntDoubleAlias: 'countDouble',
 *    })
 */

export const mapActions = normalNameSpace((nameSpace, states) => {
    let res = {};
    normalMap(states).forEach(({
        key,
        val
    }) => {
        res[key] = function (...arg) {
            let dispatch = this.$store.dispatch;
            if (nameSpace) {
                let module = getModule(this.$store, nameSpace, 'mapActions');
                if (!module) {
                    return;
                }
                dispatch = module.context.dispatch;
            }
            dispatch.call(this.$store, val, ...arg);
        }
    })
    return res;
})

/**
 * 通过命名空间获取module
 * @param {String} nameSpace 命名空间
 * @param {Store} Store实例 store
 * @param {String} fnName 需要获得module的功能名字
 */
function getModule(store, nameSpace, fnName) {
    let module = store._modulesNamespaceMap[nameSpace];
    if (!module) {
        console.error(`[vuex] module namespace nout found in ${fnName}(): ${nameSpace}`);
    }
    return module;
}


/**
 * 标准化命名空间sq
 * 使nameSpace就为命名空间的值， map就为所选值
 * @param {function} fn 最终要执行函数
 */
function normalNameSpace(fn) {
    return (nameSpace, map) => {
        if (Array.isArray(nameSpace) || isObject(nameSpace)) {
            map = nameSpace;
            nameSpace = '';
        } else if (nameSpace.charAt(nameSpace.length - 1) !== '/') {
            nameSpace = nameSpace + '/'
        }
        return fn(nameSpace, map);
    };
}

/**
 * 标准化map
 * 如果map是数组 [1,2] 则返回[{key:1,val:1},{key:2,val:2}]
 * 如果map是对象 {a:1,b:2} 则返回[{key:a,val:1},{key:b,val:2}]
 * @param {所选值} map 
 */
function normalMap(map) {
    if (!isValidMap(map)) {
        console.log('map中没有对应值');
        return;
    }
    return Array.isArray(map) ? map.map(key => ({
        key,
        'val': key
    })) : Object.keys(map).map(key => ({
        key,
        'val': map[key]
    }));
}

/**
 * 校验map是否合法（是否为对象或数组）
 * @param {*} map
 * @return {Boolean} 
 */
function isValidMap(map) {
    return Array.isArray(map) || isObject(map);
}