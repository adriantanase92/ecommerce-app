import Vue from 'vue'
import { ValidationProvider } from 'vee-validate';
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import './assets/style/main.scss';

Vue.component('ValidationProvider', ValidationProvider);

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
