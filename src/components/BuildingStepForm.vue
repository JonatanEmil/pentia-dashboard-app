<script setup lang="ts">
import BuildingStepContent from './BuildingStepContent.vue';
import CheckboxWithText from './CheckboxWithText.vue';
import FormButtonSubmit from './FormButtonSubmit.vue';

function sendBuildingStepForm(): void{

}

</script>

<template>

    <form @submit.prevent="sendBuildingStepForm">
        <BuildingStepContent/>
        <!-- Connect with the status field from current step -->
        <CheckboxWithText text="Bekræft at dette trin i byggeprosessen er færdig" name="status"/>
        <FormButtonSubmit/>
    </form>

</template>