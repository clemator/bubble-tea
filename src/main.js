import Vue from 'vue'
import App from './App.vue'
import store from './store'
import storageApi from './storageApi'
import VueRouter from 'vue-router'
import TheShopOwnerLayout from './layouts/TheShopOwnerLayout.vue'
import TheUserLayout from './layouts/TheUserLayout.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: TheShopOwnerLayout,
    name: 'shop-view'
  },
  {
    path: '/:user',
    component: TheUserLayout,
    name: 'user-view'
  }
]

const router = new VueRouter({ routes })

new Vue({
  render: h => h(App),
  store,
  router,
  created() {
    storageApi.init()
  }
}).$mount('#app')
