<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import NavbarContainer from '@/components/NavbarContainer.vue';




</script>

<template>
    <header>
        <NavbarContainer />

        <div class="wrapper">


            <nav>
                <RouterLink to="/Nannatestarea">Nanna Test Area</RouterLink>
                <RouterLink to="/Jonatantestarea">Jonatan Test Area</RouterLink>
                <RouterLink to="/valdemartestarea"> Valdemar Test Area </RouterLink>

            </nav>
        </div>
    </header>



    <RouterView class="globalmargins" />
</template>

<style scoped></style>
