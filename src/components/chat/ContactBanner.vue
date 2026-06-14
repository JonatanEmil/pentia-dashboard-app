<script setup lang="ts">

defineProps<{
    name: string;

}>();

</script>

<template>

<div class="contactBanner">
    <span>{{ name }}</span>
</div>

</template>
<style scoped lang="scss">
    @use '@/assets/scss/components/contactBanner';
</style>