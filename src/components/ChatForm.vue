<script setup lang="ts">
import SpeakToText from './SpeakToText.vue';
import InputText from './InputText.vue';
import FormButtonSubmit from './FormButtonSubmit.vue';
import SendIcon from '@/assets/icons/SendIcon.vue';
import ChatMessage from './ChatMessage.vue';
import { ref, onMounted, computed } from 'vue';
import { useMessageStore } from '@/stores/messageStore.ts';
import { useAuthStore } from '@/stores/authStore.ts';
import { useCaseStore } from '@/stores/caseStore.ts';

const messageStore = useMessageStore();
const authStore = useAuthStore();
const caseStore = useCaseStore();
const inputValue = ref('');
const showModal = ref(false);
const selectedCaseId = ref<string>('');
const selectedRecieverId = ref<string>('');

const isManager = computed(() => authStore.currentUser?.role === 'manager');

onMounted(async () => {
    await caseStore.getCaseList();

    if (!isManager.value && caseStore.caseList.length > 0) {
        selectedCaseId.value = caseStore.caseList[0]?.caseId;
        selectedRecieverId.value = caseStore.caseList[0]?.managerId;
        messageStore.subscribeToMessages(selectedCaseId.value);
    }
});

function selectClient(caseId: string, clientId: string): void {
    selectedCaseId.value = caseId;
    selectedRecieverId.value = clientId;
    showModal.value = false;
    messageStore.subscribeToMessages(caseId);
}

async function handleSend(): Promise<void> {
    if (inputValue.value.trim() && selectedCaseId.value) {
        await messageStore.sendMessage(
            inputValue.value, 
            selectedCaseId.value, 
            selectedRecieverId.value,
        );

        inputValue.value = '';
    }
};
</script>

<template>

   
    <main>
        <!-- Manager knap til at åbne modal -->
        <button v-if="isManager" @click="showModal = true">Vælg client</button>

        <!-- Modal med liste af clients -->
        <div v-if="showModal" class="modal">
            <div
                v-for="c in caseStore.caseList"
                :key="c.caseId"
                @click="selectClient(c.caseId, c.clientId)"
            >
                {{ c.clientName }} — {{ c.roadName }} {{ c.roadNumber }}, {{ c.city }}
            </div>
        </div>

        <!-- Beskeder -->
        <ChatMessage
            v-for="message in messageStore.formattedMessages"
            :key="message.id"
            :message="message.message"
            :sender="message.senderId === authStore.currentUser?.id ? 'self' : 'other'"
            class="globalmargins"
        />

        <!-- Input -->
        <div class="chat-form flex flex--row p--3">
            <SpeakToText v-model="inputValue" language="da-DK" />
            <InputText
                class="p--3"
                placeholder-text="Skriv dit spørgsmål her..."
                v-model="inputValue"
                variant="chat"
            />
            <FormButtonSubmit variant="icon" class="chatButtonSubmit" @click="handleSend">
                <SendIcon />
            </FormButtonSubmit>
        </div>
    </main>
</template>

<style scoped></style>