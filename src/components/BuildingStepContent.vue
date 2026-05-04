<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { useBuildingStep } from '@/composables/useBuildingStep';
import { reactive } from 'vue';


const authStore = useAuthStore();
const { currentBuildingStep } = useBuildingStep();

const buildingStepForm = reactive({
    text: '',
});



</script>

<template>
<div v-if="authStore.currentUser?.role == 'client'">
    <pre>{{ currentBuildingStep?.richText }}</pre>
</div>
<div v-else-if="authStore.currentUser?.role == 'manager'">
    <!-- Connect below with richText field -->
        <textarea v-model="buildingStepForm.text" />
        <!-- Sørg for at uploade filer er i samme format som i files feldet (forbind det med ref)-->
        <button type="button">Upload files</button>
</div>
</template>