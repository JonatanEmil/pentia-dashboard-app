<script setup lang="ts">
import { ref } from 'vue';
import { useFolderImages } from '@/composables/useFolderImages.ts';
import PlusIcon from '@/assets/icons/PlusIcon.vue';

const props = defineProps<{
    type: string
}>();

const { uploadImage } = useFolderImages();
const fileInput = ref<HTMLInputElement | null>(null);

async function handleUpload(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;

    if (!input.files) return;

    for (const file of Array.from(input.files)) {
        await uploadImage(file, props.type);
    }
}
</script>

<template>
    <button type="button" class="addImageButton" @click="fileInput?.click()">
        <PlusIcon class="m--4" />
        <input
            ref="fileInput"
            type="file"
            accept="image/*"
            @change="handleUpload" />
    </button>
</template>
