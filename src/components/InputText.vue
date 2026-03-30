<script setup lang="ts">

import { ref } from 'vue';

defineProps<{
  placeholderText: string
}>();

const inputValue = ref('');


</script>


<template>
    <input type="text" v-model="inputValue" :placeholder="placeholderText" class="inputText"/>

</template>