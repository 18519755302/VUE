import Vue from 'vue';
import tips from './index.vue';

// Toast 本质上和Vue是一样的, 不一样的地方在于 Toast 里面有些基本的内容，内容来自toast
// tips 经Vue.extend后变为类
let Toast = Vue.extend(tips);

//msg 为提示内容  type:suc表示成功 fail表示失败
export const toast = ({
    type,
    msg
}) => {
    let app = new Toast({
        el: document.createElement('div'),
        data() {
            return {
                type,
                msg
            }
        }
    });

    document.body.appendChild(app.$el);
    app.flag = true;
    app.show = true;
    //浮动框停留时间
    setTimeout(() => {
        app.show = false;
    }, 3000)
    setTimeout(() => {
        app.flag = false;
    }, 4000)
};