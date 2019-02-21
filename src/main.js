import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  created() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
          .then(() => {
            fetch('/messages')
          })
          .catch(e => { console.log(e.toString()) })
      })
    }
  }
}).$mount('#app')
