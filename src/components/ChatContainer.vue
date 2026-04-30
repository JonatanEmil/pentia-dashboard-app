<script setup lang="ts">
import ChatMessage from './ChatMessage.vue';
import ChatForm from './ChatForm.vue';
import { ref, onMounted, computed } from 'vue';
import { useMessageStore } from '@/stores/messageStore.ts';
import { useAuthStore } from '@/stores/authStore.ts';
import { useCaseStore } from '@/stores/caseStore.ts';
import { useUserStore } from '@/stores/userStore.ts';

const messageStore = useMessageStore();
const authStore = useAuthStore();
const caseStore = useCaseStore();
const userStore = useUserStore();

const showModal = ref(false);
const selectedCaseId = ref<string>('');
const selectedRecieverId = ref<string>('');

const isManager = computed(() => authStore.currentUser?.role === 'manager');

onMounted(async () => {
    await caseStore.getCaseList();

    if (isManager.value) {
        await userStore.getClientsForManager();
        
    } else {
        const myCaseId = caseStore.caseList[0]?.caseId ?? '';
        

        const managerId = await userStore.getManagerForCase(myCaseId);
        

        selectedCaseId.value = myCaseId;
        selectedRecieverId.value = managerId;

        if (selectedCaseId.value) {
            messageStore.subscribeToMessages(selectedCaseId.value);
            console.log('6. subscribeToMessages kaldt med:', selectedCaseId.value);
        }
    }
});

function selectClient(caseId: string, clientId: string): void {
    selectedCaseId.value = caseId;
    selectedRecieverId.value = clientId;
    showModal.value = false;
    messageStore.subscribeToMessages(caseId);
}

async function handleSend(message: string): Promise<void> {
    if (selectedCaseId.value) {
        await messageStore.sendMessage(message, selectedCaseId.value, selectedRecieverId.value);
    }
}
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
        <div class="messages-container">
            <ChatMessage
                v-for="message in messageStore.formattedMessages"
                :key="message.id"
                :message="message.message"
                :sender="message.senderId === authStore.currentUser?.id ? 'self' : 'other'"
                class="globalmargins"
            />
        </div>

        <!-- Input -->
        <ChatForm @send="handleSend" />
    </div>
</template>

<style scoped>
.chat-container {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.messages-container {
    flex: 1;
    overflow-y: auto;
}
</style>