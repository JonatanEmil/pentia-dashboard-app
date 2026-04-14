<script setup lang="ts">

import ClockIcon from '@/assets/icons/ClockIcon.vue';
import CheckmarkIcon from '@/assets/icons/CheckmarkIcon.vue';

defineProps<{
text: string,
routeName: string,
status: 'done' | 'planned',
}>();


</script>
<template>
    <div 
        class="progressCard"
        :class="{done: status == 'done'}"
        >
        <RouterLink 
            :to="{ name: routeName }" 
            class="grid h--100 me--4 ms--3" 
        >
            <h2 class="font-h2" v-if="text">{{ text }}</h2>
            <h2 class="font-h2" v-else><slot/></h2>
            <CheckmarkIcon 
                :class="{hidden: status != 'done'}" 
                class="h-fixed--4"
            />
            <ClockIcon
                :class="{hidden: status != 'planned'}" 
                class="h-fixed--4"
            />
        </RouterLink>
    </div>
</template>
