<script setup lang="ts">
import ChatMessage from './ChatMessage.vue';
import ChatForm from './ChatForm.vue';
import { useChatView } from '@/composables/useChatView.ts';
import ChatIn from '@/assets/icons/ChatIn.vue';
import ChatOut from '@/assets/icons/ChatOut.vue';

const {
    messageStore,
    authStore,
    userStore,
    showModal,
    selectedCaseId,
    messagesContainer,
    isManager,
    selectClient,
    handleSend,
} = useChatView();


</script>

<template>
    <div class="chat-container">
        <!-- Manager modal -->
        <button v-if="isManager" class="toggle-btn m--0 p--0" @click="showModal = !showModal">
            <ChatIn v-if="showModal" />
            <ChatOut v-else />
        </button>
        
        <div v-if="showModal && isManager" class="clientModal">
            <div 
            v-for="client in userStore.clientList" 
            :key="client.id.id"
            class="client-item ms--4"
            :class="{ active: selectedCaseId === (client.caseId[0]?.id) }"
            @click="selectClient(client.caseId[0]?.id ?? '', client.id.id)">

            {{ client.firstName }} {{ client.lastName }}
            </div>
        </div>

        <!-- Ingen client valgt endnu -->
        <p v-if="isManager && !selectedCaseId"></p>

        <!-- Beskeder -->
        <div class="messages-container" ref="messagesContainer">
            <ChatMessage v-for="message in messageStore.formattedMessages" 
            :key="message.id" :message="message.message"
                :sender="message.senderId.id === authStore.currentUser?.id ? 'self' : 'other'" 
                class="globalmargins" />
        </div>

        <!-- Input -->
        <ChatForm @send="handleSend" class="stickyBottom" />
    </div>
</template>
<style scoped lang="scss">
    @use '@/assets/scss/components/chatContainer';
</style>