import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { db } from '@/config/firebase';
import { collection, getDocs } from 'firebase/firestore';
 
interface User {
    email: string
    firstName: string
    lastName: string
    password: string
    phoneNumber: string
    role: string
}


export const useUserStore = defineStore('user', () => {
    // State
    const userList = ref<User[]>([]);
    const currentUser = ref<User>();


    // Getters

    // Actions
    async function getUserList (): Promise<void>{
        const snapshot = await getDocs(collection(db, 'users'));
        
        snapshot.forEach((doc) => {
            userList.value.push(doc.data() as User);
        });
        
    }

    // Returns the state, getters and actions
    return {
        userList,
        currentUser,
        getUserList,
    };
});

