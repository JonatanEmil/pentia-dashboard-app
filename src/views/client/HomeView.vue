<script setup lang="ts">
import InfoCard from '@/components/InfoCard.vue';
import CarouselContainer from '@/components/CarouselContainer.vue';
import ProgressCard from '@/components/ProgressCard.vue';
import { useBuildingStepStore } from '@/stores/buildingStepStore';
import { useCaseStore } from '@/stores/caseStore';


interface InfoCardData {
    title: string;
    text: string;
};

const buildingStepStore = useBuildingStepStore();
const casesStore = useCaseStore();



//casesStore.currentCase is expected to be populated at the time of this running
if(casesStore.currentCase && casesStore.currentCase.caseId){
    buildingStepStore.getBuildingStepListForCase(casesStore.currentCase.caseId);
}else{
    alert('something went wrong, no case have been selected');
}

const infoCardInformation: InfoCardData[] = [
    { 
        title:'Tip & Råd',
        text:'Mangler du også gode råd til din byggeproces? Så klik her og følg med!',
    },
    { 
        title:'Tip & Råd',
        text:'Mangler du også gode råd til din byggeproces? Så klik her og følg med!',
    },
    { 
        title:'Lær Din Byggeproces',
        text:'Byggeprocessen læres bedst når vi arbejder sammen om det.',
    },
];

</script>
<template>
    <main>
        <h1 class="font--h1 font--center">Velkommen!</h1>
        <CarouselContainer :gap="4" :startIndex="1" class="mb--4">
            <InfoCard 
                v-for="(data, index) in infoCardInformation" 
                :key="index"
                :text="data.text"
                :title="data.title"
            />
        </CarouselContainer>
        
        <ProgressCard class="mt--2"
            v-for="(data, index) in buildingStepStore.currentBuildingSteps" 
            :key="index"
            :title="data.title"
            :routeName="'clientBuildingSteps'"
            :params="{priority: data.priority}"
            :status="data.status"
        />
    

    </main>
</template>
