import VueRouter from 'vue-router'
import Vue from 'vue';
import Demo1 from './components/BaseDemo1'

Vue.use(VueRouter);

const routes = [{
    //为了在首页直接可以显示这个组件
    path: '/',
    //重定向 redirect:'对应的path'
    redirect: '/demo1'
}, {
    //为了让linkActiveClass类在选中别的类时不匹配上这个组件
    path: '/demo1',
    component: () => import('./components/BaseDemo1')
}, {
    path: '/demo2',
    component: () => import('./components/BaseDemo2')
}, {
    path: '/demo3',
    component: () => import('./components/BaseDemo3')
}, {
    path: '/demo4',
    component: () => import('./components/BaseDemo4'),
    redirect(to) {
        return {
            name: '4-1',
        }
    },
    children: [{
        name: '4-1',
        path: "BaseDemo4-1",
        component: () => import('./components/BaseDemo4-1')
    }, {
        name: '4-2',
        path: "BaseDemo4-2",
        component: () => import('./components/BaseDemo4-2')
    }, {
        name: '4-3',
        path: "BaseDemo4-3",
        component: () => import('./components/BaseDemo4-3')
    }]
}]

const router = new VueRouter({
    routes,
    mode: 'history',
    //类名
    linkActiveClass: "link-active",
    //选中完全匹配的类名
    linkExactActiveClass: "link-exact-active"
})

export default router;