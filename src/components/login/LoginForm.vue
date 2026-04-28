<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import FormButtonSubmit from '@/components/FormButtonSubmit.vue';
import InputText from '@/components/InputText.vue';

const authStore = useAuthStore();

const email = ref('');
const password = ref('');

async function handleLogin(): Promise<void> {
    console.log('Login attempt with email:', email.value, 'and password:', password.value);
    await authStore.login(email.value, password.value);
} 


</script>

<template>
    <form class="loginform flex flex--column flex--align-center flex--gaprow-5">

    <InputText v-model="email" type="email" placeholderText="Brugernavn/Sagsnummer" class="p--3 w--66"/>
    <InputText v-model="password" type="" placeholderText="Password" class="p--3 w--66"/>

    <FormButtonSubmit @click.prevent="handleLogin" class="formButtonSubmit">Login</FormButtonSubmit>
    </form>
</template>