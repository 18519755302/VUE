export default class Module {
    constructor(currentModule) {
        this.rawModule = currentModule || {};
        this.state = currentModule.state || {};
        this.children = currentModule.modules || {};
    }

    /**
     * @desc 得到一个子模块
     * @param key 
     */
    getChild(key) {
        return this.children[key];
    }
}