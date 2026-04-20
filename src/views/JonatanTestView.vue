<script setup lang="ts">
import '@/assets/scss/main.scss';
import DropDown from '@/components/DropDown.vue';
import RadioButton from '@/components/RadioButton.vue';
import ProfilePictureWithName from '@/components/ProfilePictureWithName.vue';
import { ref } from 'vue';

const selected = ref(null);
const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
const testProfile = { name: 'Dan', path: 'src/assets/img/Dan-Container3_1350x900-scaled-1.png' }; //TODO: new path when collections are merged

</script>

<template>
    <profile-picture-with-name
        class="flex flex--align-center flex--column flex--gaprow-2"
        :picture-path="testProfile.path"
        :picture-name="testProfile.name"
    />
    <RadioButton
        v-for="option in options"
        :key="option"
        v-model="selected"
        :value="option"
    >
        {{ option }}
    </RadioButton>
    <DropDown>
        <template v-slot:button>
            Aftalegrundlag
        </template>
        <template v-slot:content>
            § 1 Anvendelse

            Almindelige betingelser er udarbejdet med henblik på aftaler om arbejder
            og leverancer i bygge- og anlægsvirksomhed, hvor bygherren ikke er forbruger.
            Betingelserne finder anvendelse, når de er vedtaget af aftalens parter.

            Stk. 2.
            Fravigelse af betingelserne gælder kun, når det tydeligt
            og udtrykkeligt angives i aftalen, på hvilke punkter fravigelse skal ske

        </template>
    </DropDown>
</template>
