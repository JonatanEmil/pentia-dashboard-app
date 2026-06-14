<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DownloadIcon from '@/assets/icons/DownloadIcon.vue';

const props = withDefaults(defineProps<{
    routeName?: string,
    routePath?: string | Promise<string>,
    routeParams?: { [key: string]: string | number },
    icon?: boolean,
    title: string,
    variant?: 'download' | 'dense' | '',
    color?: 'dark' | 'light',
}>(), {
    variant: '',
    color: 'light',
    icon: true,
});

const resolvedPath = ref<string>('');

onMounted(async () => {
    if (props.routePath instanceof Promise) {
        resolvedPath.value = await props.routePath;
    } else {
        resolvedPath.value = props.routePath ?? '';
    }
});
</script>

<template>
    <a 
        v-if="variant == 'download'"
        download
        :href="resolvedPath"
        target="_blank"
        class="linkButton font--p"
        :class="[variant,color, !icon ? 'underline': '']"
    >
        <DownloadIcon v-if="icon" class="pe--1" />
        {{title}}
    </a>
    <RouterLink v-else
        :to="routeName ? { name: routeName, params: routeParams } : { path: resolvedPath }"
        class="linkButton font--p"
        :class="[variant,color]"
    >{{title}}
    </RouterLink>
</template>
<style scoped lang="scss">
    @use '@/assets/scss/components/linkButton';
</style>