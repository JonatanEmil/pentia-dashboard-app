<script setup lang="ts">
import NavbarButton from './NavbarButton.vue';
import { defineAsyncComponent, ref } from 'vue';
import Logo from '@/assets/icons/LogoIcon.vue';

const links = {
    manager:[
        {
            name: 'Hjem',
            routeName: 'login',
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
            routeName: 'profile',
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
            routeName: 'contract',
            svgComponent: defineAsyncComponent(() => import('@/assets/icons/ContractIcon.vue')),
        },
        {
            name: 'Book',
            routeName: 'calender',
            svgComponent: defineAsyncComponent(() => import('@/assets/icons/CalenderIcon.vue')),
        },
        {
            name: 'Besked',
            routeName: 'chat',
            svgComponent: defineAsyncComponent(() => import('@/assets/icons/ChatIcon.vue')),
        },
        {
            name: 'Profil',
            routeName: 'profile',
            svgComponent: defineAsyncComponent(() => import('@/assets/icons/ProfileIcon.vue')),
        },
    ] };

const navToggle = ref(true);

</script>
<template>
    <!-- true hvis man er logget ind som manager -->
    <button v-on:click="navToggle = !navToggle" style="position: absolute; top: 0; right: 0;">
        Change nav view
    </button>
    
    <nav 
        v-if="navToggle"
        class="navbarContainer flex flex--row flex--just-around flex--align-center"
    >
        <RouterLink :to="{ name: 'login' }" class="navbarLogo">
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
        v-else
        class="navbarContainer flex flex--row flex--just-between flex--align-center"
    >        
        <RouterLink :to="{ name: 'login' }" class="navbarLogo">
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