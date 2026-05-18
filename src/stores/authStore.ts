import { defineStore } from 'pinia';
import { ref } from 'vue';
import { db } from '@/config/firebase';
import { doc, getDoc, type DocumentReference } from 'firebase/firestore';
import { useRouter } from 'vue-router';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useCaseStore } from './caseStore';

/**
 * Represents an authenticated user in the application.
 */
export interface AuthUser {
    /** Unique user ID from Firebase Authentication */
    id: string
    /** User role, e.g. `'manager'` or `'client'` */
    role: string
    /** User's email address */
    email?: string
    /** Firestore references to the user's associated cases */
    caseIds: DocumentReference[]
}

/**
 * Handles authentication state, login, and logout for the application.
 * @function
 * @returns {object} - returns object of all things inside
 */
export const useAuthStore = defineStore('auth', () => {
    // State
    /**
     * The currently authenticated user, or null if not logged in.
     * @type {AuthUser}
     */
    const currentUser = ref<AuthUser | null>(null);
    const router = useRouter();

    // Getters

    // Actions

    /**
     * @function
     * Authenticates a user with email and password and redirects based on role.
     * @param email - takes users input in email field
     * @param password - takes users input in password field
     * @returns void - returns void
     */
    async function login( email: string, password: string ): Promise<void> {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;

        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        const userData = userDoc.data();

        currentUser.value = {
            id: firebaseUser.uid,
            role: userData?.role,
            email: firebaseUser.email ?? undefined,
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

    /**
     * @function
     * Signs out the current user, clears local auth state, and redirects to login.
     *
     * @returns Resolves when sign-out and navigation are complete
     * @throws {FirebaseError} If the Firebase sign-out call fails
     */
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
