import { collection, writeBatch, doc } from 'firebase/firestore';
import { db } from '@/utils/firebase.ts';


const path = '@/assets/files/';

const steps = [
    {
        buildingStepId: 1,
        caseId: '2025-0078234',
        priority: 1,
        title: 'Byggetilladelse',
        richText: null,
        status: true,
    },
    {
        buildingStepId: 2,
        caseId: '2025-0078234',
        priority: 2,
        title: 'Opstartsmøde',
        richText: null,
        status: false,
    },
    {
        buildingStepId: 3,
        caseId: '2025-0078234',
        priority: 3,
        title: 'Materialevalg',
        richText: null,
        status: false,
    },
    {
        buildingStepId: 4,
        caseId: '2025-0078234',
        priority: 4,
        title: 'Fundament',
        richText: null,
        status: false,
    },
    {
        buildingStepId: 5,
        caseId: '2025-0078234',
        priority: 5,
        title: 'Møde afholdt',
        richText: null,
        status: false,
    },
    {
        buildingStepId: 6,
        caseId: '2025-0078234',
        priority: 6,
        title: 'Gennemgang',
        richText: null,
        status: false,
    },

];

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const addSteps = async () => {
    try {
        const batch = writeBatch(db);

        for (const step of steps) {
            const ref = doc(collection(db, 'buildingSteps'));

            batch.set(ref, step);
        }

        await batch.commit();
    } catch (e) {
        console.error(e);
    }
};

addSteps();
