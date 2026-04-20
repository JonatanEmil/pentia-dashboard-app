<script setup lang="ts">
import { ref } from 'vue';
import ReturnButton from '@/components/ReturnButton.vue';
import TitleWithText from '@/components/TitleWithText.vue';
import LinkButton from '@/components/LinkButton.vue';
import BuildingStepContent from '@/components/BuildingStepContent.vue';
import CarouselContainer from '@/components/CarouselContainer.vue';

const stepData = ref({ title:'', text:'', imagePaths:['src/assets/img/Fundament billede i højre side.png','src/assets/img/Fundament billede i midten.png','src/assets/img/Fundament billede i venstre side.png'] });

</script>
<template>
    <main>
        <ReturnButton/>
        <TitleWithText 
            v-if="stepData.title && stepData.text" 
            :title="stepData.title" 
            :text="stepData.text" 
        />
        <CarouselContainer :gap="2" :startIndex="1">
            <img 
                v-for="(data, index) in stepData.imagePaths"
                :key="index"
                :src="data" alt="">
        </CarouselContainer>
        <LinkButton/>
        <BuildingStepContent/>
    </main>
</template>
