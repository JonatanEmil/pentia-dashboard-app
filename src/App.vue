<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import NavbarContainer from '@/components/NavbarContainer.vue';

</script>

<template>
  <header class="h--100">
    <NavbarContainer />

    <div class="wrapper">
      <nav>
        <RouterLink to="/Nannatestarea">Nanna Test Area</RouterLink>
        <RouterLink to="/Jonatantestarea">Jonatan Test Area</RouterLink>
        <RouterLink to="/valdemartestarea"> Valdemar Test Area </RouterLink>
      </nav>
    </div>
  </header>

  <RouterView class="mainContent p--0 m--0" />
</template>

<style scoped></style>
