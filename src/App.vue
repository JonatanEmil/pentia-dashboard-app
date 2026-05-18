<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavbarContainer from '@/components/NavbarContainer.vue';

</script>

<template>
  <header class="h--100">
    <NavbarContainer />
  </header>

  <RouterView class="mainContent p--0 m--0" />
</template>

<style scoped></style>
