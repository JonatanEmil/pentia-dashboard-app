import { defineStore } from 'pinia';
import { ref } from 'vue';
import { db } from '@/config/firebase';
import { doc, getDoc, type DocumentReference } from 'firebase/firestore';
import { useRouter } from 'vue-router';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useCaseStore } from './caseStore';

interface AuthUser {
    id: string
    role: string
    caseIds: DocumentReference[]
}

export const useAuthStore = defineStore('auth', () => {
    // State
    const currentUser = ref<AuthUser | null>(null);
    const router = useRouter();

    // Getters

    // Actions
    async function login( email: string, password: string ): Promise<void> {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;

        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        const userData = userDoc.data();

        currentUser.value = {
            id: firebaseUser.uid,
            role: userData?.role,
            caseIds: userData?.caseId,
        } as AuthUser;

        
        const caseStore = useCaseStore();
        
        await caseStore.setCurrentCase(currentUser.value?.caseIds[0] as DocumentReference | string);


        if (currentUser.value.role === 'manager') {
            router.push({ name: 'managerHome' });
        } else {
            router.push({ name: 'clientHome' });
        }
    }

    async function logout(): Promise<void> {
        const auth = getAuth();

        await signOut(auth);
        currentUser.value = null;
        router.push({ name: 'login' });
    }

    return {
        currentUser,
        login,
        logout,
    };
});
