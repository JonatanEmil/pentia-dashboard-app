<script setup lang="ts">
import ChatMessage from './ChatMessage.vue';
import ChatForm from './ChatForm.vue';
import { useChatView } from '@/composables/useChatView.ts';

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
        <button v-if="isManager" @click="showModal = true">Vælg client</button>
        <div v-if="showModal" class="modal">
            <div
                v-for="client in userStore.clientList"
                :key="client.id"
                @click="selectClient(client.caseId[0]?.id ?? '', client.id)"
            >
                {{ client.firstName }} {{ client.lastName }}
            </div>
        </div>

        <!-- Ingen client valgt endnu -->
        <p v-if="isManager && !selectedCaseId">Vælg en client for at se beskeder</p>

        <!-- Beskeder -->
        <div class="messages-container" ref="messagesContainer">
            <ChatMessage
                v-for="message in messageStore.formattedMessages"
                :key="message.id"
                :message="message.message"
                :sender="message.senderId.id === authStore.currentUser?.id ? 'self' : 'other'"
                class="globalmargins"
            />
        </div>

        <!-- Input -->
        <ChatForm @send="handleSend" />
    </div>
</template>