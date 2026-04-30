import { defineStore } from 'pinia';
import { ref } from 'vue';
import { db } from '@/config/firebase';
import { collection, getDocs, doc, getDoc, query, where, type DocumentReference } from 'firebase/firestore';
import { useAuthStore } from './authStore.ts';

interface Case {
    caseId: string
    roadName: string
    roadNumber: string
    city: string
    zipcode: number
}

export const useCaseStore = defineStore('case', () => {
    // State
    const caseList = ref<Case[]>([]);

    // Actions
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
        getCaseList,
        getManagerForCase,
    };
});