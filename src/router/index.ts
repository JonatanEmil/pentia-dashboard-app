import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue'),
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/AboutView.vue'),
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
            path:'/',
            name: 'clientBuildingStep',
            component: () => import('../views/client/BuildingStepView.vue'),
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
        }
    ],
})

export default router
