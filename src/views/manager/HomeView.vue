<script setup lang="ts">
import GeneralCard from '@/components/GeneralCard.vue';
import ItemList from '@/components/ItemList.vue';
import SearchBar from '@/components/SearchBar.vue';
import { useAuthStore } from '@/stores/authStore.ts';
import { useUserStore } from '@/stores/userStore.ts';

const userStore = useUserStore();
</script>

<template>
  <main>
      <SearchBar class="flex--just-self-end"></SearchBar>
      <ItemList :items="userStore.getUserList()" v-slot="{item}">
          <GeneralCard
              card-type="client"
              :profile="false"
              :name="item.imageId"
              :filename="'Billede af ' + item.firstName + ' ' + item.lastName"
          >
              <p>{{item.caseId[0]}}</p>
              <p>{{item.firstName}}</p>
          </GeneralCard>
      </ItemList>
  </main>
</template>
