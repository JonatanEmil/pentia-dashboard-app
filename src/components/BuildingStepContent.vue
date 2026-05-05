<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { useBuildingStep } from '@/composables/useBuildingStep';
import { reactive, ref } from 'vue';

const authStore = useAuthStore();
const { currentBuildingStep, uploadFiles, updateCurrentBuildingStep } = useBuildingStep();

const buildingStepForm = reactive({ text: '' });
const fileInput = ref<HTMLInputElement | null>(null);

function handleFileUpload(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || !currentBuildingStep.value) return;

    uploadFiles(
        input.files,
        currentBuildingStep.value.caseId,
        currentBuildingStep.value.priority,
    );
    updateCurrentBuildingStep(currentBuildingStep.value.caseId, currentBuildingStep.value.priority);
}
</script>

<template>
    <div v-if="authStore.currentUser?.role != 'client'">
        <pre>{{ currentBuildingStep?.richText }}</pre>
    </div>
    <div v-else-if="authStore.currentUser?.role == 'client'">
        <textarea v-model="buildingStepForm.text" />
        <input 
        ref="fileInput" type="file" multiple style="display: none" @change="handleFileUpload" />
        <button type="button" @click="fileInput?.click()">Upload files</button>
    </div>
</template>