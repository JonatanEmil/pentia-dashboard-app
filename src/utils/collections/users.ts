import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase.ts';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const addCase = async () => {
    try {
        const docRef = await addDoc(collection(db, 'users'), {
            userId: 1,
            firstName: 'Jakob',
            lastName: 'Ørntoft',
            phoneNumber: '+4571123456',
            email: 'jakob.orntoft@byggmester.dk',
            role: 'manager',
            password: 'manager1',
        });

        await addDoc(collection(db, 'users'), {
            userId: 2,
            firstName: 'Rikke',
            lastName: 'Sandberg Møller',
            phoneNumber: '+4553234567',
            email: 'rikke.sandberg@byggmester.dk',
            role: 'manager',
            password: 'manager2',
        });

        await addDoc(collection(db, 'users'), {
            userId: 3,
            firstName: 'Kenny',
            lastName: 'Jordstrom',
            phoneNumber: '+4542789023',
            email: 'kenny.jordstrom@gmail.com',
            role: 'client',
            password: 'client1',
        });

        await addDoc(collection(db, 'users'), {
            userId: 4,
            firstName: 'Hanne',
            lastName: 'Brandt Sørensen',
            phoneNumber: '+4561678901',
            email: 'hanne.brandt@yahoo.dk',
            role: 'client',
            password: 'client2',
        });

        await addDoc(collection(db, 'users'), {
            userId: 5,
            firstName: 'Thomas',
            lastName: 'Dalgaard',
            phoneNumber: '+4529567890',
            email: 'thomas.dalgaard@gmail.com',
            role: 'client',
            password: 'client3',
        });

        await addDoc(collection(db, 'users'), {
            userId: 6,
            firstName: 'Camilla',
            lastName: 'Friis Nielsen',
            phoneNumber: '+4551345678',
            email: 'camilla.n@yahoo.dk',
            role: 'client',
            password: 'client4',
        });

        await addDoc(collection(db, 'users'), {
            userId: 7,
            firstName: 'Peter',
            lastName: 'Vestergaard',
            phoneNumber: '+4540234567',
            email: 'peter.vestergaard@outlook.com',
            role: 'client',
            password: 'client5',
        });

        await addDoc(collection(db, 'users'), {
            userId: 8,
            firstName: 'Lise',
            lastName: 'Holm Christensen',
            phoneNumber: '+4526789012',
            email: 'lise.holm@gmail.com',
            role: 'client',
            password: 'client6',
        });

        await addDoc(collection(db, 'users'), {
            userId: 9,
            firstName: 'Søren',
            lastName: 'Bak Andersen',
            phoneNumber: '+4531456789',
            email: 'soren.bak@hotmail.com',
            role: 'client',
            password: 'client7',
        });

        await addDoc(collection(db, 'users'), {
            userId: 10,
            firstName: 'Mette',
            lastName: 'Kjærgaard',
            phoneNumber: '+4522345678',
            email: 'mette.kjaergaard@gmail.com',
            role: 'client',
            password: 'client8',
        });
        
    } catch (e) {
        
    }
};

addCase();