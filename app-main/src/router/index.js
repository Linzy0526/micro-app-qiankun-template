// router/index.js
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue'),
    },
    {
        path: '/console',
        name: 'Console',
        component: () => import('../views/ConsoleLayout.vue'),
        redirect: '/console/dashboard',
        children: [
            {
                path: 'dashboard',
                name: 'ConsoleDashboardp',
                component: () => import('../views/ConsoleDashboard.vue'),
            },
            {
                path: ':pathMatch(.*)*',
                name: 'ConsoleMicroApp',
                component: () => import('../views/ConsoleMicroAppLayout.vue'),
            },
        ]
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_VUE_ROUTER_BASE),
    routes
});

export { router, routes };