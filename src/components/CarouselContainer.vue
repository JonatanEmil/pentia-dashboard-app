<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue';

const props = withDefaults(defineProps<{
    gap?: 1 | 2 | 3 | 4 | 5,
    width?: number,
    startIndex?: number
}>(), {
    startIndex: 0,
});

const carousel = ref<HTMLElement>();

onMounted(async() => {
    await nextTick();
    if (!carousel.value) return;
    const child = carousel.value.children[props.startIndex];
    
    if (child) {
        (child as HTMLElement).scrollIntoView({ inline: 'center', block: 'nearest' });
    };
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

<style scoped lang="scss">

</style>