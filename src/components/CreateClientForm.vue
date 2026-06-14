<script setup lang="ts">
import InputText from './InputText.vue';
import FormButtonSubmit from './FormButtonSubmit.vue';

</script>

<template>

    <form class="createClientForm flex flex--column flex--just-start flex--flex-wrap
    flex--align-start flex--gap-4 ">

        <InputText placeholderText="Sagsnummer" class="p--3 w--66"/>

        <FormButtonSubmit class="formButtonSubmit">Opret</FormButtonSubmit>

    </form>
    
</template>
<style scoped lang="scss">

</style>