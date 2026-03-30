<script setup lang="ts">



</script>
<template>
    <div class="card">
        <div class="card-img">
            <img :src="imageSource" :alt="'Et billede af ' + picture.name">
        </div>
        <div class="card-content">
            {{textContent}}
        </div>
    </div>
</template>
