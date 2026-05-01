import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { db } from '@/config/firebase';
import { collection, getDocs, query, where, doc, type DocumentReference, getDoc } from 'firebase/firestore';

export interface User {
    id: DocumentReference
    firstName: string
    lastName: string
    phoneNumber: string
    role: string
    imageId: DocumentReference
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
            where('caseId', 'array-contains', doc(db, 'cases', caseId)),
        );

        const snapshot = await getDocs(q);

        return snapshot.docs[0]?.id ?? '';
    }

    async function getUser(uid: string | DocumentReference): Promise<User> {
        uid = typeof uid === 'string' ? doc(db, 'users', uid) : uid;
        const snapshot = await getDoc(uid);

        const data = snapshot.data() as User;

        return {
            id: uid,
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            role: data.role,
            imageId: data.imageId,
            caseId: data.caseId,
        };
    }

    // Returns the state, getters and actions
    return {
        userList,
        currentUser,
        getUser,
        getUserList,
        getManagerForCase,
    };
});

