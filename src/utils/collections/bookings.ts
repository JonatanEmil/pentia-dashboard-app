import { collection, writeBatch, doc } from 'firebase/firestore';
import { db } from '@/utils/firebase.ts';


const bookings = [
    { caseId: 1, startTime: new Date(2026, 8, 3, 9, 0 ), endTime: new Date(2026, 8, 3, 10, 0 ) },
    { caseId: 1, startTime: new Date(2026, 8, 5, 9, 0 ), endTime: new Date(2026, 8, 5, 10, 0 ) },
    { caseId: 1, startTime: new Date(2026, 8, 7, 11, 0 ), endTime: new Date(2026, 8, 7, 12, 0 ) },
    { caseId: 1, startTime: new Date(2026, 8, 9, 9, 0 ), endTime: new Date(2026, 8, 9, 10, 0 ) },
];

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const addBookings = async () => {
    try {
        const batch = writeBatch(db);

        for (const booking of bookings) {
            const ref = doc(collection(db, 'bookings'));

            batch.set(ref, booking);
        }

        await batch.commit();
    } catch (e) {
        console.error(e);
    }
};

addBookings();
