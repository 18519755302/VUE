import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
const routes = [{
    path: '*',
    redirect: '/list'
}, {
    path: '/list',
    component: () => import("@/components/rightContent/list.vue")
}, {
    path: '/addStudent',
    component: () => import("@/components/rightContent/addStudent.vue")
}];

const router = new VueRouter({
    routes,
    mode: 'history',
    linkExactActiveClass: 'active',
});


export default router;