<script setup lang="ts">
import GeneralCard from '@/components/GeneralCard.vue';
import TitleWithText from '@/components/TitleWithText.vue';
import { type AuthUser, useAuthStore } from '@/stores/authStore';
import { type User, useUserStore } from '@/stores/userStore';
import { useImageStore } from '@/stores/imagesStore';
import { useCaseStore } from '@/stores/caseStore';
import { ref, onMounted } from 'vue';

const authStore = useAuthStore();
const userStore = useUserStore();
const imageStore = useImageStore();
const caseStore = useCaseStore();

const user = ref<User>();
const authUser = ref<AuthUser | null>(null);
const currentUser = ref();
const profileImage = ref();

onMounted(async () => {
    user.value = await userStore.getUser(authStore.currentUser?.id  ?? '');
    authUser.value = authStore.currentUser;
    currentUser.value = await userStore.getUser(authStore.currentUser?.id ?? '');
    profileImage.value = await imageStore.getUserImage(currentUser.value.imageId);
});

</script>

<template>
    <main>
        <div class="profileHero">
        <GeneralCard cardType="client" :profile="true" :card-background="false" 
        :name="'Billede af ' + user?.firstName + ' ' + user?.lastName"
        :filename="profileImage" class="px--4">
        <div class="ps--3">
        <p>{{ user?.firstName }} {{ user?.lastName }}</p>
        <p>{{ authUser?.email }}</p>
        <p>{{ user?.phoneNumber }}</p>
        </div>
        </GeneralCard>
        </div>

        <GeneralCard cardType="case" :profile="true" :card-background="false" 
    </main>
</template>

<style scoped>

</style>