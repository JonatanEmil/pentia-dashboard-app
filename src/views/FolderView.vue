<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import { useImageStore, type Image } from '@/stores/imagesStore.ts';
import CarouselHandler from '@/components/CarouselHandler.vue';
import ItemList from '@/components/ItemList.vue';
import ReturnButton from '@/components/common/ReturnButton.vue';

const imageStore = useImageStore();
const route = useRoute();

const caseId = route.params.caseId as string;

const caseImages = ref<Image[]>([]);
const rooms = ref<string[]>([]);

onMounted(async () => {
    caseImages.value = await imageStore.getImagesByCase(caseId);
    rooms.value = [...new Set(caseImages.value.map(image => image.type))];
});

</script>


<template>
    <ReturnButton class="mt--4 mx--4"/>
    <ItemList title="Mappen" :items="rooms" v-slot="{ item }">
        <CarouselHandler
            :title="item"
            :room="item"
            :images="caseImages.filter(image => image.type === item)"
        />
    </ItemList>
</template>
