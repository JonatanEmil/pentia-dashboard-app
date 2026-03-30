<script setup lang="ts">
import type { Component } from 'vue';

defineProps<{
  name: string,
  routeName: string,
  svgComponent: Component
}>();


</script>
<template>
    <RouterLink :to="{ name: routeName }" class="navbarButton">
        <component :is="svgComponent"/>
        <p class="font--p">{{ name }}</p>
    </RouterLink>
</template>