<script setup lang="ts">
// import FormButtonSubmit from '@/components/FormButtonSubmit.vue';
import '@/assets/scss/main.scss';
// import LoginContainer from '@/components/LoginContainer.vue';
// import CreateClient from '@/components/CreateClient.vue';
// import CreateClientForm from '@/components/CreateClientForm.vue';
import CreateClient from '@/components/CreateClient.vue';
import { useBookingStore } from '@/stores/bookingStore.ts';
import { useImageStore } from '@/stores/imagesStore';

const bookingStore = useBookingStore();

bookingStore.getBookingList();

const imageStore = useImageStore();

imageStore.getImageList();

</script>

<template>
<main>
    <!-- <FormButtonSubmit class="formButtonSubmit">Opret</FormButtonSubmit> 

    <FormButtonSubmit class="formButtonSubmit">Login</FormButtonSubmit> -->

<!-- <LoginContainer /> -->

<!-- <CreateClientForm /> -->

<CreateClient />

<p v-for="(booking, index) in bookingStore.formattedBookings" :key="index">
    {{ booking.caseId }} - {{ booking.startTimeFormatted }} - {{ booking.endTimeFormatted }}

</p>

<!--<img v-for="(image, index) in imageStore.imageList" :key="index" :src="image.path" /> -->


<div>

</div>

</main>
</template>

<style scoped>

</style>
