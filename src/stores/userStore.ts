import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { db } from '@/config/firebase';
import { collection, getDocs, query, where, doc, type DocumentReference } from 'firebase/firestore';

export interface User {
    email: string
    firstName: string
    lastName: string
    password: string
    phoneNumber: string
    role: string
    caseId: DocumentReference[]
}


export const useUserStore = defineStore('user', () => {
    // State
    const userList = ref<User[]>([]);
    const currentUser = ref<User>();


    // Getters

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
            where('caseId', 'array-contains', doc(db, 'cases', caseId))
        );

        const snapshot = await getDocs(q);

        return snapshot.docs[0]?.id ?? '';
    }

    // Returns the state, getters and actions
    return {
        userList,
        currentUser,
        getUserList,
        getManagerForCase,
    };
});

