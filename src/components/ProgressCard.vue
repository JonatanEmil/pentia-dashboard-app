<script setup lang="ts">
import { type RouteParamsRaw } from 'vue-router';


import ClockIcon from '@/assets/icons/ClockIcon.vue';
import CheckmarkIcon from '@/assets/icons/CheckmarkIcon.vue';

defineProps<{
title: string,
routeName: string,
params: RouteParamsRaw,
status: boolean,
}>();


</script>
<template>
    <div 
        class="progressCard me--5"
        :class="{done: status}"
        >
        <RouterLink 
            :to="{ name: routeName, params: params}"
            class="grid h--100 me--4 ms--3 py--2" 
        >
            <h2 class="font-h2" v-if="title">{{ title }}</h2>
            <h2 class="font-h2" v-else><slot/></h2>
            <CheckmarkIcon 
                :class="{hidden: !status}" 
                class="h-fixed--4"
            />
            <ClockIcon
                :class="{hidden: status}" 
                class="h-fixed--4"
            />
        </RouterLink>
    </div>
</template>
