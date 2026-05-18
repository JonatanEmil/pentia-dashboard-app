import { defineStore } from 'pinia';
import { ref } from 'vue';
import { db } from '@/config/firebase';
import { collection, DocumentReference, getDocs, query, where, doc, getDoc, documentId } from 'firebase/firestore';
import { useAuthStore } from './authStore';

/**
 * Repræsenterer et brugerdokument gemt i Firestore.
 */
export interface User {
    /** Firestore dokument-reference for denne bruger. */
    id: DocumentReference
    /** Brugerens fornavn. */
    firstName: string
    /** Brugerens efternavn. */
    lastName: string
    /** Brugerens telefonnummer. */
    phoneNumber: string
    /** Brugerens rolle — enten `'manager'` eller `'client'`. */
    role: string
    /** Firestore-referencer til sager tilknyttet denne bruger. */
    caseId: DocumentReference[]
    /** Firestore-reference til brugerens profilbilleddokument. */
    imageId: DocumentReference
}

/**
 * @function
 * Håndterer hentning og styring af brugerdata fra Firestore.
 */
export const useUserStore = defineStore('user', () => {
    // Tilstand
    /**
     * Liste over alle brugere i systemet.
     * @type {User[]}
     */
    const userList = ref<User[]>([]);

    /**
     * Liste over klienter tilknyttet den aktuelt indloggede manager.
     * @type {User[]}
     */
    const clientList = ref<User[]>([]);

    /**
     * Den aktuelt viste bruger, eller null hvis ingen er valgt.
     * @type {User | null}
     */
    const currentUser = ref<User | null>(null);

    // Handlinger

    /**
     * @function
     * Henter alle brugere fra Firestore og udfylder {@link userList}.
     *
     * @returns Løses når brugerlisten er udfyldt
     * @throws {FirebaseError} Hvis Firestore-forespørgslen fejler
     */
    async function getUserList(): Promise<void> {
        const snapshot = await getDocs(collection(db, 'users'));

        snapshot.forEach((doc) => {
            userList.value.push(doc.data() as User);
        });
    }

    /**
     * @function
     * Finder den manager der er tildelt en given sag.
     *
     * @param caseId - Sagens Firestore dokument-ID
     * @returns Firestore dokument-ID'et for den tildelte manager, eller en tom streng hvis ingen findes
     * @throws {FirebaseError} Hvis Firestore-forespørgslen fejler
     */
    async function getManagerForCase(caseId: string): Promise<string> {
        const q = query(
            collection(db, 'users'),
            where('role', '==', 'manager'),
            where('caseId', 'array-contains', doc(db, 'cases', caseId)),
        );

        const snapshot = await getDocs(q);

        return snapshot.docs[0]?.id ?? '';
    }

    /**
     * @function
     * Henter alle klienter tilknyttet den aktuelt indloggede manager og udfylder {@link clientList}.
     *
     * @returns Løses når klientlisten er udfyldt
     * @throws {FirebaseError} Hvis en Firestore-forespørgsel fejler
     */
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

    /**
     * @function
     * Henter en enkelt bruger via deres Firestore dokument-ID eller reference.
     *
     * @param uid - Brugerens Firestore dokument-ID eller en {@link DocumentReference}
     * @returns Det hentede {@link User} objekt
     * @throws {FirebaseError} Hvis Firestore-forespørgslen fejler
     */
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
