import { defineStore } from 'pinia';
import { ref } from 'vue';
import { db } from '@/config/firebase';
import { collection, getDocs, query, where, doc, getDoc, type DocumentReference } from 'firebase/firestore';
import { useAuthStore } from './authStore.ts';

export interface User {
    id: string
    email: string
    firstName: string
    lastName: string
    password: string
    phoneNumber: string
    role: string
    caseId: DocumentReference[]
    imageId: DocumentReference
}

export const useUserStore = defineStore('user', () => {
    // State
    const userList = ref<User[]>([]);
    const clientList = ref<User[]>([]);
    const currentUser = ref<User | null>(null);

    // Actions
    async function getUserList(): Promise<void> {
        const snapshot = await getDocs(collection(db, 'users'));

        snapshot.forEach((doc) => {
            userList.value.push(doc.data() as User);
        });
    }

    async function getManagerForCase(caseId: string): Promise<string> {
        const q = query(
            collection(db, 'users'),
            where('role', '==', 'manager'),
            where('caseId', 'array-contains', doc(db, 'cases', caseId)),
        );

        const snapshot = await getDocs(q);

        return snapshot.docs[0]?.id ?? '';
    }

    async function getClientsForManager(): Promise<void> {
        const authStore = useAuthStore();

        const managerDoc = await getDoc(doc(db, 'users', authStore.currentUser!.id));
        const caseIds = managerDoc.data()?.caseId as DocumentReference[];

        clientList.value = [];

        for (const caseRef of caseIds) {
            const q = query(
                collection(db, 'users'),
                where('role', '==', 'client'),
                where('caseId', 'array-contains', caseRef),
            );

            const snapshot = await getDocs(q);

            snapshot.docs.forEach((document) => {
                clientList.value.push({
                    
                    ...document.data() as User,
                    id: document.id,
                });
            });
        }
    }

    return {
        userList,
        clientList,
        currentUser,
        getUserList,
        getManagerForCase,
        getClientsForManager,  
    };
});