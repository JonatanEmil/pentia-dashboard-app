<script setup lang="ts">
import ChatContainer from '@/components/chat/ChatContainer.vue';
import ContactBanner from '@/components/chat/ContactBanner.vue';
import { useMessageStore } from '@/stores/messageStore';


const messageStore = useMessageStore();

</script>

<template>
    <div>
        <ContactBanner :name="messageStore.contactName" class="stickyTop p--4" />
        <ChatContainer/>

    </div>
</template>

<style scoped>

</style>