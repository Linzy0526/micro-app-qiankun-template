// router/index.js
import { UserOutlined } from '@ant-design/icons-vue';

const routes = [
    {
        path: '/user',
        meta: { title: '用户管理', icon: UserOutlined },
        children: [
            {
                path: 'list',
                name: 'UserList',
                component: () => import('../views/user/List.vue'),
                meta: { title: '用户列表' }
            },
            {
                path: 'profile',
                name: 'UserProfile',
                component: () => import('../views/user/Profile.vue'),
                meta: { title: '用户详情' }
            }
        ]
    }
];

export { routes };