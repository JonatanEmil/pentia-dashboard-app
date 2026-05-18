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

/**
 * @function
 * Handles fetching, uploading and managing images stored in Firestore and Firebase Storage.
 */
export const useImageStore = defineStore('image', () => {
    // State
    /**
     * List of all images fetched from Firestore.
     * @type {Image[]}
     */
    const imageList = ref<Image[]>([]);

    // Getters

    /**
     * @function
     * Fetches the download URL for a user's profile image.
     *
     * @param imageRef - Firestore document reference for the image
     * @returns The Firebase Storage path or download URL of the image
     * @throws {FirebaseError} If the Firestore query fails
     */
    async function getUserImage(imageRef: DocumentReference): Promise<string> {
        const snapshot = await getDoc(imageRef);
        const data = snapshot.data() as Image;

        return data.path;
    };

    // Actions

    /**
     * @function
     * Fetches all images from Firestore and populates {@link imageList}.
     *
     * @returns Resolves when the image list has been populated
     * @throws {FirebaseError} If the Firestore query fails
     */
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

    /**
     * @function
     * Fetches all non-house images associated with a given case, with resolved download URLs.
     *
     * @param caseId - The Firestore document ID of the case
     * @returns A list of {@link Image} objects with resolved Firebase Storage download URLs
     * @throws {FirebaseError} If the Firestore query fails
     */
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
                //console.warn('Billede ikke fundet:', doc.data().path);
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

    /**
     * @function
     * Uploads an image file to Firebase Storage and creates a corresponding Firestore document.
     * The image is automatically assigned an expiration date two years from the upload date.
     *
     * @param file - The image file to upload
     * @param caseId - The Firestore document ID of the associated case
     * @param type - The category of the image, e.g. `'house'` or a room name
     * @returns Resolves when the image has been uploaded and the Firestore document created
     * @throws {FirebaseError} If the upload or Firestore write fails
     */
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

    return {
        imageList,
        getUserImage,
        getImageList,
        getImagesByCase,
        uploadImage,
    };
});
