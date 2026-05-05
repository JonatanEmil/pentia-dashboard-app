<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/authStore.ts';
import { useImageStore } from '@/stores/imagesStore.ts';
import { useUserStore } from '@/stores/userStore.ts';
import { useClientImages } from '@/composables/useClientImages.ts';
import { useClientCases } from '@/composables/useClientCases.ts';
import { useSearch } from '@/composables/useSearch.ts';
import GeneralCard from '@/components/GeneralCard.vue';
import ItemList from '@/components/ItemList.vue';
import ProfilePictureWithName from '@/components/ProfilePictureWithName.vue';
import SearchBar from '@/components/SearchBar.vue';

const authStore = useAuthStore();
const imageStore = useImageStore();
const userStore = useUserStore();

const currentUser = ref();
const managerImage = ref();

const { clientImages, fetchClientImages } = useClientImages();
const { clientCases, fetchClientCases } = useClientCases();

const { searchResults, onSearchFetch } = useSearch(
    () => userStore.clientList,
    (client, query) =>
        client.firstName?.toLowerCase().includes(query) ||
        client.lastName?.toLowerCase().includes(query) ||
        client.phoneNumber?.toLowerCase().includes(query) ||
        client.caseId?.some(ref => ref?.path?.split('/')[1]?.toLowerCase().includes(query)),
);

onMounted(async () => {
    currentUser.value = await userStore.getUser(authStore.currentUser.id);
    managerImage.value = await imageStore.getUserImage(currentUser.value.imageId);

    await userStore.getClientsForManager();
    await fetchClientImages(userStore.clientList);
    await fetchClientCases(userStore.clientList);
});
</script>

<template>
    <main>
        <SearchBar class="flex--just-self-end mt--2 p--4" @searchFetch="onSearchFetch"></SearchBar>
        <div class="flex flex--align-center flex--column">
            <ProfilePictureWithName
                class="flex flex--align-center flex--gapcol-2 mt--3"
                :picture-path="managerImage"
                :picture-name="currentUser?.firstName + ' ' + currentUser?.lastName"
            >
                <p class="font--h2 m--0">Liste over dine kunder</p>
            </ProfilePictureWithName>
            <ItemList :items="searchResults" v-slot="{item}" :gap="3">
                <RouterLink :to="{ name: 'clientView', params: { userId: item.id.id } }">
                    <GeneralCard
                        card-type="client"
                        :profile="false"
                        :name="'Billede af ' + item.firstName + ' ' + item.lastName"
                        :filename="clientImages[item.id.id]"
                    >
                        <p>{{ clientCases[item.id.id]?.caseId }}</p>
                        <p>{{ clientCases[item.id.id]?.roadName }}
                            {{ clientCases[item.id.id]?.roadNumber }}</p>
                        <p>{{ item.firstName }} {{ item.lastName }}</p>
                        <p>{{ item.phoneNumber }}</p>
                    </GeneralCard>
                </RouterLink>
            </ItemList>
        </div>
    </main>
</template>
