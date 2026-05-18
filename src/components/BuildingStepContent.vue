<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { useFileStore } from '@/stores/fileStore';
import { useBuildingStep } from '@/composables/useBuildingStep';
import { onMounted, ref } from 'vue';
import LinkButton from '@/components/LinkButton.vue';

const authStore = useAuthStore();
const fileStore = useFileStore();
const { currentBuildingStep, selectedFiles } = useBuildingStep();

const fileInput = ref<HTMLInputElement | null>(null);
const selectedFileURLs = ref<string[]>([]);

function handleFileUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (!input.files) return;
    selectedFiles.value = Array.from(input.files);
    selectedFileURLs.value = selectedFiles.value.map(file => URL.createObjectURL(file));
}

function autoResize(el: HTMLTextAreaElement): void {
    el.style.height = 'auto';
    el.style.height = (el.scrollHeight + 10) + 'px';
}

onMounted(() => {
    const el = document.querySelector('textarea') as HTMLTextAreaElement;
    
    if (el) autoResize(el);
});

</script>

<template>
    <div 
        v-if="authStore.currentUser && authStore.currentUser.role == 'client'"
        class="buildingStepContent"
    >
        <pre class="font--p">{{ currentBuildingStep?.richText }}</pre>
    </div>
    <div 
        v-else-if="authStore.currentUser && authStore.currentUser.role == 'manager'"
        class="buildingStepContent w--100 p--3"
    >
        <textarea 
            v-if="currentBuildingStep" 
            v-model="currentBuildingStep.richText" 
            class="w--100 p--3 font--p"
            @input="autoResize($event.target as HTMLTextAreaElement)"
            />
        <input 
        ref="fileInput" type="file" multiple style="display: none" @change="handleFileUpload" />
        <button 
            type="button" 
            @click="fileInput?.click()" 
            class="fileSelectButton font--p p--2 my--2"
        >
            Vælg filer
        </button>
        <ul 
            v-if="currentBuildingStep?.Files.length || selectedFiles.length"
            class="p--0 m--0"
            >
            <li v-for="file in currentBuildingStep?.Files" :key="file.path">
                <LinkButton 
                    :title="file.title" 
                    :routePath="fileStore.getDownloadPath(file.path)" 
                    variant="download" 
                    :icon="false"
                />
            </li>
            <li v-for="(file, index) in selectedFiles" :key="file.name">
                <LinkButton 
                    :title="file.name" 
                    :routePath="selectedFileURLs[index]" 
                    variant="download" 
                    :icon="false"
                />
            </li>
        </ul>
    </div>
</template>