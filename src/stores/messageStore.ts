import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { db } from '@/config/firebase';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, where, doc, type DocumentReference, getDocs } from 'firebase/firestore';
import { toDanishTime } from '@/utils/toDanishTime';
import { useAuthStore } from './authStore.ts';

interface Message {
    id: string
    message: string
    caseId: DocumentReference
    senderId: DocumentReference
    recieverId: DocumentReference
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
    async function subscribeToMessages(caseId: string | DocumentReference): Promise<void> {

        const caseRef = typeof caseId === 'string' ? doc(db, 'cases', caseId) : caseId;

        const q = query(
            collection(db, 'messages'),
            where('caseId', '==', caseRef),
            orderBy('timestamp'),
        );

        const snapshot = await getDocs(query(collection(db, 'messages'), where('caseId', '==', caseRef)));

        console.log(snapshot);

        messageList.value = snapshot.docs.map(doc => ({
            id: doc.id,
            message: doc.data().message,
            caseId: doc.data().caseId,
            senderId: doc.data().senderId,
            recieverId: doc.data().recieverId,
            timestamp: doc.data().timestamp.toDate(),

        }));
        messageList.value.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    }

    async function sendMessage(
        message: string,
        caseId: string | DocumentReference,
        recieverId: string | DocumentReference):
        Promise<void> {

        caseId = typeof caseId === 'string' ? doc(db, 'cases', caseId) : caseId;

        const authStore = useAuthStore();
        const senderRef = typeof authStore.currentUser?.id === 'string' ? doc(db, 'users', authStore.currentUser?.id) : authStore.currentUser?.id;
        const recieverRef = typeof recieverId === 'string' ? doc(db, 'users', recieverId) : recieverId;

        const newEntry = await addDoc(collection(db, 'messages'), {
            message: message,
            caseId: caseId,
            senderId: senderRef,
            recieverId: recieverRef,
            timestamp: serverTimestamp(),
        });
        
        await subscribeToMessages(caseId);
    }

    // Returns the state, getters and actions
    return {
        messageList,
        formattedMessages,
        subscribeToMessages,
        sendMessage,
    };
});

