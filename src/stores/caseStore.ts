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

export const useCaseStore = defineStore('case', () => {
    // State
    const caseList = ref<Case[]>([]);
    const currentCase = ref<Case>();

    // Actions
    async function getCase(caseRef: DocumentReference): Promise<Case> {
        const snapshot = await getDoc(caseRef);

        return { caseId: snapshot.id, ...snapshot.data() } as Case;
    }

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

    async function setCurrentCase(caseId: string | DocumentReference): Promise<void> {
        caseId = typeof caseId === 'string' ? doc(db, 'cases', caseId) : caseId;

        const snapshot = await getDoc(caseId);

        currentCase.value = { caseId: snapshot.id, ...snapshot.data() } as Case;

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

    return {
        caseList,
        currentCase,
        getCase,
        setCurrentCase,
        getCaseList,
        getManagerForCase,
    };
});
