<script setup lang="ts">

import FormButtonSubmit from '@/components/FormButtonSubmit.vue';
import InputText from '@/components/InputText.vue';


</script>

<template>
    <form>

    <InputText placeholderText="Brugernavn"/>
    <InputText placeholderText="Password"/>

    <FormButtonSubmit class="formButtonSubmit">Login</FormButtonSubmit>
    </form>
</template>