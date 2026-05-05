<script setup lang="ts">
import GeneralCard from '@/components/GeneralCard.vue';
import TitleWithText from '@/components/TitleWithText.vue';
import { type AuthUser, useAuthStore } from '@/stores/authStore';
import { type User, useUserStore } from '@/stores/userStore';
import { useImageStore } from '@/stores/imagesStore';
import { ref, onMounted } from 'vue';

const authStore = useAuthStore();
const userStore = useUserStore();

const user = ref<User>();
const authUser = ref<AuthUser | null>(null);

onMounted(async () => {
    user.value = await userStore.getUser(authStore.currentUser?.id  ?? '');
    authUser.value = authStore.currentUser;
});





</script>

<template>
    <main>
        
        <GeneralCard cardType="client" :profile="true" :card-background="false" 
        filename="src/assets/img/users/kenny.png" alt="Kenny" class="globalmargins" >
        <p>{{ user?.firstName }} {{ user?.lastName }}</p>
                <p>{{ authUser?.email }}</p>
                <p>{{ user?.phoneNumber }}</p>
        </GeneralCard>
            

    </main>
</template>

<style scoped>

</style>