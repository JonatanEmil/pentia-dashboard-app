<script setup lang="ts">
import ItemList from '@/components/ItemList.vue';
import NavbarButton from '@/components/NavbarButton.vue';
import { defineAsyncComponent } from 'vue';
import TitleWithText from '@/components/TitleWithText.vue';
import CheckboxWithText from '@/components/CheckboxWithText.vue';
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
    <CheckboxWithText 
        text="Bekræft med en meget lang text for at se hvad der sker når man bare skriver" 
        checked 
        id="das" 
        name="da"
    />
    <TitleWithText
        title="stevo" 
        text="hello world this is the start of a long text"
    />
    <ItemList :items="testList" v-slot="{ item }" :columns="5" :titel="'fancy titel'">
        <NavbarButton 
        :name="item.name" 
        :route-name="item.routeName" 
        :svg-component="item.svgComponent" 
        />
    </ItemList>
</template>

