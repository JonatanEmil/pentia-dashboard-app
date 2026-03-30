<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import NavbarContainer from '@/components/NavbarContainer.vue';
</script>

<template>
  <header>
    <NavbarContainer/>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/Nannatestarea">Nanna Test Area</RouterLink>
  </header>

  <RouterView />
</template>