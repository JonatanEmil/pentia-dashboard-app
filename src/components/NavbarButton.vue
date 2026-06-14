<script setup lang="ts">
import type { Component } from 'vue';

defineProps<{
  name?: string,
  routeName: string,
  svgComponent: Component
}>();


</script>
<template>
    <RouterLink :to="{ name: routeName }" class="navbarButton">
        <component :is="svgComponent" class="icon" />
        <p class="font--p" v-if="name" >{{ name }}</p>
    </RouterLink>
</template>
<style scoped lang="scss">
    @use '@/assets/scss/components/navbarButton';

</style>