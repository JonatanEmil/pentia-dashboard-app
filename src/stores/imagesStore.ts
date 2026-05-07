import { defineStore } from 'pinia';
import { ref, computed, type ComputedRef } from 'vue';
import { db } from '@/config/firebase';
import { collection, getDocs, DocumentReference, getDoc, query, where, doc } from 'firebase/firestore';

export interface Image {
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
    async function getUserImage(imageRef: DocumentReference): Promise<string> {
        const snapshot = await getDoc(imageRef);
        const data = snapshot.data() as Image;

        return data.path;
    };

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

    async function getImagesByCase(caseId: string): Promise<Image[]> {
        const caseRef = doc(db, 'cases', caseId);

        const q = query(
            collection(db, 'images'),
            where('caseId', '==', caseRef),
        );

        const snapshot = await getDocs(q);

        return snapshot.docs.map((doc) => ({
            id: doc.id,
            path: doc.data().path,
            type: doc.data().type,
            caseId: caseId,
            expirationDate: doc.data().expirationDate ? doc.data().expirationDate.toDate() : null,
        }));
    }

    // Returns the state, getters and actions
    return {
        imageList,
        getUserImage,
        getImageList,
        getImagesByCase,
    };
});

