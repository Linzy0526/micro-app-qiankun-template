<template>
    <a-layout style="min-height: 100vh">
      <!-- 顶部导航 -->
      <a-layout-header class="header">
        <a-flex align="center">
          <div class="logo">管理系统</div>
            <a-menu v-model:selectedKeys="selectedAppKeys" mode="horizontal" @select="onSelectApp">
              <a-menu-item v-for="item in store.state.appList" :key="item.appName" :title="item.title">
                {{ item.title }}
              </a-menu-item>
            </a-menu>
          </a-flex>
        <div class="user-info">当前用户：Admin</div>
      </a-layout-header>
  
      <a-layout>
        <!-- 左侧菜单 -->
        <a-layout-sider v-model:collapsed="collapsed" collapsible>
          <a-menu v-model:selectedKeys="selectedMenuKeys" theme="dark" mode="inline"  @select="onSelectMenu">
            <template v-for="route in menuRoutes" :key="route.key">
              <a-menu-item v-if="!route.children" :key="route.key">
                <component :is="route.icon" />
                <span>{{ route.title }}</span>
              </a-menu-item>
  
              <a-sub-menu v-else :key="route.key" :title="route.title">
                <template #icon>
                  <component :is="route.icon" />
                </template>
                <a-menu-item v-for="child in route.children" :key="child.key">
                  {{ child.title }}
                </a-menu-item>
              </a-sub-menu>
            </template>
          </a-menu>
        </a-layout-sider>
  
        <!-- 右侧内容 -->
        <a-layout-content class="content">
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </template>
  
  <script setup>
  import { ref, watch, onMounted, computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  
  const store = useStore();
  const route = useRoute();
  const router = useRouter();
  
  const selectedAppKeys = ref(['']);
  const selectedMenuKeys = ref(['']);
  const collapsed = ref(false);
  
  const menuRoutes = computed(() => store.getters.currentAppRouteRole)

  const onSelectMenu = (data) => {
    const currentRoute = store.state.routeRole.find(item => data.key.includes(item.key));
    if (currentRoute) {
      router.push(`/console${currentRoute.path}`);
    }
  }

  const onSelectApp = (data) => {
    const currentApp = store.state.appList.find(item => data.key === item.appName);
    if (currentApp) {
      store.commit('setCurrentAppName', currentApp.appName);
    }
  }

  
  // 监听路由变化更新选中菜单
  watch(() => route.path, (newPath) => {
    const currentRoute = store.state.routeRole.find(item => newPath.includes(item.path));
    if (currentRoute) {
      selectedAppKeys.value = [currentRoute.appName];
      selectedMenuKeys.value = [currentRoute.key];
      store.commit('setCurrentAppName', currentRoute.appName);
    }
  }, { immediate: true });
  
  
  </script>
  
  <style scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    padding: 0 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .logo {
    width: 320px;
    font-size: 20px;
    font-weight: bold;
  }
  
  .content {
    margin: 24px;
    padding: 24px;
    background: #fff;
    min-height: calc(100vh - 64px - 48px);
    overflow-y: auto;
  }
  </style>