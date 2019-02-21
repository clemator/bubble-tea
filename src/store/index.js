import Vue from 'vue'
import Vuex from 'vuex'
import messages from './messages'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    messages
  }
})
