<script setup lang="ts">
import ItemList from '@/components/ItemList.vue';
import NavbarButton from '@/components/NavbarButton.vue';
import { defineAsyncComponent } from 'vue';

const testList = [
    
    {
        name: 'Tilføj',
        routeName: 'createClient',
        svgComponent: defineAsyncComponent(() => import('@/assets/icons/AddIcon.vue')),
    },
    {
        name: 'Hjem',
        routeName: 'home',
        svgComponent: defineAsyncComponent(() => import('@/assets/icons/HomeIcon.vue')),
    },
    {
        name: 'Tilføj',
        routeName: 'createClient',
        svgComponent: defineAsyncComponent(() => import('@/assets/icons/AddIcon.vue')),
    },
    {
        name: 'Hjem',
        routeName: 'home',
        svgComponent: defineAsyncComponent(() => import('@/assets/icons/HomeIcon.vue')),
    },
    {
        name: 'Tilføj',
        routeName: 'createClient',
        svgComponent: defineAsyncComponent(() => import('@/assets/icons/AddIcon.vue')),
    },
    {
        name: 'Hjem',
        routeName: 'home',
        svgComponent: defineAsyncComponent(() => import('@/assets/icons/HomeIcon.vue')),
    },
    {
        name: 'Tilføj',
        routeName: 'createClient',
        svgComponent: defineAsyncComponent(() => import('@/assets/icons/AddIcon.vue')),
    },
    {
        name: 'Hjem',
        routeName: 'home',
        svgComponent: defineAsyncComponent(() => import('@/assets/icons/HomeIcon.vue')),
    },
    {
        name: 'Tilføj',
        routeName: 'createClient',
        svgComponent: defineAsyncComponent(() => import('@/assets/icons/AddIcon.vue')),
    },
    {
        name: 'Hjem',
        routeName: 'home',
        svgComponent: defineAsyncComponent(() => import('@/assets/icons/HomeIcon.vue')),
    },
    {
        name: 'Tilføj',
        routeName: 'createClient',
        svgComponent: defineAsyncComponent(() => import('@/assets/icons/AddIcon.vue')),
    },
];
</script>

<template>
    <ItemList :items="testList" v-slot="{ item }" :columns="5" :titel="'fancy titel'">
        <NavbarButton 
        :name="item.name" 
        :route-name="item.routeName" 
        :svg-component="item.svgComponent" 
        />
    </ItemList>
</template>

