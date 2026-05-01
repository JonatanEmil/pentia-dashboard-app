<script setup lang="ts">
import GeneralCard from '@/components/GeneralCard.vue';
import ItemList from '@/components/ItemList.vue';
import ProfilePictureWithName from "@/components/ProfilePictureWithName.vue";
import SearchBar from '@/components/SearchBar.vue';
import { useAuthStore } from '@/stores/authStore.ts';
import { useImageStore } from '@/stores/imagesStore.ts';
import { useUserStore } from '@/stores/userStore.ts';

const authStore = useAuthStore();
const imageStore = useImageStore();
const userStore = useUserStore();

userStore.getUserList();
</script>

<template>
  <main>
      <SearchBar class="flex--just-self-end"></SearchBar>
      <ProfilePictureWithName
          :picture-path="imageStore.getUserImage(authStore.currentUser.imageId)"
          :picture-name="authStore.currentUser.firstName"
      />
      <ItemList :items="userStore.userList" v-slot="{item}">
          <GeneralCard
              card-type="client"
              :profile="false"
              :name="'Billede af ' + item.firstName + ' ' + item.lastName"
              :filename="imageStore.getUserImage(item.imageId)"
          >
              <p>{{item.caseId[0]}}</p>
              <p>{{item.firstName}}</p>
          </GeneralCard>
      </ItemList>
  </main>
</template>
