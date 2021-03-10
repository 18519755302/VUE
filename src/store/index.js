import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../api';


Vue.use(Vuex);

//const pageSize = 5;

export const store = new Vuex.Store({
    strict: true,
    state: {
        showModel: false,
        //每页显示数据条数
        pageSize: 1,
        //显示数据
        list: {},
        //总页数
        total: 1,
        //第几页
        page: 1,
        //学生数据
        student: {},
        //是否是搜索模式
        isSearch: false,
        //搜索词
        searchWord: '',
        //搜索性别 -1为全部 0为男 1为女
        searchSex: -1,
        //查询数据总条数
        queryCount: 0,
        //查询关键字信息总条数
        searchCount: 0
    },
    mutations: {
        //弹出弹窗
        isShowModel(state, flag) {
            state.showModel = flag;
        },
        //储存显示数据
        setList(state, list) {
            state.list = list;
        },
        //储存数据总页数
        setTotal(state, total) {
            state.total = total;
        },
        //获取学生数据
        getStu(state, student) {
            state.student = student;
        },
        //修改学生数据
        updateStu(state, {
            key,
            value
        }) {
            state.student[key] = value;
        },
        //修改当前页
        setPage(state, n) {
            state.page = n;
        },
        //保存各种分页信息
        setPageMsg(state, {
            page,
            total,
            list
        }) {
            //console.log(list, total, page);
            //储存列表显示数据
            this.commit('setList', list);
            //储存数据页数
            this.commit('setTotal', total);
            //储存当前页
            this.commit('setPage', page);
        },
        //设置是否搜索模式
        setSearch(state, is) {
            state.isSearch = is;
        },
        //设置搜索词
        setSearchWord(state, word) {
            state.searchWord = word;
        },
        //设置总数据条数 
        //type为查询数据总条数queryCount 或关键字查询数据总条数searchCount
        setCount(state, {
            type,
            count
        }) {
            state[type] = count;
        }
    },
    actions: {
        async queryByPage(context, page) {
            let {
                findByPage,
                cont
            } = await axios.queryByPage(page, context.state.pageSize);
            let total = Math.ceil(cont / context.state.pageSize);
            //总页数 最少为1
            total = total > 1 ? total : 1;
            //储存分页信息
            context.commit('setPageMsg', {
                page,
                total,
                list: findByPage,
            })
            //设置总条数
            context.commit('setCount', {
                type: 'queryCount',
                count: cont
            })
            //设置为 非搜索模式
            context.commit('setSearch', false);
        },
        async searchByPage(context, {
            search,
            page
        }) {
            console.log('search:', search == undefined ? context.state.searchWord : search);
            let {
                searchList,
                cont
            } = await axios.searchStudents({
                sex: context.state.searchSex,
                search: search == undefined ? context.state.searchWord : search,
                page,
                size: context.state.pageSize
            });
            let total = Math.ceil(cont / context.state.pageSize);
            //总页数 最少为1
            total = total > 1 ? total : 1;
            //储存分页信息
            context.commit('setPageMsg', {
                page,
                total,
                list: searchList
            })
            //设置总条数
            context.commit('setCount', {
                type: 'searchCount',
                count: cont
            })
            //设置为 搜索模式
            context.commit('setSearch', true);
            //搜索词
            context.commit('setSearchWord', search);
        }

    }
})