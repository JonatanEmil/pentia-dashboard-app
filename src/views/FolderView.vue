<script setup lang="ts">
import { onMounted } from 'vue';
import { useFolderImages } from '@/composables/useFolderImages.ts';
import CarouselHandler from '@/components/CarouselHandler.vue';
import ItemList from '@/components/ItemList.vue';
import ReturnButton from '@/components/common/ReturnButton.vue';

const { caseImages, rooms, fetchImages } = useFolderImages();

onMounted(async () => {
    await fetchImages();
});
</script>

<template>
    <div>
    <ReturnButton class="mt--4 mx--4"/>
    <ItemList title="Mappen" :items="rooms" v-slot="{ item }">
        <CarouselHandler
            :title="item"
            :room="item"
            :images="caseImages.filter(image => image.type === item)"
        />
    </ItemList>
    </div>
</template>
