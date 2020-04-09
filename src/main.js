import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"
import totast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

/*添加事件总线对象*/
Vue.prototype.$bus = new Vue()

Vue.use(totast)

/*解决移动端300ms延迟*/
FastClick.attach(document.body)

Vue.use(VueLazyLoad)

/*注册bus 事件总线*/
Vue.prototype.$bus =  new Vue()
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
