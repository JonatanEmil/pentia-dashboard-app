import { defineStore } from 'pinia';
import { ref } from 'vue';
import { db } from '@/config/firebase';
import { collection, DocumentReference, getDocs, query, where, doc, getDoc, documentId } from 'firebase/firestore';
import { useAuthStore } from './authStore';

/**
 * Represents a user document stored in Firestore.
 */
export interface User {
    /** Firestore document reference for this user. */
    id: DocumentReference
    /** First name of the user. */
    firstName: string
    /** Last name of the user. */
    lastName: string
    /** Phone number of the user. */
    phoneNumber: string
    /** Role of the user — either `'manager'` or `'client'`. */
    role: string
    /** Firestore references to the cases associated with this user. */
    caseId: DocumentReference[]
    /** Firestore reference to the user's profile image document. */
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

    //Kig efter denne function for at se om det bedst den kun er i case eller user

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
                const data = document.data() as User;
                const uid = doc(db, 'users', document.id);
                
                clientList.value.push({
                    ...data,
                    id: uid,
                });
            });
        }
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
        clientList,
        currentUser,
        getUser,
        getUserList,
        getManagerForCase,
        getClientsForManager,  
    };
});
