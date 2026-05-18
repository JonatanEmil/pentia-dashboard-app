<script setup lang="ts">
import ReturnButton from '@/components/common/ReturnButton.vue';
import TitleWithText from '@/components/TitleWithText.vue';
import BuildingStepForm from '@/components/BuildingStepForm.vue';
import { useCaseStore } from '@/stores/caseStore';
import { useBuildingStep } from '@/composables/useBuildingStep';
import { useRoute } from 'vue-router';

const caseStore = useCaseStore();
const route = useRoute();
const { currentBuildingStep, updateCurrentBuildingStep } = useBuildingStep();

const buildingStepDescriptions: string[] = [
    'Her ser du et overblik over projektets byggetilladelse, herunder godkendte tegninger, vilkår og dokumenter fra myndighederne.',
    'Møde afholdt for at gennemgå opgaver og prioriteter for den kommende periode.',
    'Materialevalg til byggeriet er gennemgået og beslutninger truffet.',
    'Fundamentets udformning og placering er afklaret og godkendt.',
    'Møde afholdt for at gennemgå og udbedre de sidste rettelser inden afslutning.',
    'Afsluttende gennemgang af byggeriet foretaget og eventuelle bemærkninger noteret.',
];

updateCurrentBuildingStep(caseStore.currentCase?.caseId as string, Number(route.params.priority));

</script>

<template>
    <main>
        <ReturnButton class="mt--4 mx--4"/>
        <TitleWithText :title="currentBuildingStep?.title as string" class="mx--4 mb--4">
            {{ currentBuildingStep ? 
                buildingStepDescriptions[currentBuildingStep.priority - 1] ?? 
                '' : '' }}
        </TitleWithText>        
        <BuildingStepForm class="mx--4"/>
    </main>
</template>
