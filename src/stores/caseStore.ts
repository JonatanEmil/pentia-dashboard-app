import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { db } from '@/utils/firebase.ts';
import { collection, getDocs } from 'firebase/firestore';

interface Case {
    roadName: string
    roadNumber: string
    city: string
    zipcode: number
    clientId: number
    managerId: number
}


export const useCaseStore = defineStore('case', () => {
    // State
    const caseList = ref<Case[]>([]);

    // Getters

    // Actions
    async function getCaseList(): Promise<void> {
        const snapshot = await getDocs(collection(db, 'cases'));

        snapshot.forEach((doc) => {
            const data = doc.data();

            caseList.value.push({
                roadName: data.roadName,
                roadNumber: data.roadNumber,
                city: data.city,
                zipcode: data.zipcode,
                clientId: data.clientId.id,
                managerId: data.managerId.id,
            });
        });
    }

    // Returns the state, getters and actions
    return {
        caseList,
        getCaseList,
    };
});

