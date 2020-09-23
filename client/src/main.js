import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import moment from 'moment'
import titleMixin from './mixins/titleMixin'

Vue.use(BootstrapVue)
Vue.mixin(titleMixin)
Vue.config.productionTip = false

Vue.filter('formatDateTime', function(value) {
  if (value) {
    return moment(String(value)).format('YYYY-MM-DD hh:mm A')
  }
})

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('YYYY-MM-DD')
  }
})

Vue.filter('formatTime', function(value) {
  if (value) {
    return moment(String(value)).format('HH:mm')
  }
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
