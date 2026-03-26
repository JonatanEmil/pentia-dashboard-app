<script setup lang="ts">
defineProps<{
  name: string,
  url: string,
  svgFilePath: string
}>();


</script>
<template>
    <RouterLink :to="url">
        <img :src="svgFilePath" alt="Icon">
        <p class="font--p">{{ name }}</p>
    </RouterLink>
</template>