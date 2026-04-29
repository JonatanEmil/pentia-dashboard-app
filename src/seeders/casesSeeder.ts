import { collection, writeBatch, doc } from 'firebase/firestore';
import { db } from '@/config/firebase';


const cases = [

    {
        caseId: '2025-0078234',
        roadName: 'Kottesgade',
        roadNumber: '20',
        city: 'Odense',
        zipcode: 5000,
    },
    {
        caseId: '2025-0013458',
        roadName: 'Jernbanegade',
        roadNumber: '118A',
        city: 'Slagelse',
        zipcode: 4200,
    },
    {
        caseId: '2026-0024257',
        roadName: 'Kirke Allé',
        roadNumber: '23',
        city: 'Rødby',
        zipcode: 4970,
    },
    {
        caseId: '2026-0039758',
        roadName: 'Refshalevej',
        roadNumber: '13',
        city: 'Maribo',
        zipcode: 4930,
    },
    {
        caseId: '2026-0078357',
        roadName: 'Gl Landevej',
        roadNumber: '142',
        city: 'Herning',
        zipcode: 7400,
    },
    {
        caseId: '2026-0023648',
        roadName: 'Hovedgaden',
        roadNumber: '32',
        city: 'Stenlille',
        zipcode: 4295,
    },
    {
        caseId: '2026-0090643',
        roadName: 'Skagerakvej',
        roadNumber: '67',
        city: 'Holbæk',
        zipcode: 4300,
    },
    {
        caseId: '2026-0096012',
        roadName: 'Pilegårdsparken',
        roadNumber: '7',
        city: 'Birkerød',
        zipcode: 3460,
    },
];

const addCases = async (): Promise<void> => {
    try {
        const batch = writeBatch(db);

        for (const c of cases) {
            const ref = doc(db, 'cases', String(c.caseId));
            const { caseId, ...rest } = c;
            
            batch.set(ref, rest);
        }

        await batch.commit();
    } catch (e) {
        
    }
};

addCases();
