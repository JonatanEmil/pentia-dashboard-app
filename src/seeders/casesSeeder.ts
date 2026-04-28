import { collection, writeBatch, doc } from 'firebase/firestore';
import { db } from '@/config/firebase';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const cases = [

    {
        caseId: '2025-0078234',
        roadName: 'Kottesgade',
        roadNumber: '20',
        city: 'Odense',
        zipcode: 5000,
        clientId: doc(db, 'users', '6AlZ7tnyWpPPTyB2pNMTcUYz6wE3'),
        managerId: doc(db, 'users', 'wnMmzXmxQZaLQsT1AcUQyLSBGnl1'),
    },
    {
        caseId: '2025-0013458',
        roadName: 'Jernbanegade',
        roadNumber: '118A',
        city: 'Slagelse',
        zipcode: 4200,
        clientId: doc(db, 'users', 'rfctKVmnxUOIKFfGffJo5garJo33'),
        managerId: doc(db, 'users', 'wnMmzXmxQZaLQsT1AcUQyLSBGnl1'),
    },
    {
        caseId: '2026-0024257',
        roadName: 'Kirke Allé',
        roadNumber: 'wnMmzXmxQZaLQsT1AcUQyLSBGnl1',
        city: 'Rødby',
        zipcode: 4970,
        clientId: doc(db, 'users', 'mBfT4M44FTOpW9KAGQZ6XRQ4A373'),
        managerId: doc(db, 'users', 'wnMmzXmxQZaLQsT1AcUQyLSBGnl1'),
    },
    {
        caseId: '2026-0039758',
        roadName: 'Refshalevej',
        roadNumber: '13',
        city: 'Maribo',
        zipcode: 4930,
        clientId: doc(db, 'users', 'dJvR6l3AyoSQZcIrPsNJNzqdxM33'),
        managerId: doc(db, 'users', 'wnMmzXmxQZaLQsT1AcUQyLSBGnl1'),
    },
    {
        caseId: '2026-0078357',
        roadName: 'Gl Landevej',
        roadNumber: '142',
        city: 'Herning',
        zipcode: 7400,
        clientId: doc(db, 'users', 'XLdl2SneAnbBNHNm1RBlMo6BWfP2'),
        managerId: doc(db, 'users', 'BrbzAZ9jJRbOD3RZzzapklTwIr13'),
    },
    {
        caseId: '2026-0023648',
        roadName: 'Hovedgaden',
        roadNumber: '32',
        city: 'Stenlille',
        zipcode: 4295,
        clientId: doc(db, 'users', 'Pe1RyUIWJYPJLi2girlb29ohIMJ2'),
        managerId: doc(db, 'users', 'BrbzAZ9jJRbOD3RZzzapklTwIr13'),
    },
    {
        caseId: '2026-0090643',
        roadName: 'Skagerakvej',
        roadNumber: '67',
        city: 'Holbæk',
        zipcode: 4300,
        clientId: doc(db, 'users', 'OytRe6tGrhPmIFU9f7nsjpDOMVB2'),
        managerId: doc(db, 'users', 'BrbzAZ9jJRbOD3RZzzapklTwIr13'),
    },
    {
        caseId: '2026-0096012',
        roadName: 'Pilegårdsparken',
        roadNumber: '7',
        city: 'Birkerød',
        zipcode: 3460,
        clientId: doc(db, 'users', '9q1EZc3SYcVyDIIEmagrP6gialu1'),
        managerId: doc(db, 'users', 'BrbzAZ9jJRbOD3RZzzapklTwIr13'),
    },
];

const addCases = async (): Promise<void> => {
    try {
        const batch = writeBatch(db);

        for (const c of cases) {
            const ref = doc(db, 'cases', String(c.caseId));
            const { caseId, ...rest } = c;
            
            batch.set(ref, rest);
        }

        await batch.commit();
    } catch (e) {
        console.error(e);
    }
};

addCases();
