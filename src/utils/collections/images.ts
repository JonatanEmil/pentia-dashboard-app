import { collection, writeBatch, doc } from 'firebase/firestore';
import { db } from '@/utils/firebase.ts';


const profileImg = '@/assets/img/users/';
const folderImg = '@/assets/img/';
const houseImg = '@/assets/img/houses/';
const expirationDate = new Date();

expirationDate.setFullYear(expirationDate.getFullYear() + 2);

const images = [
    { path: profileImg + 'thomas.png', type: 'users' },
    { path: profileImg + 'jakob.png', type: 'users' },
    { path: profileImg + 'kenny.png', type: 'users' },
    { path: profileImg + 'soren.png', type: 'users' },
    { path: profileImg + 'hanne.png', type: 'users' },
    { path: profileImg + 'peter.png', type: 'users' },
    { path: profileImg + 'rikke.png', type: 'users' },
    { path: profileImg + 'camilla.png', type: 'users' },
    { path: profileImg + 'mette.png', type: 'users' },
    { path: profileImg + 'lise.png', type: 'users' },
    { path: folderImg + 'stuegulv.png', type: 'stue', caseId: doc(db, 'cases', '2025-0078234'), expirationDate: expirationDate },
    { path: folderImg + 'vinduerStue.png', type: 'stue', caseId: doc(db, 'cases', '2025-0078234'), expirationDate: expirationDate },
    { path: folderImg + 'fundament.png', type: 'fundament', caseId: doc(db, 'cases', '2025-0078234'), expirationDate: expirationDate },
    { path: folderImg + 'fundamentLeft.png', type: 'fundament', caseId: doc(db, 'cases', '2025-0078234'), expirationDate: expirationDate },
    { path: folderImg + 'fundamentRight.png', type: 'fundament', caseId: doc(db, 'cases', '2025-0078234'), expirationDate: expirationDate },
    { path: folderImg + 'kokkenHandvask', type: 'kokken', caseId: doc(db, 'cases', '2025-0078234'), expirationDate: expirationDate },
    { path: folderImg + 'koleskab.png', type: 'kokken', caseId: doc(db, 'cases', '2025-0078234'), expirationDate: expirationDate },
    { path: folderImg + 'toilet.png', type: 'badeværelse', caseId: doc(db, 'cases', '2025-0078234'), expirationDate: expirationDate },
    { path: folderImg + 'handvaskBadeværelse.png', type: 'badeværelse', caseId: doc(db, 'cases', '2025-0078234'), expirationDate: expirationDate },
    { path: folderImg + 'brusebad.png', type: 'badeværelse', caseId: doc(db, 'cases', '2025-0078234'), expirationDate: expirationDate },
    { path: folderImg + 'bryggers.png', type: 'bryggers', caseId: doc(db, 'cases', '2025-0078234'), expirationDate: expirationDate },
    { path: houseImg + 'gilmosehaven.png', type: 'house', caseId: doc(db, 'cases', '2025-0078234') },
    { path: houseImg + 'lukkedeSager.png', type: 'house', caseId: doc(db, 'cases', '2025-0013458') },
    { path: houseImg + 'graatHus.png', type: 'house', caseId: doc(db, 'cases', '2026-0024257') },
    { path: houseImg + 'munkebakken.png', type: 'house', caseId: doc(db, 'cases', '2026-0039758') },
    { path: houseImg + 'house1.png', type: 'house', caseId: doc(db, 'cases', '2026-0078357') },
    { path: houseImg + 'house2.png', type: 'house', caseId: doc(db, 'cases', '2026-0023648') },
    { path: houseImg + 'house3.png', type: 'house', caseId: doc(db, 'cases', '2026-0090643') },
    { path: houseImg + 'house4.png', type: 'house', caseId: doc(db, 'cases', '2026-00976012') },
];

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const addImages = async () => {
    try {
        const batch = writeBatch(db);

        for (const image of images) {
            const ref = doc(db, 'images', String(images.indexOf(image) + 1));

            batch.set(ref, image);
        }

        await batch.commit();
    } catch (e) {
        console.error(e);
    }
};

addImages();
