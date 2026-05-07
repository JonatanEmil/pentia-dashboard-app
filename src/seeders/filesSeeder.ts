import { collection, writeBatch, doc } from 'firebase/firestore';
import { db } from '@/config/firebase';


const path = '/src/assets/files/';

const files = [
    {
        caseId: doc(db, 'cases', '2025-0078234'),
        priority: 1,
        title: 'Byggetilladelse',
        path: path + 'byggetilladelser.png',
    },
    {
        caseId: doc(db, 'cases', '2026-0078357'),
        priority: 1,
        title: 'Byggetilladelse',
        path: path + 'byggetilladelser.png',
    },
    {
        caseId: doc(db, 'cases', '2025-0013458'),
        priority: 1,
        title: 'Byggetilladelse',
        path: path + 'byggetilladelser.png',
    },

];

const addFiles = async (): Promise<void> => {
    try {
        const batch = writeBatch(db);

        for (const file of files) {
            const ref = doc(collection(db, 'files'));

            batch.set(ref, file);
        }

        await batch.commit();
    } catch (e) {
        
    }
};

addFiles();
