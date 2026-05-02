// composables/useBuildingStep.ts
import { ref } from 'vue';
import { useBuildingStepStore, type BuildingStep } from '@/stores/buildingStepStore';
import { useFileStore, type File } from '@/stores/fileStore';

const buildingStepStore = useBuildingStepStore();
const fileStore = useFileStore();

export interface BuildingStepWithFiles extends BuildingStep {
    Files: File[]
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useBuildingStep() {
    const currentBuildingStep = ref<BuildingStepWithFiles>();

    async function setCurrentBuildingStep(caseId: string, priority: string): Promise<void> {
        const buildingStepData: BuildingStep = 
            await buildingStepStore.getBuildingStep(caseId, priority);
        const filesData: File[] = await fileStore.getBuildingStepFiles(caseId, priority);

        currentBuildingStep.value = { ...buildingStepData, Files: filesData };
    }

    return { 
        currentBuildingStep, 
        setCurrentBuildingStep };
}