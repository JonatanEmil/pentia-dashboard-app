<script setup lang="ts">
import NavbarButton from './NavbarButton.vue';
import { defineAsyncComponent } from 'vue';
import Logo from '@/assets/icons/LogoIcon.vue';
import { useAuthStore } from '@/stores/authStore';
import { useRoute, useRouter } from 'vue-router';

const links = {
    manager:[
        {
            name: 'Hjem',
            routeName: 'managerHome',
            svgComponent: defineAsyncComponent(() => import('@/assets/icons/HomeIcon.vue')),
        },
        {
            name: 'Tilføj',
            routeName: 'createClient',
            svgComponent: defineAsyncComponent(() => import('@/assets/icons/AddIcon.vue')),
        },
        {
            name: 'Besked',
            routeName: 'chat',
            svgComponent: defineAsyncComponent(() => import('@/assets/icons/ChatIcon.vue')),
        },
        {
            name: 'Profil',
            routeName: 'managerProfile',
            svgComponent: defineAsyncComponent(() => import('@/assets/icons/ProfileIcon.vue')),
        },
    ],
    client:[
        {
            name: 'Hjem',
            routeName: 'clientHome',
            svgComponent: defineAsyncComponent(() => import('@/assets/icons/HomeIcon.vue')),
        },
        {
            name: 'Kontrakt',
            routeName: 'clientContract',
            svgComponent: defineAsyncComponent(() => import('@/assets/icons/ContractIcon.vue')),
        },
        {
            name: 'Book',
            routeName: 'clientCalender',
            svgComponent: defineAsyncComponent(() => import('@/assets/icons/CalenderIcon.vue')),
        },
        {
            name: 'Besked',
            routeName: 'chat',
            svgComponent: defineAsyncComponent(() => import('@/assets/icons/ChatIcon.vue')),
        },
        {
            name: 'Profil',
            routeName: 'clientProfile',
            svgComponent: defineAsyncComponent(() => import('@/assets/icons/ProfileIcon.vue')),
        },
    ] };

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();


//Routes the current user to the login page incase their not authenticated anymore
if(!authStore.currentUser){
    router.push({ name: 'login' });
};


</script>
<template>    
    <nav 
        v-if="authStore.currentUser?.role == 'manager' && route.name != 'login'"
        class="navbarContainer flex flex--row flex--just-around flex--align-center"
    >
        <RouterLink :to="{ name: 'createClient' }" class="navbarLogo">
            <component :is="Logo"/>
        </RouterLink>
        <NavbarButton 
            v-for="link in links.manager" 
            :key="link.routeName"

            :name="link.name"
            :routeName="link.routeName"
            :svgComponent="link.svgComponent"
        />
    </nav>

    <nav 
        v-else-if="authStore.currentUser?.role == 'client' && route.name != 'login'"
        class="navbarContainer flex flex--row flex--just-between flex--align-center"
    >        
        <RouterLink :to="{ name: 'createClient' }" class="navbarLogo">
            <component :is="Logo"/>
        </RouterLink>
        <NavbarButton
            v-for="link in links.client" 
            :key="link.routeName"

            :name="link.name"
            :routeName="link.routeName"
            :svgComponent="link.svgComponent"
        />
    </nav>
</template>