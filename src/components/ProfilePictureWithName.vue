<script setup lang="ts">
const props = defineProps<{
    picturePath: string,
    pictureName: string
}>();
console.log(props.picturePath);
</script>

<template>
    <div class="profile-picture-with-text">
        <img :src="picturePath" :alt="'Profilbillede af ' + pictureName" class="profile-picture">
        <p class="font--h2 m--0">{{pictureName}}</p>
    </div>
</template>
