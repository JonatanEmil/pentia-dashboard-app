import { defineStore } from 'pinia';
import { ref, computed, type ComputedRef } from 'vue';
import { db } from '@/config/firebase';
import {
    collection,
    getDocs,
    DocumentReference,
    getDoc,
    query,
    where,
    doc,
    addDoc,
    Timestamp,
} from 'firebase/firestore';
import { getStorage, uploadBytes, ref as storageRef, getDownloadURL } from 'firebase/storage';

/**
 * Represents an image document stored in Firestore.
 */
export interface Image {
    /** Firestore document ID. */
    id: string
    /** Firebase Storage path or signed download URL. */
    path: string
    /** Category of the image — e.g. `'house'` or a room name. */
    type: string
    /** Expiration date of the image, or `null` if not set. */
    expirationDate: Date | null
    /** Firestore document ID of the related case, or `null` for user profile images. */
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
        const storage = getStorage();
        const caseRef = doc(db, 'cases', caseId);

        const q = query(
            collection(db, 'images'),
            where('caseId', '==', caseRef),
            where('type', '!=', 'house'),
        );

        const snapshot = await getDocs(q);

        return await Promise.all(snapshot.docs.map(async (doc) => {
            let path = '';

            try {
                path = await getDownloadURL(storageRef(storage, doc.data().path));
            } catch {
                console.warn('Billede ikke fundet:', doc.data().path);
            }

            return {
                id: doc.id,
                path: path,
                type: doc.data().type,
                caseId: caseId,
                expirationDate: doc.data().expirationDate ? doc.data().expirationDate.toDate() : null,
            };
        }));
    }

    async function uploadImage(
        file: globalThis.File,
        caseId: string,
        type: string,
    ): Promise<void> {
        const storage = getStorage();
        const caseRef = doc(db, 'cases', caseId);
        const path = `images/${caseId}/${file.name}`;

        await uploadBytes(storageRef(storage, path), file);

        const expirationDate = new Date();

        expirationDate.setFullYear(expirationDate.getFullYear() + 2);

        await addDoc(collection(db, 'images'), {
            caseId: caseRef,
            type: type,
            path: path,
            expirationDate: Timestamp.fromDate(expirationDate),
        });
    }

    // Returns the state, getters and actions
    return {
        imageList,
        getUserImage,
        getImageList,
        getImagesByCase,
        uploadImage,
    };
});

