<script setup lang="ts">
// import FormButtonSubmit from '@/components/FormButtonSubmit.vue';
import '@/assets/scss/main.scss';
// import LoginContainer from '@/components/LoginContainer.vue';
// import CreateClient from '@/components/CreateClient.vue';
// import CreateClientForm from '@/components/CreateClientForm.vue';
import CreateClient from '@/components/CreateClient.vue';
import { useBookingStore } from '@/stores/bookingStore.ts';
import { useMessageStore } from '@/stores/messageStore.ts';
import { useBuildingStepStore } from '@/stores/buildingStepStore.ts';
import { useImageStore } from '@/stores/imagesStore';

const bookingStore = useBookingStore();

bookingStore.getBookingList();

const messageStore = useMessageStore();

messageStore.getMessageList();
const buildingStepStore = useBuildingStepStore();

buildingStepStore.getBuildingStepList();
const imageStore = useImageStore();

imageStore.getImageList();

</script>

<template>
<main>
    <!-- <FormButtonSubmit class="formButtonSubmit">Opret</FormButtonSubmit> 

    <FormButtonSubmit class="formButtonSubmit">Login</FormButtonSubmit> -->

<!-- <LoginContainer /> -->

<!-- <CreateClientForm /> -->
<main>
<CreateClient />

<p v-for="(booking, index) in bookingStore.formattedBookings" :key="index">
    {{ booking.caseId }} - {{ booking.startTimeFormatted }} - {{ booking.endTimeFormatted }}

</p>

<p v-for="(message, index) in messageStore.formattedMessages" :key="index">
    {{ message.message }} - {{ message.caseId }} - {{ message.senderId }} 
    - {{ message.recieverId }} - {{ message.timestampFormatted }}

</p>

<p v-for="(buildingStep, index) in buildingStepStore.buildingStepList" :key="index">
    {{ buildingStep.caseId }} - {{ buildingStep.priority }} - 
    {{ buildingStep.richText }} - {{ buildingStep.status }} - {{ buildingStep.title }}
<!--<img v-for="(image, index) in imageStore.imageList" :key="index" :src="image.path" /> -->

</p>

<div>

</div>
</main>

</main>
</template>

<style scoped>

</style>
