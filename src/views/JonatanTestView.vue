<script setup lang="ts">
import { ref } from 'vue';
import { useCaseStore } from '@/stores/caseStore.ts';

import '@/assets/scss/main.scss';
import DropDown from '@/components/DropDown.vue';
import List from '@/components/ItemList.vue';
import RadioButton from '@/components/RadioButton.vue';
import Search from '@/components/SearchBar.vue';


const selected = ref(null);
const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
const testList = [{userId: 1, firstName: 'Jens', lastName: 'Jensen',}, {userId: 2, firstName: 'Jane', lastName: 'Jensen',}, {userId: 3, firstName: 'Jens', lastName: 'Hansen',}, {userId: 4, firstName: 'Hans', lastName: 'Pedersen',},];
const fetchOptions = ['userId', 'firstName', 'lastName'];
const searchResults = ref(testList);
const caseStore = useCaseStore();

caseStore.getCaseList();

/*async function onSearchFetch(query: string): Promise<void> {
    if (!query) return;
    const params = new URLSearchParams({ listSearch: query });
    const res = await fetch(`/api/users?${params}`);

    searchResults.value = await res.json();
}*/
async function onSearchFetch(query: string): Promise<void> {
    searchResults.value = testList.filter(u =>
        Object.values(u).some(v =>
            String(v).toLowerCase().includes(query.toLowerCase()),
        ),
    );
}


</script>

<template>
    <main>
        <p v-for="(caseItem, index) in caseStore.caseList" :key="index">
            {{ caseItem.roadName }} {{caseItem.roadNumber}} -- {{caseItem.managerId}} {{caseItem.clientId}}

        </p>

        <Search @searchFetch="onSearchFetch"></Search>
        <List :items="searchResults" v-slot="{ item }" :columns="2" :titel="'searchTest'">
            <p>{{ item.userId }}</p>
            <p>{{ item.firstName }} {{ item.lastName }}</p>

        </List>
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
    </main>
</template>
