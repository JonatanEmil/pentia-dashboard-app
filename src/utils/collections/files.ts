import { collection, writeBatch, doc } from 'firebase/firestore';
import { db } from '@/utils/firebase.ts';


const path = '@/assets/files/';

const files = [
    {
        caseId: '2025-0078234',
        buildingStepId: 1,
        title: 'Byggetilladelse',
        path: path + 'byggetilladelser.png',
    },

];

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const addFiles = async () => {
    try {
        const batch = writeBatch(db);

        for (const file of files) {
            const ref = doc(collection(db, 'files'));

            batch.set(ref, file);
        }

        await batch.commit();
    } catch (e) {
        console.error(e);
    }
};

addFiles();
