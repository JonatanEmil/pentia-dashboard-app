<script setup lang="ts">
import InfoCard from '@/components/InfoCard.vue';
import CarouselContainer from '@/components/CarouselContainer.vue';
import ProgressCard from '@/components/ProgressCard.vue';


interface InfoCardData {
    title: string;
    text: string;
};
interface ProgressCardData {
    text: string;
    routeName: string;
    status: 'done' | 'planned';
};

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

const progressCardInformation: ProgressCardData[] = [
    {
        text:'Byggetilladelse',
        routeName:'',
        status:'done',
    },
    {
        text:'Opstartsmøde',
        routeName:'',
        status:'planned',
    },
    {
        text:'Byggetilladelse',
        routeName:'',
        status:'planned',
    },
    {
        text:'Materialevalg',
        routeName:'',
        status:'planned',
    },
    {
        text:'Fundament',
        routeName:'',
        status:'planned',
    },
];
</script>
<template>
    <main style="padding: 0!important;">
        <h1 class="font--h1 font--center">Velkommen!</h1>
        <CarouselContainer :gap="4" :startIndex="1" class="mb--5">
            <InfoCard 
                v-for="(data, index) in infoCardInformation" 
                :key="index"
                :text="data.text"
                :title="data.title"
            />
        </CarouselContainer>
        
        <ProgressCard class="mt--2"
            v-for="(data, index) in progressCardInformation" 
            :key="index"
            :text="data.text"
            :routeName="data.routeName"
            :status="data.status"
        />
    

    </main>
</template>
