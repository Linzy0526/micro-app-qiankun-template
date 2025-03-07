import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import { routes } from './router';
import "./style.css"
import { renderWithQiankun, qiankunWindow } from "vite-plugin-qiankun/dist/helper";
import { createWebHistory, createRouter } from "vue-router";


let router = null;
let instance = null;
let history = null;
const isQiankunWindow = !!qiankunWindow?.__POWERED_BY_QIANKUN__;

const env = import.meta.env;
function render(props = {}) {
  const { container, mainAppRouterBase } = props;
  history = createWebHistory(isQiankunWindow ? mainAppRouterBase : env.VITE_VUE_ROUTER_BASE);
  router = createRouter({
    history,
    routes: routes,
  });

  instance = createApp(App);
  instance.config.globalProperties.globlePrefix = env.VITE_APP_NAME;

  instance
    .use(Antd)
    .use(router);
  instance.mount(container ? container.querySelector("#micro-app") : document.getElementById("micro-app"));
}

isQiankunWindow &&
  renderWithQiankun({
    mount(props) {
      render(props);
    },
    bootstrap() {
      console.log("bootstrap");
    },
    unmount() {
      console.log("vite被卸载了");
      instance.unmount();
      instance._container.innerHTML = "";
      history.destroy(); // 不卸载  router 会导致其他应用路由失败
      router = null;
      instance = null;
    },
    update() {
      console.log("vite update");
    }
  });

!isQiankunWindow && render();
