<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore.ts';
import { type Image } from '@/stores/imagesStore.ts';
import AddImageButton from '@/components/AddImageButton.vue';
import CarouselContainer from '@/components/CarouselContainer.vue';

defineProps<{
    title: string
    room: string
    images: Image[]
}>();


const authStore = useAuthStore();
const userRole = authStore.currentUser.role;
</script>

<template>
    <p>{{title}}</p>
    <div class="carousel-handler flex">
        <AddImageButton
            class="h--100"
            v-if="userRole === 'manager'"
            :type="room"
        />
        <CarouselContainer class="h--100">
            <div v-for="(image, index) in images " :key="index">
                <img :src="image.path" :alt="'Billede af typen' + image.type">
            </div>
        </CarouselContainer>
    </div>
</template>
