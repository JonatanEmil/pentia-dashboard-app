<script setup lang="ts">
defineProps<{
text?: string,
title?: string,
}>();


</script>
<template>
    <div class="infoCard p--4">
        <p class="font--p font--underline font--bold m--0" v-if="title">{{ title }}</p>
        <p class="font--p m--0" v-if="text">{{ text }}</p>
    </div>
</template>