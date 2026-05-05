<script setup lang="ts">
import GeneralCard from '@/components/GeneralCard.vue';
import ItemList from '@/components/ItemList.vue';
import ProfilePictureWithName from '@/components/ProfilePictureWithName.vue';
import SearchBar from '@/components/SearchBar.vue';
import { useAuthStore } from '@/stores/authStore.ts';
import { useImageStore } from '@/stores/imagesStore.ts';
import { useUserStore } from '@/stores/userStore.ts';
import { useCaseStore, type Case } from '@/stores/caseStore.ts';
import { type DocumentReference } from 'firebase/firestore';
import { computed, onMounted, ref } from 'vue';


const authStore = useAuthStore();
const imageStore = useImageStore();
const userStore = useUserStore();
const caseStore = useCaseStore();
const clientCases = ref<{ [key: string]: Case }>({});

userStore.getUserList();

const currentUser = ref();
const managerImage = ref();
const clientImages = ref<{ [key: string]: string }>({});

onMounted(async () => {
    currentUser.value = await userStore.getUser(authStore.currentUser.id);
    managerImage.value = await imageStore.getUserImage(currentUser.value.imageId);

    await userStore.getClientsForManager();

    const imageEntries = await Promise.all(
        userStore.clientList.map(async (client) => {
            const path = await imageStore.getUserImage(client.imageId);

            return [client.id.id, path];
        }),
    );

    clientImages.value = Object.fromEntries(imageEntries);

    const caseEntries = await Promise.all(
        userStore.clientList.map(async (client) => {
            const clientCase = await caseStore.getCase(client.caseId[0] as DocumentReference);

            return [client.id.id, clientCase];
        }),
    );

    clientCases.value = Object.fromEntries(caseEntries);
});

const searchQuery = ref('');

const searchResults = computed(() => {
    if (!searchQuery.value) return userStore.clientList;
    const query = searchQuery.value.toLowerCase();

    return userStore.clientList.filter((client) =>
        client.firstName?.toLowerCase().includes(query) ||
        client.lastName?.toLowerCase().includes(query) ||
        client.phoneNumber?.toLowerCase().includes(query) ||
        client.caseId?.some(ref => ref?.path?.split('/')[1]?.toLowerCase().includes(query)),
    );
});

async function onSearchFetch(query: string): Promise<void> {
    searchQuery.value = query;
}
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
