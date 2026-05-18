<script setup lang="ts">
import SpeakToText from '@/components/SpeakToText.vue';
import InputText from '@/components/InputText.vue';
import FormButtonSubmit from '@/components/FormButtonSubmit.vue';
import SendIcon from '@/assets/icons/SendIcon.vue';
import { ref } from 'vue';



const emit = defineEmits<{
    send: [message: string]
}>();

const inputValue = ref('');

function handleSend(): void {
    if (inputValue.value.trim()) {
        emit('send', inputValue.value);
        inputValue.value = '';
    }
}


</script>

<template>
    <div class="chat-form flex flex--row p--3">
        <SpeakToText v-model="inputValue" language="da-DK" />
        <InputText
            class="p--3"
            placeholder-text="Skriv dit spørgsmål her..."
            v-model="inputValue"
            variant="chat"
        />
        <FormButtonSubmit variant="icon" class="chatButtonSubmit" @click="handleSend">
            <SendIcon />

        </FormButtonSubmit>
    </div>
</template>