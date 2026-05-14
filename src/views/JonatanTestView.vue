<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUserStore, type User } from '@/stores/userStore.ts';

import '@/assets/scss/main.scss';
import CarouselHandler from '@/components/CarouselHandler.vue';
import DropDown from '@/components/DropDown.vue';
import GeneralCard from '@/components/GeneralCard.vue';
import List from '@/components/ItemList.vue';
import RadioButton from '@/components/RadioButton.vue';
import Search from '@/components/SearchBar.vue';
import { DocumentReference } from 'firebase/firestore';


const conflikt = 'this string makes a conflict';
console.log(conflikt);

const userStore = useUserStore();

userStore.getUserList();

function getCaseId(caseRef: DocumentReference): string {
    return caseRef?.path?.split('/')[1] ?? '';
}

const searchQuery = ref('');

const searchResults = computed(() => {
    if (!searchQuery.value) return testList.value;
    const query = searchQuery.value.toLowerCase();

    return testList.value.filter((u) =>
        u.firstName?.toLowerCase().includes(query) ||
        u.lastName?.toLowerCase().includes(query),
    );
});

async function onSearchFetch(query: string): Promise<void> {
    searchQuery.value = query;
}

</script>

<template>
    <main>
        <CarouselHandler title="Stue" room="stue" />
        <CarouselHandler title="Fundament" room="fundament" />
        <Search @searchFetch="onSearchFetch"></Search>
        <List :items="searchResults" v-slot="{ item }" :columns="1" :title="'searchTest'">
            <GeneralCard
                card-type="client"
                :profile="false"
                :filename="'src/assets/img/users/jakob.png'">
                <p>{{ item.firstName }} {{ item.lastName }}</p>
            </GeneralCard>
        </List>
        <GeneralCard
            card-type="client"
            :profile="false"
            :name="userStore.userList[0].firstName"
            :filename="'src/assets/img/users/jakob.png'"
        >
            <p>{{testList[0].userId}}</p>
            <p>{{userStore.userList[0].firstName}} {{testList[0].lastName}}</p>
        </GeneralCard>
        <GeneralCard
            card-type="client"
            :profile="true"
            :name="testList[0].firstName"
            :filename="'src/assets/img/users/jakob.png'"
            :card-background="false"
        >
            <p>{{testList[1].userId}}</p>
            <p>{{testList[1].firstName}} {{testList[1].lastName}}</p>
            <p>{{testList[1].firstName}} {{testList[1].lastName}}</p>
            <p>{{testList[1].firstName}} {{testList[1].lastName}}</p>
        </GeneralCard>
        <GeneralCard
            card-type="case"
            :profile="false"
            :filename="'src/assets/img/houses/house1.png'"
        >
            <p>{{testList[1].userId}}</p>
            <p>{{testList[1].firstName}} {{testList[1].lastName}}</p>
        </GeneralCard>
        <GeneralCard
            card-type="case"
            :profile="true"
            :filename="'src/assets/img/houses/house1.png'"
        >
            <p>{{testList[1].userId}}</p>
            <p>{{testList[1].firstName}} {{testList[1].lastName}}</p>
        </GeneralCard>
        <GeneralCard
            card-type="schedule"
            :profile="true"
        >
            <p>{{testList[1].firstName}} {{testList[1].lastName}}</p>
        </GeneralCard>
        <RadioButton v-for="option in options" :key="option" v-model="selected" :value="option">
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
