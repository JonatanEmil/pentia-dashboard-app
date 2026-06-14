<script setup lang="ts">

defineProps<{
    text?: string,
    title?: string,
    routeName?: string,
    routeParams?: { [key: string]: string | number },
}>();


</script>
<template>
    <RouterLink 
        v-if="routeName"
        :to="{ name: routeName, params: routeParams }" 
        class="infoCard p--4"
    >
        <p class="font--p font--underline font--bold m--0" v-if="title">{{ title }}</p>
        <p class="font--p m--0" v-if="text">{{ text }}</p>
    </RouterLink>
    <div 
        v-else
        class="infoCard p--4"
        >
        <p class="font--p font--underline font--bold m--0" v-if="title">{{ title }}</p>
        <p class="font--p m--0" v-if="text">{{ text }}</p>
    </div>

</template>
<style scoped lang="scss">
    @use '@/assets/scss/components/infoCard';
</style>