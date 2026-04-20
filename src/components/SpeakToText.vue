<script setup lang="ts">
import { ref, watchEffect, onUnmounted, computed } from 'vue';
import SpeechToText from 'speech-to-text';
import MicrophoneSvg from '@/assets/icons/MicrophoneIcon.vue';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
    (e: 'interimText', value: string): void;
}>();

const interimText = ref('');
const finalisedText = ref<string[]>([]);
const listening = ref(false);
const error = ref<string | null>(null);
const listener = ref<InstanceType<typeof SpeechToText> | null>(null);

//dette skal slettes når input chat felt bruges
const displayText = computed(() => {
    const finalised = finalisedText.value.join(' ');
    const interim = interimText.value ? ` ${interimText.value}` : '';

    return finalised + interim;
});


watchEffect((onCleanup): void => {
    if (!listening.value) return;

    const onAnythingSaid = (text: string): void => {

        interimText.value = text;
        emit('interimText', text);
    };

    const onEndEvent = (): void => {
        if (listening.value) {
            listener.value?.startListening();
        }
    };

    const onFinalised = (text: string): void => {

        finalisedText.value = [text, ...finalisedText.value];
        interimText.value = '';
        emit('update:modelValue', text);
    };

    try {
        listener.value = new SpeechToText(onFinalised, onEndEvent, onAnythingSaid, 'da-DK' );
        listener.value.startListening();
        error.value = null;
    } catch (err) {
        if (err instanceof Error) {
            error.value = err.message;
        }
    }

    onCleanup(() => {
        listener.value?.stopListening();
    });

});


const toggleListening = (): void => {
    if (listening.value) {
        listening.value = false;
        interimText.value = '';
    } else {
        listening.value = true;
    }
};

onUnmounted((): void => {
    listener.value?.stopListening();
});


</script>

<template>

    <div class="speak-btn-wrapper">
        <!-- textarea skal slettes når knappen skal bruges til chat-->
        <textarea class="speech-output" 
        :value="displayText" placeholder="Tryk på mikrofonen for at starte optagelse..."
        readonly></textarea>

        <button class="speak-btn" :class="{ 'speak-btn--active': listening }"
            :aria-label="listening ? 'Stop optagelse' : 'Start optagelse'" 
            :aria-pressed="listening" 
            :disabled="!!error"
            @click="toggleListening">
            <MicrophoneSvg />

        </button>
        <p v-if="error" class="speech-btn__error">{{ error }}</p>

    </div>

</template>
