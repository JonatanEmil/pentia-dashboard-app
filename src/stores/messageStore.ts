import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { db } from '@/config/firebase';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, where } from 'firebase/firestore';
import { toDanishTime } from '@/utils/toDanishTime';
import { useAuthStore } from './authStore.ts';

interface Message {
    message: string
    caseId: string
    senderId: string
    recieverId: string
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
    function subscribeToMessages(caseId: string): void {
        const q = query(
            collection(db, 'messages'),
            where('caseId', '==', caseId),
            orderBy('timestamp'),
        );

        onSnapshot(q, (snapshot) => {
            messageList.value = snapshot.docs.map(doc => ({
                id: doc.id,
                message: doc.data().message,
                caseId: doc.data().caseId,
                senderId: doc.data().senderId,
                recieverId: doc.data().recieverId,
                timestamp: doc.data().timestamp.toDate(),

            }));
        });

    }

    async function sendMessage(message: string, caseId: string, receiver: string): Promise<void> {
        
    }

    // Returns the state, getters and actions
    return {
        messageList,
        formattedMessages,
        getMessageList,
    };
});

