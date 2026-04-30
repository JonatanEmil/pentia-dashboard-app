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
    const currentCase = ref<Case>();

    // Getters

    // Actions
    async function getCaseList(): Promise<void> {
        const authStore = useAuthStore();

        const userDoc = await getDoc(doc(db, 'users', authStore.currentUser!.id ));
        const caseIds: string[] = userDoc.data()?.caseId ?? [];

        caseList.value = [];

        for (const caseId of caseIds) {
            const caseDoc = await getDoc(doc(db, 'cases', caseId));

            if (caseDoc.exists()) {
                caseList.value.push({
                    caseId: caseDoc.id,
                    roadName: caseDoc.data().roadName,
                    roadNumber: caseDoc.data().roadNumber,
                    city: caseDoc.data().city,
                    zipcode: caseDoc.data().zipcode,
                });
            }
        };
    }
    
    async function setCurrentCase(caseId: string | DocumentReference): Promise<void> {
        caseId = typeof caseId === 'string' ? doc(db, 'cases', caseId) : caseId;
        
        const snapshot = await getDoc(caseId);
        
        currentCase.value = { caseId: snapshot.id, ...snapshot.data() } as Case;
        
    }


    // Returns the state, getters and actions
    return {
        caseList,
        currentCase,
        setCurrentCase,
        getCaseList,
    };
});

