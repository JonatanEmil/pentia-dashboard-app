import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { db } from '@/config/firebase';
import { collection, getDocs, query, where, doc, type DocumentReference, limit, updateDoc } from 'firebase/firestore';

/**
 * Represents a single step in a renovation building plan.
 */
export interface BuildingStep {
    /** Firestore document ID. */
    id: string
    /** Firestore reference to the parent case. */
    caseId: DocumentReference
    /** Ordering priority — lower numbers appear earlier in the plan. */
    priority: number
    /** Rich-text description of the building step. */
    richText: string
    /** Whether the step has been completed. */
    status: boolean
    /** Display title for the building step. */
    title: string
}


export const useBuildingStepStore = defineStore('buildingStep', () => {
    // State
    const buildingStepList = ref<BuildingStep[]>([]);
    const currentBuildingSteps = ref<BuildingStep[]>([]);

    // Getters
    async function getBuildingStep(
        caseId: string | DocumentReference, 
        priority: number | string): 
        Promise<BuildingStep> 
    {
        caseId = typeof caseId === 'string' ? doc(db, 'cases', caseId) : caseId;
        priority = typeof priority === 'string' ? Number(priority) : priority;
        
        const snapshot = await getDocs(query(collection(db, 'buildingSteps'), where('caseId', '==', caseId), where('priority','==',priority),limit(1)));
        
        const data = snapshot.docs[0]?.data() as BuildingStep;

        return {
            id: snapshot.docs[0]?.id as string,
            caseId: data.caseId,
            priority: data.priority,
            richText: data.richText,
            status: data.status,
            title: data.title,
        };
    }

    // Actions
    async function getBuildingStepList(): Promise<void> {
        const snapshot = await getDocs(collection(db, 'buildingSteps'));
        
        snapshot.forEach((doc) => {
            const data = doc.data();
            
            buildingStepList.value.push({
                id: doc.data().id,
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
                id: doc.data().id,
                caseId: data.caseId.id,
                priority: data.priority,
                richText: data.richText,
                status: data.status,
                title: data.title,
            });
        });
        currentBuildingSteps.value.sort((a, b) => a.priority - b.priority);
    }
    async function updateBuildingStep(buildingStep: BuildingStep): Promise<void> {
        if (!buildingStep) return;
        await updateDoc(doc(db, 'buildingSteps', buildingStep.id), { richText: buildingStep.richText, status: buildingStep.status });
    }

    // Returns the state, getters and actions
    return {
        buildingStepList,
        currentBuildingSteps,
        getBuildingStep,
        getBuildingStepList,
        getBuildingStepListForCase,
        updateBuildingStep,
    };
});

