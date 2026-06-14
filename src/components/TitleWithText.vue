<script setup lang="ts">

defineProps<{
  title: string,
  
}>();


</script>
<template>
    <div class="titleWithText">
        <h1 class="font--h1" v-if="title" >{{ title }}</h1>
        <slot />
    </div>
</template>
<style scoped lang="scss">

</style>