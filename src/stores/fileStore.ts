import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { db } from '@/utils/firebase.ts';
import { collection, getDocs } from 'firebase/firestore';

interface File {
    caseId: string
    priority: number
    title: string
    path: string
}


export const useFileStore = defineStore('file', () => {
    // State
    const fileList = ref<File[]>([]);

    // Getters


    // Actions
    async function getFileList (): Promise<void>{
        const snapshot = await getDocs(collection(db, 'files'));

        snapshot.forEach((doc) => {
            const data = doc.data();

            fileList.value.push({
                caseId: data.caseId.id,
                priority: data.priority,
                title: data.title,
                path: data.path,
            });
        });

    }

    // Returns the state, getters and actions
    return {
        fileList,
        getFileList,
    };
});

