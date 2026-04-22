<script setup lang="ts">

import LoginForm from './LoginForm.vue';
import ProfileSvg from '@/assets/icons/ProfileIcon.vue';


</script>

<template>
    <div class="loginForm  grid--gap-1">

        <ProfileSvg class="flex flex--just-self-center mb--4"/>

        <LoginForm />
    </div>
</template>