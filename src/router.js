import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
    
const routes = [
    {
        path: '/',
        name: 'app',
        component: App,
        children: [
            {
                path: '',
                name: 'dashboard',
                component: () => import('./components/Dashboard.vue'),
                meta: { title: "主面板" }
            },
			{
                path: '/log',
                name: 'log',
                component: () => import('./components/Log.vue'),
                meta: { title: "日志" }
            },
            {
                path: '/containergroup',
                name: 'containergroup',
                component: () => import('./components/ContainerGroup.vue'),
                meta: { title: "容器组" }
            },
            {
                path: '/clusternode',
                name: 'clusternode',
                component: () => import('./components/ClusterNode.vue'),
                meta: { title: "集群节点" }
            },
            {
              path: '/setting',
              name: 'setting',
              component: () => import('./components/Setting.vue'),
              meta: { title: "设置" }
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./pages/Login.vue')
    },
    {
        path: '/empty',
        name: 'empty',
        component: () => import('./components/EmptyPage.vue')
    },
    {
        path: '/landing',
        name: 'landing',
        component: () => import('./pages/LandingDemo.vue')
    },
    {
        path: '/error',
        name: 'error',
        component: () => import('./pages/Error.vue')
    },
    {
        path: '/notfound',
        name: 'notfound',
        component: () => import('./pages/NotFound.vue')
    },
    {
        path: '/access',
        name: 'access',
        component: () => import('./pages/Access.vue')
    }
];

const router = createRouter({
    //history: createWebHashHistory(),
  history: createWebHistory(),
    routes,
});

export default router;
