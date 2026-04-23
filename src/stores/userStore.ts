import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { db } from '@/utils/firebase.ts';
import { collection, getDocs } from 'firebase/firestore';
 
interface User {
    email: String
    firstName: String
    lastName: String
    password: String
    phoneNumber: String
    role: String
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

