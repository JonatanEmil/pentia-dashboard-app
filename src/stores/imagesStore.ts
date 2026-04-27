import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { db } from '@/utils/firebase.ts';
import { collection, getDocs } from 'firebase/firestore';

interface Image {
    path: string
    type: string
    expirationDate: Date | null
    caseId: string | null 
}


export const useImageStore = defineStore('image', () => {
    // State
    const imageList = ref<Image[]>([]);


    // Getters

    // Actions
    async function getImageList(): Promise<void> {
        const snapshot = await getDocs(collection(db, 'images'));

        snapshot.forEach((doc) => {
            const data = doc.data();

            imageList.value.push({
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
        getImageList,
    };
});

