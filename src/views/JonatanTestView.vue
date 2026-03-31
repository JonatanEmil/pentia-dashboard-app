<script setup lang="ts">
import '@/assets/scss/main.scss';
import RadioButton from '@/components/RadioButton.vue';
import { ref } from 'vue';

const selected = ref(null);
const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

</script>

<template>
    <RadioButton
        v-for="option in options"
        :key="option"
        v-model="selected"
        :value="option"
    >
        {{ option }}
    </RadioButton>
</template>
