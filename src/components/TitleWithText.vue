<script setup lang="ts">

defineProps<{
  title: string,
  
}>();


</script>
<template>
    <div>
        <h1 class="font--h1" v-if="title" >{{ title }}</h1>
        <slot />
    </div>
</template>