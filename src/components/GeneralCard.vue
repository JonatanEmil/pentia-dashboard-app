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
         class="flex flex--just-around flex--align-center">
        <div v-if="filename"
             :class="[profile  && cardType === 'client' ? 'prof-img' : 'card-img']">
            <img :src="filename" :alt="name" class="w--100" >
        </div>
        <div v-else class="h--100 flex">
            <CalenderIcon class="h--75 w-auto my--auto" />
        </div>
        <div class="card-content flex flex--column flex--gaprow-1">
            <p v-if="profile && cardType === 'case'" class="font--h3">Adresse</p>
               <slot></slot>
        </div>
    </div>
</template>
