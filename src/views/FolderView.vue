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
    <ItemList title="Mappen" :items="rooms" v-slot="{ item }" class="mb--4 ms--4">
        <CarouselHandler
            :title="item.charAt(0).toUpperCase() + item.slice(1)"
            :room="item"
            :images="caseImages.filter(image => image.type === item)"
        />
    </ItemList>
    </div>
</template>
