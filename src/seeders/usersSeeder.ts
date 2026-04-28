import { collection, writeBatch, doc } from 'firebase/firestore';
import { db } from '@/config/firebase';

const users = [
    {
        firstName: 'Jakob',
        lastName: 'Ørntoft',
        phoneNumber: '+4571123456',
        email: 'jakob.orntoft@byggmester.dk',
        role: 'manager',
        password: 'manager1',
    },
    {
        firstName: 'Rikke',
        lastName: 'Sandberg Møller',
        phoneNumber: '+4553234567',
        email: 'rikke.sandberg@byggmester.dk',
        role: 'manager',
        password: 'manager2',
    },
    {
        firstName: 'Kenny',
        lastName: 'Jordstrom',
        phoneNumber: '+4542789023',
        email: 'kenny.jordstrom@gmail.com',
        role: 'client',
        password: 'client1',
    },
    {
        firstName: 'Hanne',
        lastName: 'Brandt Sørensen',
        phoneNumber: '+4561678901',
        email: 'hanne.brandt@yahoo.dk',
        role: 'client',
        password: 'client2',
    },
    {
        firstName: 'Thomas',
        lastName: 'Dalgaard',
        phoneNumber: '+4529567890',
        email: 'thomas.dalgaard@gmail.com',
        role: 'client',
        password: 'client3',
    },
    {
        firstName: 'Camilla',
        lastName: 'Friis Nielsen',
        phoneNumber: '+4551345678',
        email: 'camilla.n@yahoo.dk',
        role: 'client',
        password: 'client4',
    },
    {
        firstName: 'Peter',
        lastName: 'Vestergaard',
        phoneNumber: '+4540234567',
        email: 'peter.vestergaard@outlook.com',
        role: 'client',
        password: 'client5',
    },
    {
        firstName: 'Lise',
        lastName: 'Holm Christensen',
        phoneNumber: '+4526789012',
        email: 'lise.holm@gmail.com',
        role: 'client',
        password: 'client6',
    },
    {
        firstName: 'Søren',
        lastName: 'Bak Andersen',
        phoneNumber: '+4531456789',
        email: 'soren.bak@hotmail.com',
        role: 'client',
        password: 'client7',
    },
    {
        firstName: 'Mette',
        lastName: 'Kjærgaard',
        phoneNumber: '+4522345678',
        email: 'mette.kjaergaard@gmail.com',
        role: 'client',
        password: 'client8',
    },
];

const addUsers = async (): Promise<void> => {
    try {
        const batch = writeBatch(db);
        
        for (const user of users) {
            // Use userId as Firestore document ID
            const ref = doc(db, 'users', String(users.indexOf(user) + 1));
            
            batch.set(ref, user);
        }
        await batch.commit();
        console.log('Users added successfully');
    } catch (e) {
        console.error(e);
    }
};

addUsers();