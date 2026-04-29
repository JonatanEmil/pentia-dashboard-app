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
        imageId: doc(db, 'images', '2'),
        uid: 'wnMmzXmxQZaLQsT1AcUQyLSBGnl1',
    },
    {
        firstName: 'Rikke',
        lastName: 'Sandberg Møller',
        phoneNumber: '+4553234567',
        email: 'rikke.sandberg@byggmester.dk',
        role: 'manager',
        password: 'manager2',
        imageId: doc(db, 'images', '7'),
        uid: 'BrbzAZ9jJRbOD3RZzzapklTwIr13',
    },
    {
        firstName: 'Kenny',
        lastName: 'Jordstrom',
        phoneNumber: '+4542789023',
        email: 'kenny.jordstrom@gmail.com',
        role: 'client',
        password: 'client1',
        imageId: doc(db, 'images', '3'),
        uid: '6AlZ7tnyWpPPTyB2pNMTcUYz6wE3',
    },
    {
        firstName: 'Hanne',
        lastName: 'Brandt Sørensen',
        phoneNumber: '+4561678901',
        email: 'hanne.brandt@yahoo.dk',
        role: 'client',
        password: 'client2',
        imageId: doc(db, 'images', '5'),
        uid: 'rfctKVmnxUOIKFfGffJo5garJo33',
    },
    {
        firstName: 'Thomas',
        lastName: 'Dalgaard',
        phoneNumber: '+4529567890',
        email: 'thomas.dalgaard@gmail.com',
        role: 'client',
        password: 'client3',
        imageId: doc(db, 'images', '1'),
        uid: 'mBfT4M44FTOpW9KAGQZ6XRQ4A373',
    },
    {
        firstName: 'Camilla',
        lastName: 'Friis Nielsen',
        phoneNumber: '+4551345678',
        email: 'camilla.n@yahoo.dk',
        role: 'client',
        password: 'client4',
        imageId: doc(db, 'images', '8'),
        uid: 'dJvR6l3AyoSQZcIrPsNJNzqdxM33',
    },
    {
        firstName: 'Peter',
        lastName: 'Vestergaard',
        phoneNumber: '+4540234567',
        email: 'peter.vestergaard@outlook.com',
        role: 'client',
        password: 'client5',
        imageId: doc(db, 'images', '6'),
        uid: 'XLdl2SneAnbBNHNm1RBlMo6BWfP2',
    },
    {
        firstName: 'Lise',
        lastName: 'Holm Christensen',
        phoneNumber: '+4526789012',
        email: 'lise.holm@gmail.com',
        role: 'client',
        password: 'client6',
        imageId: doc(db, 'images', '10'),
        uid: 'Pe1RyUIWJYPJLi2girlb29ohIMJ2',
    },
    {
        firstName: 'Søren',
        lastName: 'Bak Andersen',
        phoneNumber: '+4531456789',
        email: 'soren.bak@hotmail.com',
        role: 'client',
        password: 'client7',
        imageId: doc(db, 'images', '4'),
        uid: 'OytRe6tGrhPmIFU9f7nsjpDOMVB2',
    },
    {
        firstName: 'Mette',
        lastName: 'Kjærgaard',
        phoneNumber: '+4522345678',
        email: 'mette.kjaergaard@gmail.com',
        role: 'client',
        password: 'client8',
        imageId: doc(db, 'images', '9'),
        uid: '9q1EZc3SYcVyDIIEmagrP6gialu1',
    },
];

const addUsers = async (): Promise<void> => {
    try {
        const batch = writeBatch(db);

        for (const user of users) {
            // Use userId as Firestore document ID
            const ref = doc(db, 'users', String(user.uid));
            const { uid,email,password, ...rest } = user;

            batch.set(ref, rest);
        }
        await batch.commit();
        
    } catch (e) {
      
    }
};

addUsers();
