<script setup lang="ts">
import SpeakToText from './SpeakToText.vue';
import InputText from './InputText.vue';
import FormButtonSubmit from './FormButtonSubmit.vue';
import SendIcon from '@/assets/icons/SendIcon.vue';
import { ref } from 'vue';

const inputValue = ref('');

</script>

<template>

    <div class="chat-form flex flex--row p--3">
        <SpeakToText v-model="inputValue" language="da-DK" />
        <InputText 
        class="chat-input" 
        placeholder-text="Skriv dit spørgsmål her..." 
        v-model="inputValue" />
        <FormButtonSubmit variant="icon" class="chatButtonSubmit">
            <SendIcon />
        </FormButtonSubmit>


    </div>


</template>

<style scoped>
@import '@/assets/scss/components/_chatForm.scss';
</style>