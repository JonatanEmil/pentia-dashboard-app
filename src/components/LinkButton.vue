<script setup lang="ts">
import DownloadIcon from '@/assets/icons/DownloadIcon.vue';

withDefaults(defineProps<{
    routeName?: string,
    routePath?: string,
    title: string,
    variant?: 'download' | 'dense' | '',
    color?: 'dark' | 'light',
}>(), {
    variant: '',
    color: 'light',
});

</script>

<template>
    <a 
        v-if="variant == 'download'"
        download
        :href="routePath"
        class="linkButton font--p"
        :class="[variant,color]"
    >
        <DownloadIcon class="pe--1" />
        {{title}}
    </a>
    <RouterLink v-else
        :to="{ name: routeName, path: routePath}"
        class="linkButton font--p"
        :class="[variant,color]"
    >{{title}}
    </RouterLink>
</template>