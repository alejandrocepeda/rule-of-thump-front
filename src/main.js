import Vue from 'vue'
import './bootstrap'
import App from './App.vue'
import router from './router'

import { store } from './store'

import fromNow from '@/filters/fromNow'
import formatDate from '@/filters/formatDate'
import BootstrapVue from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2'
import i18n from './i18n'

Vue.use(fromNow)
Vue.use(formatDate)
Vue.use(BootstrapVue)
Vue.use(VueSweetalert2)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/scss/app.scss'

router.beforeEach((to, from, next) => {
    
  const nearestWithTitle = to.matched.slice().reverse().find(record => record.meta && record.meta.title);

  if (nearestWithTitle){
      document.title = to.meta.title
  }

  next();
    
})

store.state._openModal = false

//console.log(store.state.authToken)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
