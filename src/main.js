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
  { path: '/', component: TheShopOwnerLayout},
  { path: '/:user', component: TheUserLayout}
]

const router = new VueRouter({ routes })

new Vue({
  render: h => h(App),
  store,
  router,
  created() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
          .catch(e => { console.error(e.toString()) })
      })
    }

    storageApi.init()
  }
}).$mount('#app')
