<script setup lang="ts">

defineProps<{
    message: string
    sender: 'self' | 'other'
   // timestamp:
   //variant?: 'self' | 'other';
}>();

</script>

<template>
<div class="chat-message mx--4" :class="sender">
    <p class="message-content">{{ message }}</p>
    
</div>

</template>