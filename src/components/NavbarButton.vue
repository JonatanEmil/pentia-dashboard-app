<script setup lang="ts">
defineProps<{
  name: string,
  routeName: string,
  svgFilePath: string
}>();


</script>
<template>
    <RouterLink :to="{ name: routeName }">
        <img :src="svgFilePath" alt="Icon">
        <p class="font--p">{{ name }}</p>
    </RouterLink>
</template>