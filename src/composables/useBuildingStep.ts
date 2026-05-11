import { ref } from 'vue';
import { useBuildingStepStore, type BuildingStep } from '@/stores/buildingStepStore';
import { useFileStore, type File } from '@/stores/fileStore';
import { type DocumentReference } from 'firebase/firestore';

const buildingStepStore = useBuildingStepStore();
const fileStore = useFileStore();

export interface BuildingStepWithFiles extends BuildingStep {
    Files: File[]
}

const currentBuildingStep = ref<BuildingStepWithFiles>();
const selectedFiles = ref<globalThis.File[]>([]);

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