<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue';
import SpeechToText from 'speech-to-text';
import MicrophoneIcon from '@/components/MicrophoneIcon.vue';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
    (e: 'interimText', value: string): void;
}>();

const interimText = ref('');
const finalisedText = ref<string[]>([]);
const listening = ref(false);
const error = ref<string | null>(null);
const listener = ref<InstanceType<typeof SpeechToText> | null>(null);

watch(
    [listening, listener],
    (_, __, onCleanup) => {
        const onAnythingSaid = (text: string) => {
            interimText.value = '';
            emit('interimText', text);
        };

        const onEndEvent = () => {
            if (listening.value) {
                listner.value?.startListening();
            }
        };

        const onFinalised = (text: string) => {
            finalistedText.value = [...finalisedText.value];
            interimText.value = '';
            emit('update:modelValue', text);
        };

        try {
            listner.value = new SpeechToText(onAnythingSaid, onEndEvent, onFinalised);
            error.value = null;
        } catch (err) {
            if (err instanceof Error) {
                error.value = err.message;
            }
        }

        onCleanup(() => {
            listener.value?.stopListening();
        });

    },

    { immediate: true },

);

</script>

<template>

    <div>

    </div>

</template>