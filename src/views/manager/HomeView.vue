<script setup lang="ts">
import GeneralCard from '@/components/GeneralCard.vue';
import ItemList from '@/components/ItemList.vue';
import ProfilePictureWithName from '@/components/ProfilePictureWithName.vue';
import SearchBar from '@/components/SearchBar.vue';
import { useAuthStore } from '@/stores/authStore.ts';
import { useImageStore } from '@/stores/imagesStore.ts';
import { useUserStore } from '@/stores/userStore.ts';
import { useCaseStore, type Case } from '@/stores/caseStore.ts';
import { doc, type DocumentReference } from 'firebase/firestore';
import { onMounted, ref } from 'vue';
import { db } from '@/config/firebase.ts';
import * as path from "node:path";

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
        })
    );

    clientCases.value = Object.fromEntries(caseEntries);
});
</script>

<template>
  <main>
      <SearchBar class="flex--just-self-end"></SearchBar>
      <div class="flex flex--just-center flex--column">
          <ProfilePictureWithName
              :picture-path="managerImage"
              :picture-name="currentUser?.firstName + ' ' + currentUser?.lastName"
          />
          <ItemList :items="userStore.clientList" v-slot="{item}">
          <GeneralCard
              card-type="client"
              :profile="false"
              :name="'Billede af ' + item.firstName + ' ' + item.lastName"
              :filename="clientImages[item.id.id]"
          >
              <p>{{clientCases[item.id.id]?.caseId}}</p>
              <p>{{clientCases[item.id.id]?.roadName}} {{clientCases[item.id.id]?.roadNumber}}</p>
              <p>{{item.firstName}} {{item.lastName}}</p>
              <p>{{item.phoneNumber}}</p>
          </GeneralCard>
      </ItemList>
      </div>
  </main>
</template>
