<script setup lang="ts">
defineProps<{
    modelValue: string | null
    value: string
}>();

defineEmits(['update:modelValue']);
</script>

<template>
    <button
        class="radioButton"
        :class="{ active: modelValue === value }"
        @click="$emit('update:modelValue', value)">
        <slot></slot>
    </button>
</template>
