<script setup lang="ts" generic="T">
defineProps<{
    titel?: string,
    items: T[],
    columns?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
    gap?: 1 | 2 | 3 | 4 | 5,
}>();

</script>

<template>
    <h2 class="font--h2">{{ titel }}</h2>
    <div
    :class="[
        'itemList',
        'grid',
        columns ? `grid--cols-${columns}` : '',
        gap ? `grid--gap-${gap}` : ''
    ]">
        <slot
            v-for="(item, index) in items"
            :key="index"
            :item="item"
            :index="index"
        />
    </div>
</template>
<style scoped>

</style>