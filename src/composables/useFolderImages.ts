import { ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import { useImageStore, type Image } from '@/stores/imagesStore.ts';

export function useFolderImages(): {
    caseId: string;
    caseImages: Ref<Image[]>;
    allRooms: Ref<string[]>;
    fetchImages: () => Promise<void>;
    uploadImage: (file: globalThis.File, type: string) => Promise<void>;
    } {
    const imageStore = useImageStore();
    const route = useRoute();

    const caseId = route.params.caseId as string;
    const caseImages = ref<Image[]>([]);
    const allRooms = ref<string[]>(['stue', 'fundament', 'kokken', 'badeværelse', 'bryggers']);

    async function fetchImages(): Promise<void> {
        try {
            caseImages.value = await imageStore.getImagesByCase(caseId);
        } catch (error) {
            //console.warn('Ingen billeder fundet for case:', caseId);
            caseImages.value = [];
        }
    }

    async function uploadImage(file: globalThis.File, type: string): Promise<void> {
        await imageStore.uploadImage(file, caseId, type);
        await fetchImages();
    }

    return {
        caseId,
        caseImages,
        allRooms,
        fetchImages,
        uploadImage,
    };
}
