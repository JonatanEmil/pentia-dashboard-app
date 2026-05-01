import {defineStore} from 'pinia';
import {ref, computed, type ComputedRef} from 'vue';
import {db} from '@/config/firebase';
import {collection, getDocs, DocumentReference} from 'firebase/firestore';

interface Image {
    id: string
    path: string
    type: string
    expirationDate: Date | null
    caseId: string | null
}


export const useImageStore = defineStore('image', () => {
    // State
    const imageList = ref<Image[]>([]);


    // Getters
    const getUserImage: ComputedRef<(imageRef: DocumentReference) => string> = computed(() => (imageRef: DocumentReference): string => {
        const image = imageList.value.find(img => img.id === imageRef?.id);

        return image?.path ?? '';
    });

    // Actions
    async function getImageList(): Promise<void> {
        const snapshot = await getDocs(collection(db, 'images'));

        snapshot.forEach((doc) => {
            const data = doc.data();

            imageList.value.push({
                id: doc.id,
                path: data.path,
                type: data.type,
                caseId: data.caseId ? data.caseId.id : null,
                expirationDate: data.expirationDate ? data.expirationDate.toDate() : null,
            });
        });
    }

    // Returns the state, getters and actions
    return {
        imageList,
        getUserImage,
        getImageList,
    };
});

