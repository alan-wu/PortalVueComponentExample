import Vue from 'vue'
import App from './App.vue'
import '@abi-software/scaffoldvuer';
import '@abi-software/scaffoldvuer/dist/scaffoldvuer.css';
import '@tehsurfer/csvvuer'
import { Button, Tabs, TabPane } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Button);
Vue.component(Tabs.name, Tabs);
Vue.component(TabPane.name, TabPane);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
