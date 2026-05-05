import { defineStore } from 'pinia';
import { ref } from 'vue';
import { db } from '@/config/firebase';
import { collection, getDocs, query, where, doc, writeBatch, type DocumentReference } from 'firebase/firestore';
import { getStorage, uploadBytes, ref as storageRef } from 'firebase/storage';

export interface File {
    caseId: DocumentReference
    priority: number
    title: string
    path: string
}


export const useFileStore = defineStore('file', () => {
    // State
    const fileList = ref<File[]>([]);

    // Getters
    async function getBuildingStepFiles(
        caseId: DocumentReference | string,
        priority: number | string):
        Promise<File[]> {
        caseId = typeof caseId === 'string' ? doc(db, 'cases', caseId) : caseId;
        priority = typeof priority === 'string' ? Number(priority) : priority;

        const snapshot = await getDocs(query(collection(db, 'files'), where('caseId', '==', caseId), where('priority', '==', priority)));

        return snapshot.docs.map(doc => ({
            caseId: doc.data().caseId,
            priority: doc.data().priority,
            title: doc.data().title,
            path: doc.data().path,
        } as File));
    };


    // Actions
    async function getFileList(): Promise<void> {
        const snapshot = await getDocs(collection(db, 'files'));

        snapshot.forEach((doc) => {
            const data = doc.data();

            fileList.value.push({
                caseId: data.caseId,
                priority: data.priority,
                title: data.title,
                path: data.path,
            } as File);
        });
    }
    async function uploadFiles(
        files: globalThis.File[], 
        caseId: DocumentReference | string, 
        priority: number): 
        Promise<void> {
        caseId = typeof caseId === 'string' ? doc(db, 'cases', caseId) : caseId;
        const storage = getStorage();
        const batch = writeBatch(db);

        for (const file of Array.from(files)) {
            await uploadBytes(storageRef(storage, `files/${caseId.id}/${file.name}`), file);

            batch.set(doc(collection(db, 'files')), {
                caseId: caseId,
                priority: priority,
                title: file.name,
                path: `files/${caseId.id}/${file.name}`,
            });
        }

        await batch.commit();
        
    }

    // Returns the state, getters and actions
    return {
        fileList,
        uploadFiles,
        getBuildingStepFiles,
        getFileList,
    };
});

