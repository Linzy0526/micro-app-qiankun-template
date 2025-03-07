import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import { router } from './router';
import store from './store';
import "./style.css"

createApp(App)
  .use(router)
  .use(store)
  .use(Antd)
  .mount('#app');