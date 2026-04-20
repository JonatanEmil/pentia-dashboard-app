<script setup lang="ts">
import SpeakToText from './SpeakToText.vue';
import InputText from './InputText.vue';
import FormButtonSubmit from './FormButtonSubmit.vue';
import SendIcon from '@/assets/icons/SendIcon.vue';


</script>

<template>

    <div class="chat-form flex flex--row p--3">
        <SpeakToText language="da-DK" />
        <InputText class="chat-input" placeholder-text="Skriv dit spørgsmål her..." />
        <FormButtonSubmit variant="icon" class="chatButtonSubmit">
            <SendIcon />
        </FormButtonSubmit>


    </div>


</template>

<style scoped>
@import '@/assets/scss/components/_chatForm.scss';
</style>