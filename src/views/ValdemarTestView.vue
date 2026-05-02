<script setup lang="ts">
import ItemList from '@/components/ItemList.vue';
import NavbarButton from '@/components/NavbarButton.vue';
import { defineAsyncComponent } from 'vue';
import TitleWithText from '@/components/TitleWithText.vue';
import ProgressCard from '@/components/ProgressCard.vue';
import InfoCard from '@/components/InfoCard.vue';
import CarouselContainer from '@/components/CarouselContainer.vue';
import ReturnButton from '@/components/common/ReturnButton.vue';
import { useUserStore } from '@/stores/userStore';
import LinkButton from '@/components/LinkButton.vue';
import BuildingStepContent from '@/components/BuildingStepContent.vue';

const testList = [
    
    {
        name: 'Tilføj',
        routeName: 'createClient',
        svgComponent: defineAsyncComponent(() => import('@/assets/icons/AddIcon.vue')),
    },
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
        name: 'Hjem',
        routeName: 'login',
        svgComponent: defineAsyncComponent(() => import('@/assets/icons/HomeIcon.vue')),
    },
    {
        name: 'Tilføj',
        routeName: 'createClient',
        svgComponent: defineAsyncComponent(() => import('@/assets/icons/AddIcon.vue')),
    },
];




const userStore = useUserStore();

function getUsers(): void {
    userStore.getUserList();
}


</script>

<template>
    <main>
        <LinkButton  routeName="login" title="Byggetilladelse" variant="" color="dark"/>

        <button @click="getUsers">Update User</button>
        <p v-for="(user, index) in userStore.userList" :key="index">
            User ID: {{ user.firstName }}
        </p>
    <ReturnButton returnOverwrite="clientHome" />
    <CarouselContainer :gap="5" :startIndex="1">
        <InfoCard
            text="a extremely fancy body text with loads of texttically wraps to the next line"
            title="a very fancy title with lots of text"/>
        <InfoCard 
            text="a extremely fancy body text with loads of tetically wraps to the next line"
            title="a very fancy title with lots of text"/>
        <InfoCard 
        text="a extremely fancy body text with loads of text thatally wraps to the next line"
        title="a very fancy title with lots of text"/>
    </CarouselContainer>

    <ProgressCard text="a fancy link" routeName="login" status="done"/>
    <br>
    <ProgressCard text="a fancy link" routeName="login" status="planned"/>


    <TitleWithText
        title="stevo" 
        text="hello world this is the start of a long text"
    />
    <ItemList :items="testList" v-slot="{ item }" :columns="5" :title="'fancy title'">
        <NavbarButton 
        :name="item.name" 
        :route-name="item.routeName" 
        :svg-component="item.svgComponent" 
        />
    </ItemList>
    </main>
</template>

