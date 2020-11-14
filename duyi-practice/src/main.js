import Vue from 'vue'
import App from './App.vue'

//生产模式是否需要警告提示
Vue.config.productionTip = false

new Vue({
  //这句是将 vue嵌入到对应有id="app"的html文件中
  render: h => h(App),
}).$mount('#app')