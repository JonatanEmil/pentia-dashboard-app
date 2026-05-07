// src/composables/useFolderImages.ts
import { ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import { useImageStore, type Image } from '@/stores/imagesStore.ts';

export function useFolderImages(): {
    caseId: string;
    caseImages: Ref<Image[]>;
    rooms: Ref<string[]>;
    fetchImages: () => Promise<void>;
    uploadImage: (file: globalThis.File, type: string) => Promise<void>;
    } {
    const imageStore = useImageStore();
    const route = useRoute();

    const caseId = route.params.caseId as string;
    const caseImages = ref<Image[]>([]);
    const rooms = ref<string[]>([]);

    async function fetchImages(): Promise<void> {
        caseImages.value = await imageStore.getImagesByCase(caseId);
        rooms.value = [...new Set(caseImages.value.map(image => image.type))];
    }

    async function uploadImage(file: globalThis.File, type: string): Promise<void> {
        await imageStore.uploadImage(file, caseId, type);
        await fetchImages(); // opdater listen efter upload
    }

    return {
        caseId,
        caseImages,
        rooms,
        fetchImages,
        uploadImage,
    };
}
