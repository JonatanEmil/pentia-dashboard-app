<script setup lang="ts">
// import FormButtonSubmit from '@/components/FormButtonSubmit.vue';
import '@/assets/scss/main.scss';
// import LoginContainer from '@/components/LoginContainer.vue';
// import CreateClient from '@/components/CreateClient.vue';
// import CreateClientForm from '@/components/CreateClientForm.vue';
import CreateClient from '@/components/CreateClient.vue';
import { useBookingStore } from '@/stores/bookingStore.ts';

const bookingStore = useBookingStore();

bookingStore.getBookingList();

</script>

<template>
    <!-- <FormButtonSubmit class="formButtonSubmit">Opret</FormButtonSubmit> 

    <FormButtonSubmit class="formButtonSubmit">Login</FormButtonSubmit> -->

<!-- <LoginContainer /> -->

<!-- <CreateClientForm /> -->

<CreateClient />

<p v-for="(booking, index) in bookingStore.bookingList" :key="index">
    {{ booking.caseId }} - {{ booking.startTime }} - {{ booking.endTime }}

</p>



<div>

</div>

</template>

<style scoped>

</style>
