import { collection, writeBatch, doc } from 'firebase/firestore';
import { db } from '@/utils/firebase.ts';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const cases = [
    {
        userId: 1,
        firstName: 'Jakob',
        lastName: 'Ørntoft',
        phoneNumber: '+4571123456',
        email: 'jakob.orntoft@byggmester.dk',
        role: 'manager',
        password: 'manager1',
    },

    {
        userId: 2,
        firstName: 'Rikke',
        lastName: 'Sandberg Møller',
        phoneNumber: '+4553234567',
        email: 'rikke.sandberg@byggmester.dk',
        role: 'manager',
        password: 'manager2',
    },

    {
        userId: 3,
        firstName: 'Kenny',
        lastName: 'Jordstrom',
        phoneNumber: '+4542789023',
        email: 'kenny.jordstrom@gmail.com',
        role: 'client',
        password: 'client1',
    },

    {
        userId: 4,
        firstName: 'Hanne',
        lastName: 'Brandt Sørensen',
        phoneNumber: '+4561678901',
        email: 'hanne.brandt@yahoo.dk',
        role: 'client',
        password: 'client2',
    },

    {
        userId: 5,
        firstName: 'Thomas',
        lastName: 'Dalgaard',
        phoneNumber: '+4529567890',
        email: 'thomas.dalgaard@gmail.com',
        role: 'client',
        password: 'client3',
    },

    {
        userId: 6,
        firstName: 'Camilla',
        lastName: 'Friis Nielsen',
        phoneNumber: '+4551345678',
        email: 'camilla.n@yahoo.dk',
        role: 'client',
        password: 'client4',
    },

    {
        userId: 7,
        firstName: 'Peter',
        lastName: 'Vestergaard',
        phoneNumber: '+4540234567',
        email: 'peter.vestergaard@outlook.com',
        role: 'client',
        password: 'client5',
    },

    {
        userId: 8,
        firstName: 'Lise',
        lastName: 'Holm Christensen',
        phoneNumber: '+4526789012',
        email: 'lise.holm@gmail.com',
        role: 'client',
        password: 'client6',
    },

    {
        userId: 9,
        firstName: 'Søren',
        lastName: 'Bak Andersen',
        phoneNumber: '+4531456789',
        email: 'soren.bak@hotmail.com',
        role: 'client',
        password: 'client7',
    },

    {
        userId: 10,
        firstName: 'Mette',
        lastName: 'Kjærgaard',
        phoneNumber: '+4522345678',
        email: 'mette.kjaergaard@gmail.com',
        role: 'client',
        password: 'client8',
    },
];

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const addCases = async () => {
    try {
        const batch = writeBatch(db);

        for (const c of cases) {
            const ref = doc(collection(db, 'cases'));

            batch.set(ref, c);
        }

        await batch.commit();
    } catch (e) {
        console.error(e);
    }
};

addCases();