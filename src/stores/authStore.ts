import { defineStore } from 'pinia';
import { ref } from 'vue';
import { db } from '@/config/firebase';
import { doc, getDoc, type DocumentReference } from 'firebase/firestore';
import { useRouter } from 'vue-router';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useCaseStore } from './caseStore';

/**
 * Repræsenterer en autentificeret bruger i applikationen.
 */
export interface AuthUser {
    /** Unikt bruger-ID fra Firebase Authentication */
    id: string
    /** Brugerrolle, f.eks. `'manager'` eller `'client'` */
    role: string
    /** Brugerens e-mailadresse */
    email?: string
    /** Firestore-referencer til brugerens tilknyttede sager */
    caseIds: DocumentReference[]
}

/**
 * Håndterer autentificeringstilstand, login og logout for applikationen.
 * @function
 * @returns {object} - returnerer et objekt med alt indholdet
 */
export const useAuthStore = defineStore('auth', () => {
    // Tilstand
    /**
     * Den aktuelt autentificerede bruger, eller null hvis ikke logget ind.
     * @type {AuthUser}
     */
    const currentUser = ref<AuthUser | null>(null);
    const router = useRouter();

    // Getters

    // Handlinger

    /**
     * @function
     * Autentificerer en bruger med e-mail og adgangskode og videresender baseret på rolle.
     * @param email - tager brugerens input i e-mailfeltet
     * @param password - tager brugerens input i adgangskodefeltet
     * @returns void - returnerer void
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
     * Logger den aktuelle bruger ud, rydder lokal autentificeringstilstand og videresender til login.
     *
     * @returns Løses når logout og navigation er fuldført
     * @throws {FirebaseError} Hvis Firebase logout-kaldet fejler
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
