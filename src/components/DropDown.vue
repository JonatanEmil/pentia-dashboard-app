<script setup lang="ts">
import { ref } from 'vue';
import DropdownIcon from '@/assets/icons/DropdownIcon.vue';

const visible = ref(false);

</script>

<template>
    <div class="flex flex--just-center">
        <div class="w--75 flex flex--column">
            <button
                @click="visible = !visible"
                class="dropdown-button w--100 font--h3 flex flex--just-between"
            >
                <slot name="button"></slot>
                <DropdownIcon
                    class="my--1 w--25 dropdown-icon"
                    :class="!visible ? 'dropdown-flip':''"
                />
            </button>
            <div v-show="visible" class="dropdown-content w--100">
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>
