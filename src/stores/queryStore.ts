import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { db } from '@/utils/firebase.ts';
import { collection, getDocs } from 'firebase/firestore';
import { useBookingStore } from '@/stores/bookingStore.ts';
import { useBuildingStepStore } from '@/stores/buildingStepStore.ts';
import { useCaseStore } from '@/stores/caseStore.ts';
import { useFileStore } from '@/stores/fileStore.ts';
import { useImageStore } from '@/stores/imageStore.ts';
import { useMessageStore } from '@/stores/messageStore.ts';
import { useUserStore } from '@/stores/userStore.ts';

/*const bookingStore = useBookingStore();
const buildingStepStore = useBuildingStepStore();
const caseStore = useCaseStore();
const fileStore = useFileStore();
const imageStore = useImageStore();
const messageStore = useMessageStore();
const userStore = useUserStore();*/


export const useQueryStore = defineStore('query', () => {
    // State


    // Getters


    // Actions

    return {

    };
});
