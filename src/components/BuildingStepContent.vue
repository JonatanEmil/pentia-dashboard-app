<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { useBuildingStep } from '@/composables/useBuildingStep';
import { ref } from 'vue';

const authStore = useAuthStore();
const { currentBuildingStep, selectedFiles } = useBuildingStep();

const fileInput = ref<HTMLInputElement | null>(null);

function handleFileUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (!input.files) return;
    selectedFiles.value = Array.from(input.files);
}
</script>

<template>
    <div v-if="authStore.currentUser?.role != 'client'">
        <pre>{{ currentBuildingStep?.richText }}</pre>
    </div>
    <div v-else-if="authStore.currentUser?.role == 'client'">
        <textarea v-model="currentBuildingStep.richText" v-if="currentBuildingStep" />
        <input 
        ref="fileInput" type="file" multiple style="display: none" @change="handleFileUpload" />
        <button type="button" @click="fileInput?.click()">Upload files</button>
    </div>
</template>