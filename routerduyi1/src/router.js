import VueRouter from 'vue-router'
import Vue from 'vue';
import Cookie from './utils/cookie';

Vue.use(VueRouter);

const routes = [{
        //为了在首页直接可以显示这个组件
        path: '/',
        //重定向 redirect:'对应的path'
        redirect: '/demo1'
    }, {
        name: 'demo1',
        //为了让linkActiveClass类在选中别的类时不匹配上这个组件
        path: '/demo1',
        component: () => import('./components/BaseDemo1'),
    }, {
        path: '/demo2',
        component: () => import('./components/BaseDemo2'),
        beforeEnter: (to, from, next) => {
            next();
        }
        // components: {
        //     //命名为minming的路由
        //     minming: () => import('./components/BaseDemo3'),
        //     //如果vue文件上没写name 则默认是default
        //     default: () => import('./components/BaseDemo2')
        // }
    }, {
        path: '/demo3',
        component: () => import('./components/BaseDemo3'),
        meta: {
            login: true
        },
        beforeEnter: (to, from, next) => {
            console.log('beforeEnter demo3');
            next();
        }
    }, {
        path: '/demo4',
        component: () => import( /* webpackChunkName:"demo4-1"*/ './components/BaseDemo4'),
        redirect(to) {
            return {
                name: '4-1',
            }
        },
        meta: {
            login: true
        },
        beforeEnter: (to, from, next) => {
            console.log('beforeEnter demo4');
            next();
        },
        children: [{
            name: '4-1',
            path: "BaseDemo4-1",
            component: () => import( /* webpackChunkName:"demo4-1"*/ './components/BaseDemo4-1')
        }, {
            name: '4-2',
            path: "BaseDemo4-2",
            component: () => import('./components/BaseDemo4-2')
        }, {
            name: '4-3',
            path: "BaseDemo4-3",
            component: () => import('./components/BaseDemo4-3')
        }]
    },
    {
        //具体问题页面
        name: 'question',
        path: '/demo4/question/:id',
        //props为一函数 参数就是$route
        props: route => {
            return {
                id: route.params.id,
                name: route.name
            }
        },
        component: () => import('./components/Question')
    }, {
        path: '/login',
        component: () => import('./components/Login')
    }
]

const router = new VueRouter({
    routes,
    mode: 'history',
    //类名
    linkActiveClass: "link-active",
    //选中完全匹配的类名
    linkExactActiveClass: "link-exact-active",
    scrollBehavior(to, from, savedPosition) {
        console.log(to.hash);
        // return 期望滚动到哪个的位置
        if (to.hash) {
            return {
                selector: to.hash // selector 的 值为 hash值
            }
        }
        return {
            x: 0,
            y: 0
        }
    }
})

//全局路由 beforeEach
router.beforeEach((to, from, next) => {
    console.log('beforeEach');
    //登入状态
    const isLogin = Cookie.isLogin();
    if (isLogin) {
        //已登入
        next();
    } else {
        //未登入
        const loginIn = to.matched.some(item => item.meta.login);
        if (loginIn) {
            const isLogin = window.confirm('查看请登入，要去登入吗？');
            isLogin == true ? next('/login') : next(false);
        } else {
            next();
        }
    }
})

//全局路由 beforeResolve
router.beforeResolve((to, from, next) => {
    console.log('beforeResolve');
    next();
})

//全局路由 afterEach
router.afterEach((to, from) => {
    console.log('afterEach');
})

export default router;