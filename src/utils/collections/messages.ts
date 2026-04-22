import { collection, writeBatch, doc } from 'firebase/firestore';
import { db } from '@/utils/firebase.ts';

const messages = [
    { message: 'Hej jeg har et spørsgmål', caseId: doc(db, 'cases', '2025-0078234'), senderId: doc(db, 'users', '3'), recieverId: doc(db, 'users', '1'), timestamp: new Date() },
    { message: 'Hva så?', caseId: doc(db, 'cases', '2025-0078234'), senderId: doc(db, 'users', '1'), recieverId: doc(db, 'users', '3'), timestamp: new Date() },
    { message: 'Jeg har problemer med min faktura', caseId: doc(db, 'cases', '2025-0078234'), senderId: doc(db, 'users', '3'), recieverId: doc(db, 'users', '1'), timestamp: new Date() },
    { message: 'Okay, kan du uddybe problemet?', caseId: doc(db, 'cases', '2025-0078234'), senderId: doc(db, 'users', '1'), recieverId: doc(db, 'users', '3'), timestamp: new Date() },
    { message: 'Ja, beløbet ser forkert ud', caseId: doc(db, 'cases', '2025-0078234'), senderId: doc(db, 'users', '3'), recieverId: doc(db, 'users', '1'), timestamp: new Date() },
    { message: 'Jeg kigger lige på det for dig', caseId: doc(db, 'cases', '2025-0078234'), senderId: doc(db, 'users', '1'), recieverId: doc(db, 'users', '3'), timestamp: new Date() },

    { message: 'Hej, jeg har brug for hjælp til login', caseId: '2025-0013458', senderId: doc(db, 'users', '4'), recieverId: doc(db, 'users', '1'), timestamp: new Date() },
    { message: 'Selvfølgelig, hvad er problemet?', caseId: '2025-0013458', senderId: doc(db, 'users', '1'), recieverId: doc(db, 'users', '4'), timestamp: new Date() },
    { message: 'Jeg kan ikke nulstille min adgangskode', caseId: '2025-0013458', senderId: doc(db, 'users', '4'), recieverId: doc(db, 'users', '1'), timestamp: new Date() },
    { message: 'Har du prøvet "glemt adgangskode"?', caseId: '2025-0013458', senderId: doc(db, 'users', '1'), recieverId: doc(db, 'users', '4'), timestamp: new Date() },
    { message: 'Ja, men jeg modtager ikke nogen mail', caseId: '2025-0013458', senderId: doc(db, 'users', '4'), recieverId: doc(db, 'users', '1'), timestamp: new Date() },
    { message: 'Tjek din spam-mappe, ellers opretter jeg en sag', caseId: '2025-0013458', senderId: doc(db, 'users', '1'), recieverId: doc(db, 'users', '4'), timestamp: new Date() },
];

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const addMessages = async () => {
    try {
        const batch = writeBatch(db);

        for (const message of messages) {
            const ref = doc(db, 'messages', String(messages.indexOf(message) + 1));

            batch.set(ref, message);
        }

        await batch.commit();
    } catch (e) {
        console.error(e);
    }
};

addMessages();
