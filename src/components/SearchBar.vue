<script setup lang="ts">
import SearchIcon from '@/assets/icons/SearchIcon.vue';
import { ref } from 'vue';

const emit = defineEmits(['searchFetch']);
const fetchContent = ref('');

async function handleSearch(): Promise<void> {
    emit('searchFetch', fetchContent.value);
}

</script>

<template>
    <div>
        <form action=""></form>
        <button @click="handleSearch"><SearchIcon></SearchIcon></button>
        <input type="text" v-model="fetchContent" @keyup.enter="handleSearch">
    </div>
</template>
