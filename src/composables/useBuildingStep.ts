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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useBuildingStep() {

    async function updateCurrentBuildingStep(
        caseId: string | DocumentReference, 
        priority: number): 
        Promise<void> {
        const buildingStepData: BuildingStep = 
            await buildingStepStore.getBuildingStep(caseId, priority);
        const filesData: File[] = await fileStore.getBuildingStepFiles(caseId, priority);

        currentBuildingStep.value = { ...buildingStepData, Files: filesData };
    }

    return { 
        currentBuildingStep, 
        uploadFiles: fileStore.uploadFiles,
        updateCurrentBuildingStep };
}