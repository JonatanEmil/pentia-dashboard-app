import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { db } from '@/config/firebase';
import { collection, getDocs } from 'firebase/firestore';

interface BuildingStep {
    caseId: string
    priority: number
    richText: string | null
    status: boolean
    title: string
}


export const useBuildingStepStore = defineStore('buildingStep', () => {
    // State
    const buildingStepList = ref<BuildingStep[]>([]);

    // Getters

    // Actions
    async function getBuildingStepList(): Promise<void> {
        const snapshot = await getDocs(collection(db, 'buildingSteps'));

        snapshot.forEach((doc) => {
            const data = doc.data();

            buildingStepList.value.push({
                caseId: data.caseId.id,
                priority: data.priority,
                richText: data.richText,
                status: data.status,
                title: data.title,
            });
        });
    }

    // Returns the state, getters and actions
    return {
        buildingStepList,
        getBuildingStepList,
    };
});

