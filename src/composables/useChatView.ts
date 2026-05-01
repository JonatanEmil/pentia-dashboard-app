import { ref, onMounted, computed, nextTick, watch, type Ref, type ComputedRef } from 'vue';
import { useMessageStore } from '@/stores/messageStore.ts';
import { useAuthStore } from '@/stores/authStore.ts';
import { useCaseStore } from '@/stores/caseStore.ts';
import { useUserStore } from '@/stores/userStore.ts';

interface ChatView {
    messageStore: ReturnType<typeof useMessageStore>;
    authStore: ReturnType<typeof useAuthStore>;
    userStore: ReturnType<typeof useUserStore>;
    showModal: Ref<boolean>;
    selectedCaseId: Ref<string>;
    messagesContainer: Ref<HTMLElement | null>;
    isManager: ComputedRef<boolean>;
    selectClient: (caseId: string, clientId: string) => void;
    handleSend: (message: string) => Promise<void>;
}

export function useChatView(): ChatView {
    const messageStore = useMessageStore();
    const authStore = useAuthStore();
    const caseStore = useCaseStore();
    const userStore = useUserStore();

    const showModal = ref(false);
    const selectedCaseId = ref<string>('');
    const selectedRecieverId = ref<string>('');
    const messagesContainer = ref<HTMLElement | null>(null);


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

    async function scrollToBottom(): Promise<void> {
        await nextTick();
        if (messagesContainer.value) {
            messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
        }
    }

    watch(() => messageStore.formattedMessages, scrollToBottom, { deep: true });

    return {
        messageStore,
        authStore,
        userStore,
        showModal,
        selectedCaseId,
        messagesContainer,
        isManager,
        selectClient,
        handleSend,
    };

};