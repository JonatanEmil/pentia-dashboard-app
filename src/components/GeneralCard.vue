<script setup lang="ts">
import CalenderIcon from '@/assets/icons/CalenderIcon.vue';

withDefaults(defineProps<{
    cardType: 'client' | 'case' | 'schedule'
    name?: string
    filename?: string
    cardBackground?: boolean
    profile: boolean
}>(), {
    cardBackground: true,
});

</script>

<template>
    <div :class="['card-' + cardType,  { 'card-bg': cardBackground }]"
         class="grid grid--cols-3">
        <div v-if="filename"
             :class="[profile ? 'prof-img' : 'card-img', 'w--33']">
            <img :src="filename" :alt="name" class="w--100" >
        </div>
        <div v-if="!filename">
            <CalenderIcon />
        </div>
        <div class="card-content flex flex--column flex--gaprow-3 w--66">
            <p v-if="profile" class="font--h3">Adresse</p>
               <slot></slot>
        </div>
    </div>
</template>
