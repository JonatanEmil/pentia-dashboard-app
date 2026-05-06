<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore.ts';
import { useImageStore } from '@/stores/imagesStore.ts';
import { useRoute } from 'vue-router';
import AddImageButton from '@/components/AddImageButton.vue';
import CarouselContainer from '@/components/CarouselContainer.vue';
import { onMounted, ref } from 'vue';

const props = defineProps<{
    title: string
    room: 'stue' | 'fundament' | 'kokken' | 'badeværelse' | 'bryggers'
}>();

const authStore = useAuthStore();
const imageStore = useImageStore();
const route = useRoute();

const caseId = route.params.caseId as string;
const userRole = authStore.currentUser?.role;
const filteredImages = ref();

onMounted( async ()=> {
    const caseImages = await imageStore.getImagesByCase(caseId);

    filteredImages.value = caseImages.filter(image => image.type === props.room);
});



</script>

<template>
    <p>{{title}}</p>
    <div class="carousel-handler flex">
        <AddImageButton
            class="h--100"
            v-if="userRole === 'manager'"/>
        <CarouselContainer style="height: 100%">
            <div v-for="(image, index) in filteredImages " :key="index">
                <img :src="image.path" :alt="'Billede af typen' + image.type">
            </div>
        </CarouselContainer>
    </div>
</template>
