<script setup lang="ts">
import TitleWithText from '@/components/TitleWithText.vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { useCaseStore } from '@/stores/caseStore';
import { useBuildingStepStore, type BuildingStep} from '@/stores/buildingStepStore';
import { onMounted, ref } from 'vue';

const authStore = useAuthStore();
const caseStore = useCaseStore();
const buildingStepStore = useBuildingStepStore();
const route = useRoute();

route.params.priority = '1';
const currentBuildingStep = ref<BuildingStep>();

onMounted(async ()=>{
    currentBuildingStep.value =  await buildingStepStore.getBuildingStep(
    caseStore.currentCase?.caseId as string, 
    route.params.priority as string,
    );
});

console.log(route.params.priority);
console.log(currentBuildingStep);
</script>

<template>
<div v-if="authStore.currentUser?.role != 'client'">
    <TitleWithText :title="currentBuildingStep?.title as string" text=""></TitleWithText>
    
</div>
<div v-else-if="authStore.currentUser?.role == 'manager'">

</div>
</template>