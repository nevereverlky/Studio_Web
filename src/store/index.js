import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // account: localStorage.getItem('account') ? localStorage.getItem('account') : '',
    // 存储token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
  },
  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin(state, user) {
      // state.account = user.account;
      state.Authorization = user.Authorization
      // localStorage.setItem('account', user.account);
      localStorage.setItem('Authorization', user.Authorization)
    }
  },
  actions: {
  },
  modules: {
  }
})
