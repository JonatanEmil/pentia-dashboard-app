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

</script>

<template>

    <div>

    </div>
    
</template>