<script setup lang="ts">

defineProps<{
  title: string,
  text: string,
}>();


</script>
<template>
    <div>
        <h1 class="font--h1" v-if="title" >{{ title }}</h1>
        <p class="font--p" v-if="text" >{{ text }}</p>
    </div>
</template>