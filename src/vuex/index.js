import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import loginUser from './modules/loginUser'
import permission from './modules/permission'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    loginUser,
    permission
  },
  getters
})

export default store
