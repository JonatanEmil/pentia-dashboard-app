import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase.ts';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const addCase = async () => {
    try {
        const docRef = await addDoc(collection(db, 'cases'), {
            caseId: '2025-0078234',
            roadName: 'Kottesgade',
            roadNumber: '20',
            city: 'Odense',
            zipcode: 5000,
        });
        
        await addDoc(collection(db, 'cases'), {
            caseId: '2025-0013458',
            roadName: 'Jernbanegade',
            roadNumber: '118A',
            city: 'Slagelse',
            zipcode: 4200,
        });
        
        await addDoc(collection(db, 'cases'),{
            caseId: '2026-0024257',
            roadName: 'Kirke Allé',
            roadNumber: '1',
            city: 'Rødby',
            zipcode: 4970,
        });
        
        await addDoc(collection(db, 'cases'), {
            caseId: '2026-0039758',
            roadName: 'Refshalevej',
            roadNumber: '13',
            city: 'Maribo',
            zipcode: 4930,
        });

        await addDoc(collection(db, 'cases'), {
            caseId: '2026-0078357',
            roadName: 'Gl Landevej',
            roadNumber: '142',
            city: 'Herning',
            zipcode: 7400,
        });

        await addDoc(collection(db, 'cases'),{
            caseId: '2026-0023648',
            roadName: 'Hovedgaden',
            roadNumber: '32',
            city: 'Stenlille',
            zipcode: 4295,   
        });

        await addDoc(collection(db, 'cases'),{
            caseId: '2026-0090643',
            roadName: 'Skagerakvej',
            roadNumber: '67',
            city: 'Holbæk',
            zipcode: 4300,   
        });

        await addDoc(collection(db, 'cases'), {
            caseId: '2026-00976012',
            roadName: 'Pilegårdsparken',
            roadNumber: '7',
            city: 'Birkerød',
            zipcode: 3460,
        });
        
    } catch (e) {
    }
};

addCase();
