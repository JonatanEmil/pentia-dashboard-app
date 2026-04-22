<script setup lang="ts">

defineProps<{
  text: string,
  id?: string,
  name: string,
  checked?: boolean,
}>();


</script>
<template>
    <div class="grid grid--gap-2 checkboxWithText">
        <label 
            v-if="text"
            :for="id"
            class="font--p" 
        >
            {{ text }}
        </label>
        <input 
            type="checkbox" 
            :name="name" 
            :id="id" 
            :checked="checked"
            >
        
    </div>
</template>
