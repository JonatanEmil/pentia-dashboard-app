<script setup lang="ts">
import GeneralCard from '@/components/GeneralCard.vue';
import ItemList from '@/components/ItemList.vue';
import ProfilePictureWithName from '@/components/ProfilePictureWithName.vue';
import SearchBar from '@/components/SearchBar.vue';
import { useAuthStore } from '@/stores/authStore.ts';
import { useImageStore } from '@/stores/imagesStore.ts';
import { useUserStore } from '@/stores/userStore.ts';
import { doc, type DocumentReference } from 'firebase/firestore';
import { onMounted, ref } from 'vue';
import { db } from '@/config/firebase.ts';

const authStore = useAuthStore();
const imageStore = useImageStore();
const userStore = useUserStore();

userStore.getUserList();
const data = ref();

console.log(data);
onMounted(async () => {
    const authId = userStore.getUser(authStore.currentUser.id);
    console.log(authId);
    data.value = await imageStore.getUserImage(doc(db, 'images', '3'));
    console.log(data.value);
});

/*const currentUser = await userStore.getUser(authStore.currentUser.id);

async function getImage (id: DocumentReference): Promise<string> {
    return await imageStore.getUserImage(id);
}

const authImage = ref(await getImage(currentUser.imageId));

console.log(authImage.value);*/
</script>

<template>
  <main>
      <SearchBar class="flex--just-self-end"></SearchBar>
      <div class="flex flex--just-center flex--column">
      <ProfilePictureWithName
          :picture-path="data"
          :picture-name="'soren'"
      />
      <ItemList :items="userStore.userList" v-slot="{item}">
          <GeneralCard
              card-type="client"
              :profile="false"
              :name="'Billede af ' + item.firstName + ' ' + item.lastName"

          >
              <p>{{item.caseId[0]}}</p>
              <p>{{item.firstName}}</p>
          </GeneralCard>
      </ItemList>
      </div>
  </main>
</template>
