import { ref } from 'vue';
import { useBuildingStepStore, type BuildingStep } from '@/stores/buildingStepStore';
import { useFileStore, type File } from '@/stores/fileStore';
import { type DocumentReference } from 'firebase/firestore';

const buildingStepStore = useBuildingStepStore();
const fileStore = useFileStore();

/**
 * Extends {@link BuildingStep} with the list of files attached to the step.
 */
export interface BuildingStepWithFiles extends BuildingStep {
    /** Files attached to this building step. */
    Files: File[]
}

const currentBuildingStep = ref<BuildingStepWithFiles>();
const selectedFiles = ref<globalThis.File[]>([]);
/**
 * 
 * @returns - testy
 */

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useBuildingStep() {

    async function updateCurrentBuildingStep(
        caseId: string | DocumentReference, 
        priority: number): 
        Promise<void> {

        currentBuildingStep.value = { 
            ...await buildingStepStore.getBuildingStep(caseId, priority), 
            Files: await fileStore.getBuildingStepFiles(caseId, priority),
        };
    }

    return { 
        currentBuildingStep, 
        selectedFiles,
        uploadFiles: fileStore.uploadFiles,
        updateCurrentBuildingStep };
}