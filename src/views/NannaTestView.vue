<script setup lang="ts">
// import FormButtonSubmit from '@/components/FormButtonSubmit.vue';
import '@/assets/scss/main.scss';
// import LoginContainer from '@/components/LoginContainer.vue';
// import CreateClient from '@/components/CreateClient.vue';
// import CreateClientForm from '@/components/CreateClientForm.vue';
import CreateClient from '@/components/CreateClient.vue';
import { useBookingStore } from '@/stores/bookingStore.ts';
import { useBuildingStepStore } from '@/stores/buildingStepStore.ts';

const bookingStore = useBookingStore();

bookingStore.getBookingList();

const buildingStepStore = useBuildingStepStore();

buildingStepStore.getBuildingStepList();

</script>

<template>
    <!-- <FormButtonSubmit class="formButtonSubmit">Opret</FormButtonSubmit> 

    <FormButtonSubmit class="formButtonSubmit">Login</FormButtonSubmit> -->

<!-- <LoginContainer /> -->

<!-- <CreateClientForm /> -->

<CreateClient />

<p v-for="(booking, index) in bookingStore.formattedBookings" :key="index">
    {{ booking.caseId }} - {{ booking.startTimeFormatted }} - {{ booking.endTimeFormatted }}

</p>

<p v-for="(buildingStep, index) in buildingStepStore.buildingStepList" :key="index">
    {{ buildingStep.caseId }} - {{ buildingStep.priority }} - 
    {{ buildingStep.richText }} - {{ buildingStep.status }} - {{ buildingStep.title }}

</p>

<div>

</div>

</template>

<style scoped>

</style>
