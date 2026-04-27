<script setup lang="ts">
// import FormButtonSubmit from '@/components/FormButtonSubmit.vue';
import '@/assets/scss/main.scss';
// import LoginContainer from '@/components/LoginContainer.vue';
// import CreateClient from '@/components/CreateClient.vue';
// import CreateClientForm from '@/components/CreateClientForm.vue';
import CreateClient from '@/components/CreateClient.vue';
import { useBookingStore } from '@/stores/bookingStore.ts';
import { useMessageStore } from '@/stores/messageStore.ts';

const bookingStore = useBookingStore();

bookingStore.getBookingList();

const messageStore = useMessageStore();

messageStore.getMessageList();

</script>

<template>
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



<div>

</div>
</main>

</template>

<style scoped>

</style>
