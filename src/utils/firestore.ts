import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const addCase = async () => {
    try {
        const docRef = await addDoc(collection(db, 'cases'), {
            caseId: 'Ada',
            roadName: 'Lovelace',
            roadNumber: 1815,
        });

        console.log('Document written with ID:', docRef.id);
    } catch (e) {
        console.error('Error adding document:', e);
    };
};