import { collection, writeBatch, doc } from 'firebase/firestore';
import { db } from '@/utils/firebase.ts';

const messages = [
    { messageId: 1, message: 'Hej jeg har et spørsgmål', caseId: '2025-0078234', senderId: 3, recieverId: 1, timestamp: new Date() },
    { messageId: 2, message: 'Hva så?', caseId: 1, senderId: '2025-0078234', recieverId: 3, timestamp: new Date() },
    { messageId: 3, message: 'Jeg har problemer med min faktura', caseId: '2025-0078234', senderId: 3, recieverId: 1, timestamp: new Date() },
    { messageId: 4, message: 'Okay, kan du uddybe problemet?', caseId: '2025-0078234', senderId: 1, recieverId: 3, timestamp: new Date() },
    { messageId: 5, message: 'Ja, beløbet ser forkert ud', caseId: '2025-0078234', senderId: 3, recieverId: 1, timestamp: new Date() },
    { messageId: 6, message: 'Jeg kigger lige på det for dig', caseId: '2025-0078234', senderId: 1, recieverId: 3, timestamp: new Date() },

    { messageId: 7, message: 'Hej, jeg har brug for hjælp til login', caseId: '2025-0013458', senderId: 4, recieverId: 1, timestamp: new Date() },
    { messageId: 8, message: 'Selvfølgelig, hvad er problemet?', caseId: '2025-0013458', senderId: 1, recieverId: 4, timestamp: new Date() },
    { messageId: 9, message: 'Jeg kan ikke nulstille min adgangskode', caseId: '2025-0013458', senderId: 4, recieverId: 1, timestamp: new Date() },
    { messageId: 10, message: 'Har du prøvet "glemt adgangskode"?', caseId: '2025-0013458', senderId: 1, recieverId: 4, timestamp: new Date() },
    { messageId: 11, message: 'Ja, men jeg modtager ikke nogen mail', caseId: '2025-0013458', senderId: 4, recieverId: 1, timestamp: new Date() },
    { messageId: 12, message: 'Tjek din spam-mappe, ellers opretter jeg en sag', caseId: '2025-0013458', senderId: 1, recieverId: 4, timestamp: new Date() },
];

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const addMessages = async () => {
    try {
        const batch = writeBatch(db);

        for (const message of messages) {
            const ref = doc(collection(db, 'messages'));

            batch.set(ref, message);
        }

        await batch.commit();
    } catch (e) {
        console.error(e);
    }
};

addMessages();
