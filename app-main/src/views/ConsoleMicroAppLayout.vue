<template>
    <div id="micro-app-layout">暂无页面</div>
</template>


<script setup>
import { onMounted } from 'vue';
import { registerMicroApps, start } from "qiankun";

const env = import.meta.env;
const isDev = env.MODE === "development";

onMounted(() => {
    if (!window.qiankunRegisted) {
       window.qiankunRegisted = true;
       registerApp({ appRouterBase: env.VITE_VUE_ROUTER_BASE + 'console/', mircroAppNames: ["app-child-vue3"] });
       start({
        prefetch: "all",
        sandbox: {
            experimentalStyleIsolation: true
            }
        });
    }
});

const registerApp = (option = { appRouterBase: "/", mircroAppNames: [] }) => {
  try {
    registerMicroApps(
    option.mircroAppNames.map((appName) => ({
      name: appName,
      entry: env.VITE_QIANKUN_MIRCRO_APP_ENTRY + (isDev ? '' : appName),
      container: '#micro-app-layout',
      activeRule: option.appRouterBase + appName,
      props: {
        mainAppRouterBase: option.appRouterBase + appName,
      }
    })), {
        beforeLoad: (app) => {
          console.log("before load", app);
        },
        beforeMount: (app) => {
          console.log("before mount", app);
        },
        afterMount: (app) => {
          console.log("after mount", app);
        },
        afterUnmount: (app) => {
          console.log("after unmount", app);
        }
    }
  );
  }  catch (error) {
    console.error('registerMicroApps error', error);
  }
}

</script>