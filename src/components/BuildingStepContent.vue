<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { useBuildingStep } from '@/composables/useBuildingStep';
import { reactive } from 'vue';


const authStore = useAuthStore();
const { currentBuildingStep } = useBuildingStep();

const buildingStepForm = reactive({
    text: '',
});

function sendBuildingStepForm(): void{

}

</script>

<template>
<div v-if="authStore.currentUser?.role == 'client'">
    <pre>{{ currentBuildingStep?.richText }}</pre>
</div>
<div v-else-if="authStore.currentUser?.role == 'manager'">
    <form @submit.prevent="sendBuildingStepForm">
        <textarea v-model="buildingStepForm.text" />
        <button type="button">Upload files</button>
        <button type="submit">Send</button>
    </form>
</div>
</template>