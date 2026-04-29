<script setup lang="ts">
import DownloadIcon from '@/assets/icons/DownloadIcon.vue';

withDefaults(defineProps<{
    routeName?: string,
    routePath?: string,
    title: string,
    variant?: 'download' | 'dense' | '',
}>(), {
    variant: '',
});

</script>

<template>
    <a 
    v-if="variant == 'download'"
        :href="routePath"
        class="linkButton font--p"
        :class="variant"
    >
        <DownloadIcon class="pe--1" />
        {{title}}
    </a>
    <RouterLink v-else
        :to="{ name: routeName, path: routePath}"
        class="linkButton font--p"
        :class="variant"
    >{{title}}
    </RouterLink>
</template>