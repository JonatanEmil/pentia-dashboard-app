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

    if (!isManager.value) {
        selectedCaseId.value = caseStore.caseList[0]?.caseId ?? '';
        selectedRecieverId.value = caseStore.caseList[0]?.managerId ?? '';
        messageStore.subscribeToMessages(selectedCaseId.value);
    };
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
        <button v-if="isManager" @click="showModal = true">Vælg klient</button> 

        <div>
            
        </div>


        <ChatMessage message="Hej, jeg har et spørgsmål?" sender="other" class="globalmargins" />
        <ChatMessage message="Hvad så?" sender="self" class="globalmargins" />
        <div class="chat-form flex flex--row p--3">
            <SpeakToText v-model="inputValue" language="da-DK" />
            <InputText class="p--3" placeholder-text="Skriv dit spørgsmål her..." v-model="inputValue" variant="chat" />
            <FormButtonSubmit variant="icon" class="chatButtonSubmit">
                <SendIcon />
            </FormButtonSubmit>


        </div>
    </main>
</template>

<style scoped></style>