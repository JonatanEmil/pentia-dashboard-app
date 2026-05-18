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
 * Repræsenterer et billeddokument gemt i Firestore.
 */
export interface Image {
    /** Firestore dokument-ID. */
    id: string
    /** Firebase Storage-sti eller signeret download-URL. */
    path: string
    /** Kategori for billedet — f.eks. `'house'` eller et rumnavn. */
    type: string
    /** Udløbsdato for billedet, eller `null` hvis ikke angivet. */
    expirationDate: Date | null
    /** Firestore dokument-ID for den tilknyttede sag, eller `null` for profilbilleder. */
    caseId: string | null
}

/**
 * @function
 * Håndterer hentning, upload og styring af billeder gemt i Firestore og Firebase Storage.
 */
export const useImageStore = defineStore('image', () => {
    // Tilstand
    /**
     * Liste over alle billeder hentet fra Firestore.
     * @type {Image[]}
     */
    const imageList = ref<Image[]>([]);

    // Getters

    /**
     * @function
     * Henter download-URL'en for en brugers profilbillede.
     *
     * @param imageRef - Firestore dokument-reference for billedet
     * @returns Firebase Storage-stien eller download-URL'en for billedet
     * @throws {FirebaseError} Hvis Firestore-forespørgslen fejler
     */
    async function getUserImage(imageRef: DocumentReference): Promise<string> {
        const snapshot = await getDoc(imageRef);
        const data = snapshot.data() as Image;

        return data.path;
    };

    // Actions

    /**
     * @function
     * Henter alle billeder fra Firestore og udfylder {@link imageList}.
     *
     * @returns Løses når billedlisten er udfyldt
     * @throws {FirebaseError} Hvis Firestore-forespørgslen fejler
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
     * Henter alle ikke-hus-billeder tilknyttet en given sag, med opløste download-URL'er.
     *
     * @param caseId - Sagens Firestore dokument-ID
     * @returns En liste af {@link Image} objekter med opløste Firebase Storage download-URL'er
     * @throws {FirebaseError} Hvis Firestore-forespørgslen fejler
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
     * Uploader en billedfil til Firebase Storage og opretter et tilsvarende Firestore-dokument.
     * Billedet tildeles automatisk en udløbsdato to år fra upload-datoen.
     *
     * @param file - Billedfilen der skal uploades
     * @param caseId - Firestore dokument-ID'et for den tilknyttede sag
     * @param type - Kategorien for billedet, f.eks. `'house'` eller et rumnavn
     * @returns Løses når billedet er uploadet og Firestore-dokumentet oprettet
     * @throws {FirebaseError} Hvis upload eller Firestore-skrivning fejler
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
