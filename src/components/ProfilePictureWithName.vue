<script setup lang="ts">
defineProps<{
    picturePath: string,
    pictureName: string
}>();
</script>

<template>
    <div class="profile-picture-with-text">
        <img :src="picturePath" :alt="'Profilbillede af ' + pictureName" class="profile-picture">
        <p class="font--h2 m--0">{{pictureName}}</p>
    </div>
</template>
