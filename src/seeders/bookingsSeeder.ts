import { collection, writeBatch, doc } from 'firebase/firestore';
import { db } from '@/config/firebase';


const bookings = [
    { caseId: doc(db, 'cases', '2025-0078234'), startTime: new Date(2026, 8, 3, 9, 0 ), endTime: new Date(2026, 8, 3, 10, 0 ) },
    { caseId: doc(db, 'cases', '2025-0078234'), startTime: new Date(2026, 8, 5, 9, 0 ), endTime: new Date(2026, 8, 5, 10, 0 ) },
    { caseId: doc(db, 'cases', '2026-0078357'), startTime: new Date(2026, 8, 7, 11, 0 ), endTime: new Date(2026, 8, 7, 12, 0 ) },
    { caseId: doc(db, 'cases', '2026-0078357'), startTime: new Date(2026, 8, 9, 9, 0 ), endTime: new Date(2026, 8, 9, 10, 0 ) },
    { caseId: doc(db, 'cases', '2025-0013458'), startTime: new Date(2026, 8, 7, 11, 0 ), endTime: new Date(2026, 8, 7, 12, 0 ) },
    { caseId: doc(db, 'cases', '2025-0013458'), startTime: new Date(2026, 8, 9, 9, 0 ), endTime: new Date(2026, 8, 9, 10, 0 ) },
];

const addBookings = async (): Promise<void> => {
    try {
        const batch = writeBatch(db);

        for (const booking of bookings) {
            const ref = doc(collection(db, 'bookings'));

            batch.set(ref, booking);
        }

        await batch.commit();
    } catch (e) {
        
    }
};

addBookings();
