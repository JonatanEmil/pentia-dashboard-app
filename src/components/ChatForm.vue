<script setup lang="ts">
import SpeakToText from './SpeakToText.vue';
import InputText from './InputText.vue';
import FormButtonSubmit from './FormButtonSubmit.vue';
import SendIcon from '@/assets/icons/SendIcon.vue';
import ChatMessage from './ChatMessage.vue';
import { ref } from 'vue';

const inputValue = ref('');

</script>

<template>

    <div>
        <ChatMessage message="Hej, jeg har et spørgsmål?" sender="other" class="globalmargins"/>
        <ChatMessage message="Hvad så?" sender="self" class="globalmargins"/>
    <div class="chat-form flex flex--row p--3">
        <SpeakToText v-model="inputValue" language="da-DK" />
        <InputText 
        class="p--3" 
        placeholder-text="Skriv dit spørgsmål her..." 
        v-model="inputValue" 
        variant="chat"
        />
        <FormButtonSubmit variant="icon" class="chatButtonSubmit">
            <SendIcon />
        </FormButtonSubmit>


    </div>
</div>

</template>

<style scoped>

</style>