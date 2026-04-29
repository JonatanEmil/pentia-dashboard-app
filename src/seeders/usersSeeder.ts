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
        uid: 'wnMmzXmxQZaLQsT1AcUQyLSBGnl1',
        caseId:['2025-0078234','2025-0013458','2026-0024257','2026-0039758'],
    },
    {
        firstName: 'Rikke',
        lastName: 'Sandberg Møller',
        phoneNumber: '+4553234567',
        email: 'rikke.sandberg@byggmester.dk',
        role: 'manager',
        password: 'manager2',
        uid: 'BrbzAZ9jJRbOD3RZzzapklTwIr13',
        caseId:['2026-0078357','2026-0023648','2026-0090643','2026-0096012'],
    },
    {
        firstName: 'Kenny',
        lastName: 'Jordstrom',
        phoneNumber: '+4542789023',
        email: 'kenny.jordstrom@gmail.com',
        role: 'client',
        password: 'client1',
        uid: '6AlZ7tnyWpPPTyB2pNMTcUYz6wE3',
        caseId:['2025-0078234'],
    },
    {
        firstName: 'Hanne',
        lastName: 'Brandt Sørensen',
        phoneNumber: '+4561678901',
        email: 'hanne.brandt@yahoo.dk',
        role: 'client',
        password: 'client2',
        uid: 'rfctKVmnxUOIKFfGffJo5garJo33',
        caseId:['2025-0013458'],
    },
    {
        firstName: 'Thomas',
        lastName: 'Dalgaard',
        phoneNumber: '+4529567890',
        email: 'thomas.dalgaard@gmail.com',
        role: 'client',
        password: 'client3',
        uid: 'mBfT4M44FTOpW9KAGQZ6XRQ4A373',
        caseId:['2026-0024257'],
    },
    {
        firstName: 'Camilla',
        lastName: 'Friis Nielsen',
        phoneNumber: '+4551345678',
        email: 'camilla.n@yahoo.dk',
        role: 'client',
        password: 'client4',
        uid: 'dJvR6l3AyoSQZcIrPsNJNzqdxM33',
        caseId:['2026-0039758'],
    },
    {
        firstName: 'Peter',
        lastName: 'Vestergaard',
        phoneNumber: '+4540234567',
        email: 'peter.vestergaard@outlook.com',
        role: 'client',
        password: 'client5',
        uid: 'XLdl2SneAnbBNHNm1RBlMo6BWfP2',
        caseId:['2026-0078357'],
    },
    {
        firstName: 'Lise',
        lastName: 'Holm Christensen',
        phoneNumber: '+4526789012',
        email: 'lise.holm@gmail.com',
        role: 'client',
        password: 'client6',
        uid: 'Pe1RyUIWJYPJLi2girlb29ohIMJ2',
        caseId:['2026-0023648'],
    },
    {
        firstName: 'Søren',
        lastName: 'Bak Andersen',
        phoneNumber: '+4531456789',
        email: 'soren.bak@hotmail.com',
        role: 'client',
        password: 'client7',
        uid: 'OytRe6tGrhPmIFU9f7nsjpDOMVB2',
        caseId:['2026-0090643'],
    },
    {
        firstName: 'Mette',
        lastName: 'Kjærgaard',
        phoneNumber: '+4522345678',
        email: 'mette.kjaergaard@gmail.com',
        role: 'client',
        password: 'client8',
        uid: '9q1EZc3SYcVyDIIEmagrP6gialu1',
        caseId:['2026-0096012'],
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