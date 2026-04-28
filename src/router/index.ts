import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/LoginView.vue'),
        },
        {
            path: '/createclient',
            name: 'createClient',
            component: () => import('../views/AboutView.vue'),
        },
        {
            path: '/chat',
            name: 'chat',
            component: () => import('../views/AboutView.vue'),
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import('../views/AboutView.vue'),
        },
        {
            path: '/contract',
            name: 'contract',
            component: () => import('../views/AboutView.vue'),
        },
        {
            path: '/calender',
            name: 'calender',
            component: () => import('../views/AboutView.vue'),
        },
        {
            path:'/',
            name: 'clientHome',
            component: () => import('../views/client/HomeView.vue'),
        },
        {
            path: '/Nannatestarea',
            name: 'Nannatestarea',
            component: () => import('../views/NannaTestView.vue'),
        },
        {
            path: '/Jonatantestarea',
            name: 'Jonatantestarea',
            component: () => import('../views/JonatanTestView.vue')
        },
        {
            path: '/valdemartestarea',
            name: 'ValdemarTestArea',
            component: () => import('../views/ValdemarTestView.vue'),
        },
        
    ],
})

export default router
