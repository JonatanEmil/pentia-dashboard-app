<script setup lang="ts">

import FormButtonSubmit from '@/components/FormButtonSubmit.vue';
import InputText from '@/components/InputText.vue';


</script>

<template>
    <form class="flex flex--column flex--align-center flex--gaprow-4">

    <InputText placeholderText="Brugernavn" class="p--4"/>
    <InputText placeholderText="Password"/>

    <FormButtonSubmit class="formButtonSubmit">Login</FormButtonSubmit>
    </form>
</template>