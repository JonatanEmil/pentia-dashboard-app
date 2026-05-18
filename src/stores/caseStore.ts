import { defineStore } from 'pinia';
import { ref } from 'vue';
import { db } from '@/config/firebase';
import { collection, getDocs, doc, getDoc, query, where, type DocumentReference } from 'firebase/firestore';
import { useAuthStore } from './authStore.ts';

/**
 * Represents a renovation case (property) stored in Firestore.
 */
export interface Case {
    /** Firestore document ID for the case. */
    caseId: string
    /** Street name of the property. */
    roadName: string
    /** House number of the property. */
    roadNumber: string
    /** City of the property. */
    city: string
    /** Zip code of the property. */
    zipcode: number
}

/**
 * @function
 * Handles fetching and managing renovation cases from Firestore.
 */
export const useCaseStore = defineStore('case', () => {
    // State
    /**
     * List of all cases associated with the current user.
     * @type {Case[]}
     */
    const caseList = ref<Case[]>([]);

    /**
     * The currently active case, or undefined if none is selected.
     * @type {Case | undefined}
     */
    const currentCase = ref<Case>();

    // Actions

    /**
     * @function
     * Fetches a single case by its Firestore document reference.
     *
     * @param caseRef - Firestore document reference for the case
     * @returns The fetched {@link Case} object
     * @throws {FirebaseError} If the Firestore query fails
     */
    async function getCase(caseRef: DocumentReference): Promise<Case> {
        const snapshot = await getDoc(caseRef);

        return { caseId: snapshot.id, ...snapshot.data() } as Case;
    }

    /**
     * @function
     * Fetches all cases associated with the currently logged-in user and populates {@link caseList}.
     *
     * @returns Resolves when the case list has been populated
     * @throws {FirebaseError} If any Firestore query fails
     */
    async function getCaseList(): Promise<void> {
        const authStore = useAuthStore();

        const userDoc = await getDoc(doc(db, 'users', authStore.currentUser!.id));
        const caseRefs: DocumentReference[] = userDoc.data()?.caseId ?? [];

        caseList.value = [];

        for (const caseRef of caseRefs) {
            const caseDoc = await getDoc(caseRef);

            if (caseDoc.exists()) {
                caseList.value.push({
                    caseId: caseDoc.id,
                    roadName: caseDoc.data().roadName,
                    roadNumber: caseDoc.data().roadNumber,
                    city: caseDoc.data().city,
                    zipcode: caseDoc.data().zipcode,
                });
            }
        }
    }

    /**
     * @function
     * Sets the currently active case by its Firestore document ID or reference.
     *
     * @param caseId - The case's Firestore document ID or a {@link DocumentReference}
     * @returns Resolves when {@link currentCase} has been updated
     * @throws {FirebaseError} If the Firestore query fails
     */
    async function setCurrentCase(caseId: string | DocumentReference): Promise<void> {
        caseId = typeof caseId === 'string' ? doc(db, 'cases', caseId) : caseId;

        const snapshot = await getDoc(caseId);

        currentCase.value = { caseId: snapshot.id, ...snapshot.data() } as Case;
    }

    /**
     * @function
     * Finds the manager assigned to a given case.
     *
     * @param caseId - The Firestore document ID of the case
     * @returns The Firestore document ID of the assigned manager, or an empty string if none found
     * @throws {FirebaseError} If the Firestore query fails
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

    return {
        caseList,
        currentCase,
        getCase,
        setCurrentCase,
        getCaseList,
        getManagerForCase,
    };
});
