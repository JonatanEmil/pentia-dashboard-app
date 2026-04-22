import { collection, writeBatch, doc } from 'firebase/firestore';
import { db } from '@/utils/firebase.ts';


const path = '@/assets/files/';

const steps = [
    {
        caseId: doc(db, 'cases', '2025-0078234'),
        priority: 1,
        title: 'Byggetilladelse',
        richText: null,
        status: true,
    },
    {
        caseId: doc(db, 'cases', '2025-0078234'),
        priority: 2,
        title: 'Opstartsmøde',
        richText: null,
        status: false,
    },
    {
        caseId: doc(db, 'cases', '2025-0078234'),
        priority: 3,
        title: 'Materialevalg',
        richText: null,
        status: false,
    },
    {
        caseId: doc(db, 'cases', '2025-0078234'),
        priority: 4,
        title: 'Fundament',
        richText: null,
        status: false,
    },
    {
        caseId: doc(db, 'cases', '2025-0078234'),
        priority: 5,
        title: 'Møde afholdt',
        richText: null,
        status: false,
    },
    {
        caseId: doc(db, 'cases', '2025-0078234'),
        priority: 6,
        title: 'Gennemgang',
        richText: null,
        status: false,
    },
    {
        caseId: doc(db, 'cases', '2026-0078357'),
        priority: 1,
        title: 'Byggetilladelse',
        richText: null,
        status: true,
    },
    {
        caseId: doc(db, 'cases', '2026-0078357'),
        priority: 2,
        title: 'Opstartsmøde',
        richText: null,
        status: false,
    },
    {
        caseId: doc(db, 'cases', '2026-0078357'),
        priority: 3,
        title: 'Materialevalg',
        richText: null,
        status: false,
    },
    {
        caseId: doc(db, 'cases', '2026-0078357'),
        priority: 4,
        title: 'Fundament',
        richText: null,
        status: false,
    },
    {
        caseId: doc(db, 'cases', '2026-0078357'),
        priority: 5,
        title: 'Møde afholdt',
        richText: null,
        status: false,
    },
    {
        caseId: doc(db, 'cases', '2026-0078357'),
        priority: 6,
        title: 'Gennemgang',
        richText: null,
        status: false,
    },
    {
        caseId: doc(db, 'cases', '2025-0013458'),
        priority: 1,
        title: 'Byggetilladelse',
        richText: null,
        status: true,
    },
    {
        caseId: doc(db, 'cases', '2025-0013458'),
        priority: 2,
        title: 'Opstartsmøde',
        richText: null,
        status: false,
    },
    {
        caseId: doc(db, 'cases', '2025-0013458'),
        priority: 3,
        title: 'Materialevalg',
        richText: null,
        status: false,
    },
    {
        caseId: doc(db, 'cases', '2025-0013458'),
        priority: 4,
        title: 'Fundament',
        richText: null,
        status: false,
    },
    {
        caseId: doc(db, 'cases', '2025-0013458'),
        priority: 5,
        title: 'Møde afholdt',
        richText: null,
        status: false,
    },
    {
        caseId: doc(db, 'cases', '2025-0013458'),
        priority: 6,
        title: 'Gennemgang',
        richText: null,
        status: false,
    },
];

const addSteps = async (): Promise<void> => {
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
