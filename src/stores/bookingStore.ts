import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { db } from '@/utils/firebase.ts';
import { collection, getDocs } from 'firebase/firestore';

interface Booking {
    caseId: String
    startTime: Date
    endTime: Date
}


export const useBookingStore = defineStore('booking', () => {
    // State
    const bookingList = ref<Booking[]>([]);

    // Getters

    // Actions
    async function getBookingList(): Promise<void> {
        const snapshot = await getDocs(collection(db, 'bookings'));

        snapshot.forEach((doc) => {
            const data = doc.data();

            bookingList.value.push({
                caseId: data.caseId.id,        // DocumentReference → string path
                startTime: data.startTime.toDate(),  // Timestamp → Date
                endTime: data.endTime.toDate(),      // Timestamp → Date
            });
        });
    }

    // Returns the state, getters and actions
    return {
        bookingList,
        getBookingList,
    };
});

