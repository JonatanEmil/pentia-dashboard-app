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
const caseImage = ref<string>('');

onMounted(async () => {
    user.value = await userStore.getUser(authStore.currentUser?.id ?? '');
    authUser.value = authStore.currentUser;
    currentUser.value = await userStore.getUser(authStore.currentUser?.id ?? '');
    profileImage.value = await imageStore.getUserImage(currentUser.value.imageId);

    await imageStore.getImageList();
    const caseId = caseStore.currentCase?.caseId;

    caseImage.value = imageStore.imageList.find(
        img => img.type === 'house' && img.caseId === caseId,
    )?.path ?? '';
});

</script>

<template>
    <main class="profileView">
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

        <div class="caseHouse">
            <GeneralCard cardType="case" :profile="true" :filename="caseImage"
                :name="'Billede af ' + caseStore.currentCase?.roadName" 
                :card-background="true" class="py--2 px--0">
                <div>
                    <p class="font--light">{{ caseStore.currentCase?.roadName }}
                        {{ caseStore.currentCase?.roadNumber }},</p>
                    <p class="font--light">{{ caseStore.currentCase?.zipcode }}
                        {{ caseStore.currentCase?.city }}</p>
                </div>
            </GeneralCard>
        </div>

        <TitleWithText title="Informationer på dit nye hus" class="profileCaseInfo">
            <ul>
                <li>Forskudt længehus</li>
                <li>Sadeltag uden udhæng</li>
                <li>Boligareal: 186 kvm</li>
                <li>Grund: 890 kvm</li>
                <li>Garage: 58 kvm</li>
            </ul>
        </TitleWithText>

    </main>
</template>

<style scoped></style>