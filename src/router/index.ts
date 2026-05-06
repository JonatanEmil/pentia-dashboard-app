import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'login',
            component: () => import('@/views/LoginView.vue'),
        },
        {
            path: '/chat',
            name: 'chat',
            component: () => import('@/views/ChatView.vue'),
        },
        // Manager routes
        {
            path: '/manager',
            redirect: { name: 'managerHome' },
            children: [
                {
                    path: 'home',
                    name: 'managerHome',
                    component: () => import('@/views/manager/HomeView.vue')

                },
                {
                    path: 'profile',
                    name: 'managerProfile',
                    component: () => import('@/views/manager/ProfileView.vue')
                },
                {
                    path: 'createClient',
                    name: 'createClient',
                    component: () => import('@/views/manager/CreateClientView.vue')
                },
                {
                    path: 'clientList',
                    name: 'clientList',
                    component: () => import('@/views/manager/ClientView.vue')
                },
                {
                    path: 'buildingSteps:priority',
                    name: 'managerBuildingSteps',
                    component: () => import('@/views/manager/BuildingStepView.vue')
                },
                {
                    path: 'folder',
                    name: 'managerFolder',
                    component: () => import('@/views/manager/FolderView.vue')
                },
            ],

        },


        // Client routes
        {
            path: '/client',
            redirect: { name: 'clientHome' },
            children: [
                {
                    path: 'home',
                    name: 'clientHome',
                    component: () => import('@/views/client/HomeView.vue')
                },
                {
                    path: 'profile',
                    name: 'clientProfile',
                    component: () => import('@/views/client/ProfileView.vue')
                },
                {
                    path: 'buildingSteps/:priority',
                    name: 'clientBuildingSteps',
                    component: () => import('@/views/client/BuildingStepView.vue')
                },
                {
                    path: 'calender',
                    name: 'clientCalender',
                    component: () => import('@/views/client/CalenderView.vue')
                },
                {
                    path: 'bookingConfirmation',
                    name: 'clientBookingConfirmation',
                    component: () => import('@/views/client/BookingConfirmationView.vue')
                },
                {
                    path: 'contract',
                    name: 'clientContract',
                    component: () => import('@/views/client/ContractView.vue')
                },
            ],
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

});



export default router
