<script setup lang="ts">
import { useRouter, type RouteParamsRaw, type LocationQueryRaw } from 'vue-router';
import ReturnIcon from '@/assets/icons/ReturnIcon.vue';


defineProps<{
    returnOverwrite?: string,
    returnParams?: RouteParamsRaw,
    returnQuery?: LocationQueryRaw,
}>();
const router = useRouter();

</script>

<template>
    <RouterLink 
        v-if="returnOverwrite" 
        :to="{ name: returnOverwrite, params: returnParams, query: returnQuery }"
        class="returnButton h-fixed--4"
    >
        <ReturnIcon/>
    </RouterLink>
    <button 
        v-else
        @click="router.back()"
        class="returnButton h-fixed--4"
    >
        <ReturnIcon/>
    </button>
</template>
<style scoped lang="scss">

</style>