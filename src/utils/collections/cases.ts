import { collection, writeBatch, doc } from 'firebase/firestore';
import { db } from '@/utils/firebase.ts';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const cases = [

    {
        caseId: '2025-0078234',
        roadName: 'Kottesgade',
        roadNumber: '20',
        city: 'Odense',
        zipcode: 5000,
        clientId: doc(db, 'users', '3'),
        managerId: doc(db, 'users', '1'),
    },
    {
        caseId: '2025-0013458',
        roadName: 'Jernbanegade',
        roadNumber: '118A',
        city: 'Slagelse',
        zipcode: 4200,
        clientId: doc(db, 'users', '4'),
        managerId: doc(db, 'users', '1'),
    },
    {
        caseId: '2026-0024257',
        roadName: 'Kirke Allé',
        roadNumber: '1',
        city: 'Rødby',
        zipcode: 4970,
        clientId: doc(db, 'users', '5'),
        managerId: doc(db, 'users', '1'),
    },
    {
        caseId: '2026-0039758',
        roadName: 'Refshalevej',
        roadNumber: '13',
        city: 'Maribo',
        zipcode: 4930,
        clientId: doc(db, 'users', '6'),
        managerId: doc(db, 'users', '1'),
    },
    {
        caseId: '2026-0078357',
        roadName: 'Gl Landevej',
        roadNumber: '142',
        city: 'Herning',
        zipcode: 7400,
        clientId: doc(db, 'users', '7'),
        managerId: doc(db, 'users', '2'),
    },
    {
        caseId: '2026-0023648',
        roadName: 'Hovedgaden',
        roadNumber: '32',
        city: 'Stenlille',
        zipcode: 4295,
        clientId: doc(db, 'users', '8'),
        managerId: doc(db, 'users', '2'),
    },
    {
        caseId: '2026-0090643',
        roadName: 'Skagerakvej',
        roadNumber: '67',
        city: 'Holbæk',
        zipcode: 4300,
        clientId: doc(db, 'users', '9'),
        managerId: doc(db, 'users', '2'),
    },
    {
        caseId: '2026-0096012',
        roadName: 'Pilegårdsparken',
        roadNumber: '7',
        city: 'Birkerød',
        zipcode: 3460,
        clientId: doc(db, 'users', '10'),
        managerId: doc(db, 'users', '2'),
    },
];

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const addCases = async () => {
    try {
        const batch = writeBatch(db);

        for (const c of cases) {
            const ref = doc(db, 'cases', String(c.caseId));
            const { caseId, ...rest } = c;
            
            batch.set(ref, rest);
        }

        await batch.commit();
    } catch (e) {
        console.error(e);
    }
};

addCases();
