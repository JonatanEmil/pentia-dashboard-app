<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUserStore, type User } from '@/stores/userStore.ts';

import '@/assets/scss/main.scss';
import DropDown from '@/components/DropDown.vue';
import GeneralCard from '@/components/GeneralCard.vue';
import List from '@/components/ItemList.vue';
import RadioButton from '@/components/RadioButton.vue';
import Search from '@/components/SearchBar.vue';
import { DocumentReference } from 'firebase/firestore';


const selected = ref(null);
const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
const testList = ref([{userId: 1, firstName: 'Jens', lastName: 'Jensen',}, {userId: 2, firstName: 'Jane', lastName: 'Jensen',}, {userId: 3, firstName: 'Jens', lastName: 'Hansen',}, {userId: 4, firstName: 'Hans', lastName: 'Pedersen' } ]);

const userStore = useUserStore();

userStore.getUserList();

function getCaseId(caseRef: DocumentReference): string {
    return caseRef?.path?.split('/')[1] ?? '';
}

const searchQuery = ref('');

const searchResults = computed(() => {
    if (!searchQuery.value) return userStore.userList;
    const query = searchQuery.value.toLowerCase();

    return userStore.userList.filter((u: User) =>
        u.firstName?.toLowerCase().includes(query) ||
        u.lastName?.toLowerCase().includes(query) ||
        u.email?.toLowerCase().includes(query) ||
        u.phoneNumber?.toLowerCase().includes(query) ||
        u.caseId?.some(ref => ref?.path?.split('/')[1]?.toLowerCase().includes(query)),
    );
});

async function onSearchFetch(query: string): Promise<void> {
    searchQuery.value = query;
}

</script>

<template>
    <main>
        <Search @searchFetch="onSearchFetch"></Search>
        <List :items="searchResults" v-slot="{ item }" :columns="1" :titel="'searchTest'">
            <GeneralCard card-type="client"
                         :profile="false"
                         :filename="item.imageId(ref => ref?.path?.split('/')[1]"
            >
                <p>{{ getCaseId(item.caseId[0]) }}</p>
                <p>{{ item.firstName }} {{ item.lastName }}</p>
                <p>adresse</p>
                <p>{{ item.phoneNumber }}</p>
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
