import Vue from 'vue'
import App from './App.vue'
import '@abi-software/scaffoldvuer';
import '@abi-software/scaffoldvuer/dist/scaffoldvuer.css';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
