<script setup lang="ts">
import ItemList from '@/components/ItemList.vue';
import NavbarButton from '@/components/NavbarButton.vue';
import { defineAsyncComponent } from 'vue';
import TitleWithText from '@/components/TitleWithText.vue';
import CheckboxWithText from '@/components/checkboxWithText.vue';
import ProgressCard from '@/components/ProgressCard.vue';
import InfoCard from '@/components/InfoCard.vue';
import CarouselContainer from '@/components/CarouselContainer.vue';
import ReturnButton from '@/components/ReturnButton.vue';
import { useUserStore } from '@/stores/userStore';



const userStore = useUserStore();

function getUsers(): void {
    userStore.getUserList();
}


</script>

<template>
  <div></div>
</template>

