<script setup lang="ts">

defineProps<{
  placeholderText: string
  modelValue?: string
  variant?: 'default' | 'chat'; // Tilføj 'chat' variant for at anvende chat-styling
}>();

const emit = defineEmits<{
  (e: 'update:modelValue' , value: string ): void;
}>();

</script>

<template>
    <input 
    type="text" 
    :value="modelValue"
    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)" 
    :placeholder="placeholderText" 
    class="inputText"/>

</template>