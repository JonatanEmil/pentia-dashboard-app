<script setup lang="ts">

defineProps<{
    variant?: 'default' | 'icon';
}>();

</script>

<template>

    <button type="submit" :class="['formButtonSubmit', variant]">
        <slot></slot>
    </button>

</template>