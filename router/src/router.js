import VueRouter from "vue-router";
import Vue from 'vue'

Vue.use(VueRouter);

const routes = [{
        path: "/",
        component: () => import("./components/BaseDemo1.vue")
    },
    {
        path: "/demo2",
        component: () => import("./components/BaseDemo2.vue")
    },
    {
        path: "/demo3",
        component: () => import("./components/BaseDemo3.vue")
    },
];

const router = new VueRouter({
    //加载 路径 组件
    routes,
    //网络url 不用哈希，用history，普遍来讲，都用这个
    mode: "history",
    //类名
    linkActiveClass: "link-active",
    //选中的类名
    linkExactActiveClass: "link-exact-active",
});
console.log(11111);
export default router;