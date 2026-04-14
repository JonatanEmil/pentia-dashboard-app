import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyDoX8RERHYBYsvvBrkXLsBTVEI6eQVVW54',
    authDomain: 'pentia-dashboard-app.firebaseapp.com',
    projectId: 'pentia-dashboard-app',
    storageBucket: 'pentia-dashboard-app.firebasestorage.app',
    messagingSenderId: '178462860487',
    appId: '1:178462860487:web:70a5bc1952dc17edf60ae2',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
