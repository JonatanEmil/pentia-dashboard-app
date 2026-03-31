<script setup lang="ts">

import FormButtonSubmit from '@/components/FormButtonSubmit.vue';
import InputText from '@/components/InputText.vue';


</script>

<template>
    <form class="loginform flex flex--column flex--align-center flex--gaprow-4">

    <InputText placeholderText="Brugernavn/Sagsnummer" class="p--3 w--66"/>
    <InputText placeholderText="Password" class="p--3 w--66"/>

    <FormButtonSubmit class="formButtonSubmit">Login</FormButtonSubmit>
    </form>
</template>