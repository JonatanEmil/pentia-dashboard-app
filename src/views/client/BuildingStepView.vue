<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useCaseStore } from '@/stores/caseStore';
import { useBuildingStep } from '@/composables/useBuildingStep';
import { useFileStore, type File } from '@/stores/fileStore';
import CarouselContainer from '@/components/CarouselContainer.vue';
import BuildingStepContent from '@/components/BuildingStepContent.vue';
import ItemList from '@/components/ItemList.vue';
import LinkButton from '@/components/LinkButton.vue';
import TitleWithText from '@/components/TitleWithText.vue';
import ReturnButton from '@/components/common/ReturnButton.vue';


const caseStore = useCaseStore();
const route = useRoute();
const fileStore = useFileStore();
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
<main class="clientBuildingStepView">
    <ReturnButton 
        returnOverwrite="clientHome" 
        class="mt--4 mx--4"
    />
    <TitleWithText :title="currentBuildingStep?.title as string" class="mx--4 mb--4">
        {{ currentBuildingStep ? 
            buildingStepDescriptions[currentBuildingStep.priority - 1] ?? 
            '' : '' }}
    </TitleWithText>

    <CarouselContainer :gap="2" :startIndex="1">
        <img src="/img/fundamentRight.png" alt="">
        <img src="/img/fundament.png" alt="">
        <img src="/img/fundamentLeft.png" alt="">
    </CarouselContainer>
    <ItemList 
        v-if="currentBuildingStep"
        :items="currentBuildingStep.Files as File[]" 
        v-slot="{ item }"
        class="mx--4 mb--4"
    >
        <LinkButton 
            :title="item.title ?? ''" 
            :routePath="fileStore.getDownloadPath(item.path)"
            variant="download">
        </LinkButton>
    </ItemList>
    <BuildingStepContent
        class="mx--4"
    />
</main>
</template>
