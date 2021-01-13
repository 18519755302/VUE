import Module from './module'


export default class moduleCollection {
    constructor(rawRootModule) {
        this.register([], rawRootModule);
    }

    /**
     * @desc 注册
     * @param {*} rawModule 当前模块
     */
    register(path, currentModule) {

        const _rawmodule = new Module(currentModule);

        //给 moduleCollection赋值 
        if (path.length == 0) {
            //根目录
            this.root = _rawmodule;
        } else {
            //子目录
            //获取父模块
            const parent = this.get(path.slice(0, -1));
            //获取要加入父模块的子模块名
            const moduleName = path[path.length - 1];
            //将子模块放入父模块，子模块状态为 Module
            parent.children[moduleName] = _rawmodule;
        }

        //将currentModule的子类收入root内
        if (currentModule.modules) {
            //获取子模块
            const childrenModules = currentModule.modules;
            //将子模块作为数组
            const childrenArray = Object.keys(childrenModules);
            //将子模块注册
            childrenArray.forEach((moduleName, index) => {
                //根据子模块名字，获取新的路径
                const newPath = path.concat(moduleName);
                this.register(newPath, childrenModules[moduleName])
            })
        }

    }

    /**
     * @desc 根据路径获取模块
     * @param {Array} path 
     */
    get(path) {
        let result = path.reduce((module, curValue) => {
            return module.children[curValue];
        }, this.root);
        return result;
    }

    /**
     * 根据路径得到对应命名空间名字
     * @param {Array} path 
     */
    getNamespace(path) {
        let module = this.root;
        let result = path.reduce((namespace, key) => {
            module = module.getChild(key);
            return namespace + (module.isNamespaced() ? key + "/" : '');
        }, '')
        return result;
    }
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