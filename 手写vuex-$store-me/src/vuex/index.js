import mixin from './mixin'
import ModuleCollection from './module/module-collection'
let Vue;

//挂载$store
function install(_vue) {
    //混入 得出$store
    mixin(_vue);
    //将_vue赋给全局vue
    Vue = _vue;
}

class Store {
    constructor(options) {
        const _vm = new Vue({
            data: {
                //挂载state 一遍state内部数据修改时，可以重新渲染页面
                state: options.state || {}
            }
        })
        this.state = _vm.state;
        //将参数变为 ModuleCollection
        const moduleCollection = new ModuleCollection(options);
        //将参数moduleCollection 加入state 具体state类型在下面
        installState([], this.state, moduleCollection.root);
    }
}

/**
 * 安装module
 * @param {*} path 路径
 * @param {*} rootState 根模块state
 * @param {*} module 模块
 */
function installState(path, rootState, module) {

    const isRoot = path.length === 0;

    if (!isRoot) {
        //获取父模块
        const parent = getModule(path.slice(0, -1), rootState);
        //获取子模块名称
        const moduleName = path[path.length - 1];
        //向父模块挂载子模块
        parent[moduleName] = module.state;
    }

    //循环遍历module的children，安装state
    Object.keys(module.children).forEach((value, index) => {
        installState(path.concat(value), rootState, module.children[value]);
    });

}

/**
 * 获取对应模块
 * @param {*} path 路径
 * @param {*} rootState 根模块state
 */
function getModule(path, rootState) {
    const result = path.reduce((module, curValue) => {
        return module[curValue];
    }, rootState);
    return result;
}

export default {
    install,
    Store
}

//写的类的具体样式为这样
// const moduleCollection = {
//     root: {
//         state: {
//             count: 0
//         },
//         rawModule: rootModule,
//         children: {
//             student: {
//                 state: {
//                     num: 100
//                 },
//                 rawModule: studentModule,
//                 children: {
//                     a: {
//                         state: {
//                             numa: 101
//                         },
//                         _rawModule: aModule,
//                         _children: {}
//                     }
//                 }
//             }
//         }
//     }
// }

// const state = {
//     state:{
//         count:0,
//         student:{
//           num:100,
//           a:{
//               numa:0
//           }
//         }
//     }
// }