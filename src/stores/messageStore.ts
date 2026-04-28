import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { db } from '@/config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { toDanishTime } from '@/utils/toDanishTime';

interface Message {
    message: string
    caseId: string
    senderId: number
    recieverId: number
    timestamp: Date
}


export const useMessageStore = defineStore('message', () => {
    // State
    const messageList = ref<Message[]>([]);


    // Getters
    const formattedMessages = computed(() =>
        messageList.value.map(message => ({
            ...message,
            timestampFormatted: toDanishTime(message.timestamp),
        })),
    );

    // Actions
    async function getMessageList(): Promise<void> {
        const snapshot = await getDocs(collection(db, 'messages'));

        snapshot.forEach((doc) => {
            const data = doc.data();

            messageList.value.push({
                message: data.message,
                caseId: data.caseId.id,
                senderId: data.senderId.id,
                recieverId: data.recieverId.id,
                timestamp: data.timestamp.toDate(),
            });
        });
    }

    // Returns the state, getters and actions
    return {
        messageList,
        formattedMessages,
        getMessageList,
    };
});

