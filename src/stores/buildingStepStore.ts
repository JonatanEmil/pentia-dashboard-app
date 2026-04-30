import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { db } from '@/config/firebase';
import { collection, getDocs, query, where, doc, type DocumentReference } from 'firebase/firestore';

interface BuildingStep {
    caseId: DocumentReference
    priority: number
    richText: string
    status: boolean
    title: string
}


export const useBuildingStepStore = defineStore('buildingStep', () => {
    // State
    const buildingStepList = ref<BuildingStep[]>([]);
    const currentBuildingSteps = ref<BuildingStep[]>([]);

    // Getters

    // Actions
    async function getBuildingStepList(): Promise<void> {
        const snapshot = await getDocs(collection(db, 'buildingSteps'));
        
        snapshot.forEach((doc) => {
            const data = doc.data();
            
            buildingStepList.value.push({
                caseId: data.caseId,
                priority: data.priority,
                richText: data.richText,
                status: data.status,
                title: data.title,
            });
        });
    }

    async function getBuildingStepListForCase(caseId: string | DocumentReference): Promise<void> {
        const caseRef = typeof caseId === 'string' ? doc(db, 'cases', caseId) : caseId;

        const snapshot = await getDocs(query(collection(db, 'buildingSteps'), where('caseId', '==', caseRef)));
        
        currentBuildingSteps.value = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            
            currentBuildingSteps.value.push({
                caseId: data.caseId.id,
                priority: data.priority,
                richText: data.richText,
                status: data.status,
                title: data.title,
            });
        });
        currentBuildingSteps.value.sort((a, b) => a.priority - b.priority);
    }

    // Returns the state, getters and actions
    return {
        buildingStepList,
        currentBuildingSteps,
        getBuildingStepList,
        getBuildingStepListForCase,
    };
});

