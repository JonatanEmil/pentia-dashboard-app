<script setup lang="ts">

import FormButtonSubmit from '@/components/FormButtonSubmit.vue';
import InputText from '@/components/InputText.vue';
import ProfileSvg from '@/assets/icons/ProfileIcon.vue';


</script>

<template>
    <form class="loginForm flex flex--column flex--align-center flex--gaprow-4">

        <ProfileSvg />

    <InputText placeholderText="Brugernavn/Sagsnummer" class="p--3 w--66"/>
    <InputText placeholderText="Password" class="p--3 w--66"/>

    <FormButtonSubmit class="formButtonSubmit">Login</FormButtonSubmit>
    </form>
</template>