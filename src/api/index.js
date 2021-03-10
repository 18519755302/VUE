import axios from 'axios';
import {
    URLS
} from './URL';

const appkey = 'tingting_1570694553524';

const instance = axios.create({
    baseURL: URLS.baseURL,
    params: {
        appkey
    }
})

//响应拦截器
instance.interceptors.response.use(response => {
    if (response.data.data) {
        return response.data.data;
    }
    // 对响应数据做点什么
    return response.data;
})

//请求拦截器
instance.interceptors.request.use(config => {
    return config;
})

/**
 * 查询数据
 * @param {int} page 第几页的页数， page值至少为1
 * @param {int} size 每页显示的数量， size值至少为1
 */
const queryByPage = (page, size) => {
    return instance.get(URLS.queryByPage, {
        params: {
            page,
            size
        }
    });
}

/**
 * 根据查询条件， 查询数据
 * @param {int} sex sex = -1时男女同时查询.sex = 0 时查询性别为男的同学.sex = 1时查询性别为女的同学
 * @param {String} search 查询的关键字， 允许使用邮箱、 学生学号和地址查询
 * @param {int} page 第几页的页数， page值至少为1
 * @param {int} size 每页显示的数量， size值至少为1
 */
const searchStudents = ({
    sex,
    search,
    page,
    size
}) => {
    return instance.get(URLS.search, {
        params: {
            sex,
            search,
            page,
            size
        }
    })
};

//修改数据（保存）
const update = (student) => {
    return instance.get(URLS.updateStu, {
        params: {
            ...student
        }
    });
};

//新增数据（保存）
const add = (student) => {
    return instance.get(URLS.addStu, {
        params: {
            ...student
        }
    })
};

/**
 * 删除数据
 * @param {String} sNo 学号
 */
const del = (sNo) => {
    return instance.get(URLS.delStu, {
        params: {
            sNo
        }
    })
};

export default {
    queryByPage,
    searchStudents,
    update,
    add,
    del
};