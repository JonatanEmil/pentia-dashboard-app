<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useCaseStore } from '@/stores/caseStore';
import { useBuildingStep } from '@/composables/useBuildingStep';
import { type File } from '@/stores/fileStore';
import CarouselContainer from '@/components/CarouselContainer.vue';
import BuildingStepContent from '@/components/BuildingStepContent.vue';
import ItemList from '@/components/ItemList.vue';
import LinkButton from '@/components/LinkButton.vue';
import TitleWithText from '@/components/TitleWithText.vue';


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
    <TitleWithText 
        :title="currentBuildingStep?.title as string" 
        :text="currentBuildingStep ? 
            buildingStepDescriptions[currentBuildingStep.priority - 1] ?? 
            '' : ''">
    </TitleWithText>

    <CarouselContainer :gap="2" :startIndex="1">
        <img src="/src/assets/img/fundamentRight.png" alt="">
        <img src="/src/assets/img/fundament.png" alt="">
        <img src="/src/assets/img/fundamentLeft.png" alt="">
    </CarouselContainer>
    <ItemList 
        v-if="currentBuildingStep"
        :items="currentBuildingStep.Files as File[]" 
        v-slot="{ item }">
        <LinkButton 
            :title="item.title ?? ''" 
            :routePath="item.path" 
            variant="download">
        </LinkButton>
    </ItemList>
    <BuildingStepContent/>
</main>
</template>
