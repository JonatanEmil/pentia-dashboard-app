import { collection, writeBatch, doc } from 'firebase/firestore';
import { db } from '@/utils/firebase.ts';
import {add} from "@/scripts/add.ts";

const profileImg = '@/assets/img/users/';
const folderImg = '@/assets/img/';
const houseImg = '@/assets/img/houses/';
const expirationDate = new Date();

expirationDate.setFullYear(expirationDate.getFullYear() + 2);

const images = [
    { imageID: 1, path: profileImg + 'thomas.png', type: 'users' },
    { imageID: 2, path: profileImg + 'jakob.png', type: 'users' },
    { imageID: 3, path: profileImg + 'kenny.png', type: 'users' },
    { imageID: 4, path: profileImg + 'soren.png', type: 'users' },
    { imageID: 5, path: profileImg + 'hanne.png', type: 'users' },
    { imageID: 6, path: profileImg + 'peter.png', type: 'users' },
    { imageID: 7, path: profileImg + 'rikke.png', type: 'users' },
    { imageID: 8, path: profileImg + 'camilla.png', type: 'users' },
    { imageID: 9, path: profileImg + 'mette.png', type: 'users' },
    { imageID: 10, path: profileImg + 'lise.png', type: 'users' },
    { imageID: 11, path: folderImg + 'stuegulv.png', type: 'stue', caseId: '2025-0078234', expirationDate: expirationDate },
    { imageID: 12, path: folderImg + 'vinduerStue.png', type: 'stue', caseId: '2025-0078234', expirationDate: expirationDate },
    { imageID: 13, path: folderImg + 'fundament.png', type: 'fundament', caseId: '2025-0078234', expirationDate: expirationDate },
    { imageID: 14, path: folderImg + 'fundamentLeft.png', type: 'fundament', caseId: '2025-0078234', expirationDate: expirationDate },
    { imageID: 15, path: folderImg + 'fundamentRight.png', type: 'fundament', caseId: '2025-0078234', expirationDate: expirationDate },
    { imageID: 16, path: folderImg + 'kokkenHandvask', type: 'kokken', caseId: '2025-0078234', expirationDate: expirationDate },
    { imageID: 17, path: folderImg + 'koleskab.png', type: 'kokken', caseId: '2025-0078234', expirationDate: expirationDate },
    { imageID: 18, path: folderImg + 'toilet.png', type: 'badeværelse', caseId: '2025-0078234', expirationDate: expirationDate },
    { imageID: 19, path: folderImg + 'handvaskBadeværelse.png', type: 'badeværelse', caseId: '2025-0078234', expirationDate: expirationDate },
    { imageID: 20, path: folderImg + 'brusebad.png', type: 'badeværelse', caseId: '2025-0013458', expirationDate: expirationDate },
    { imageID: 21, path: folderImg + 'bryggers.png', type: 'bryggers', caseId: '2025-0078234', expirationDate: expirationDate },
    { imageID: 22, path: houseImg + 'gilmosehaven.png', type: 'house', caseId: '2025-0078234' },
    { imageID: 23, path: houseImg + 'lukkedeSager.png', type: 'house', caseId: '2025-0013458' },
    { imageID: 24, path: houseImg + 'graatHus.png', type: 'house', caseId: '2026-0024257' },
    { imageID: 25, path: houseImg + 'munkebakken.png', type: 'house', caseId: '2026-0039758' },
    { imageID: 26, path: houseImg + 'house1.png', type: 'house', caseId: '2026-0078357' },
    { imageID: 27, path: houseImg + 'house2.png', type: 'house', caseId: '2026-0023648' },
    { imageID: 28, path: houseImg + 'house3.png', type: 'house', caseId: '2026-0090643' },
    { imageID: 29, path: houseImg + 'house4.png', type: 'house', caseId: '2026-00976012' },
];

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const addImages = async () => {
    try {
        const batch = writeBatch(db);

        for (const image of images) {
            const ref = doc(collection(db, 'images'));

            batch.set(ref, image);
        }

        await batch.commit();
    } catch (e) {
        console.error(e);
    }
};

addImages();
