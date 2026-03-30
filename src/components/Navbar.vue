<script setup lang="ts">
    import NavbarButton from './components/NavbarButton.vue';
    import svg from '@/assets/icons/ikon_besked.svg';

</script>
<template>
        <NavbarButton 
      name="Hjem" 
      url="das" 
      :svgFilePath="svg"
    />
</template>