import Vue from 'vue'
import Vuex from 'vuex'

/*安装插件*/
Vue.use(Vuex)

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

const state = {
  cartList:[]
}
/*创建Store对象*/
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

/*挂载Vue实例上*/
export default store
