<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = withDefaults(defineProps<{
    gap?: 1 | 2 | 3 | 4 | 5,
    width?: number,
    startIndex?: number
}>(), {
    startIndex: 0,
});

const carousel = ref<HTMLElement>();

onMounted(() => {
    if (!carousel.value) return;
    const child = carousel.value.children[props.startIndex];
    
    if (child)
        carousel.value.scrollLeft = (child as HTMLElement).offsetLeft;
});
</script>
<template>
    <div 
        class="carouselContainer" 
        :class="[gap ? `flex--gap-${gap}` : '']"
        ref="carousel"
        >
        <slot />
    </div>
</template>

