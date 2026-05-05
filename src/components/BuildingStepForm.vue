<script setup lang="ts">
import BuildingStepContent from './BuildingStepContent.vue';
import CheckboxWithText from './CheckboxWithText.vue';
import FormButtonSubmit from './FormButtonSubmit.vue';
import { useBuildingStepStore } from '@/stores/buildingStepStore';
import { useBuildingStep } from '@/composables/useBuildingStep';


const { currentBuildingStep, selectedFiles, uploadFiles } = useBuildingStep();
const buildingStepStore = useBuildingStepStore();

async function sendBuildingStepForm(): Promise<void> {
    if (!currentBuildingStep.value) return;

    await buildingStepStore.updateBuildingStep(currentBuildingStep.value);

    if (selectedFiles.value.length > 0) {
        await uploadFiles(
            selectedFiles.value,
            currentBuildingStep.value.caseId,
            currentBuildingStep.value.priority,
        );
    }
}

</script>

<template>

    <form @submit.prevent="sendBuildingStepForm">
        <BuildingStepContent/>
        <!-- Connect with the status field from current step -->
        <CheckboxWithText 
            text="Bekræft at dette trin i byggeprosessen er færdig" 
            name="status" 
            id="status"/>
        <FormButtonSubmit>Send</FormButtonSubmit>
    </form>

</template>