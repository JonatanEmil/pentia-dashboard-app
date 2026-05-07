<script setup lang="ts">
import ReturnButton from '@/components/common/ReturnButton.vue';
import GeneralCard from '@/components/GeneralCard.vue';
import LinkButton from '@/components/LinkButton.vue';
import ItemList from '@/components/ItemList.vue';
import ProgressCard from '@/components/ProgressCard.vue';

import { useRoute } from 'vue-router';
import { useUserStore, type User } from '@/stores/userStore';
import { ref, onMounted } from 'vue';
import { useCaseStore, type Case } from '@/stores/caseStore';
import { useImageStore } from '@/stores/imagesStore';
import { useBuildingStepStore } from '@/stores/buildingStepStore';
import { DocumentReference } from 'firebase/firestore';

const route = useRoute();
const userStore = useUserStore();
const caseStore = useCaseStore();
const imageStore = useImageStore();
const buildingStepStore = useBuildingStepStore();

const clientImage = ref<string | null>(null);
const client = ref<User>();

onMounted(async () => {
    const userId = route.params.userId as string;

    client.value = await userStore.getUser(userId);

    if (client.value.caseId[0]) {
        await caseStore.setCurrentCase(client.value.caseId[0]);
    }

    if (client.value.imageId) {
        clientImage.value = await imageStore.getUserImage(client.value.imageId);
    }

    const caseRef = client.value.caseId[0] as DocumentReference<Case>;

    await buildingStepStore.getBuildingStepListForCase(caseRef.id);
});


</script>

<template>
    <div>
        <ReturnButton class="mt--4 mx--4 returnButton" :routeName="'managerHome'" />
        <GeneralCard class="flex--gapcol-1 mt--3 client-card ps--5"
        card-type="client" :profile="false"
            :name="'Billede af ' + client?.firstName + ' ' + client?.lastName"
            :filename="clientImage ?? ''"
            :card-background="false">
            <p> {{ client?.caseId[0]?.id }} </p>
            <p> {{ client?.firstName }} {{ client?.lastName }}</p>
            <p>{{ client?.phoneNumber }} </p>
            <p>{{ caseStore.currentCase?.roadName }} {{ caseStore.currentCase?.roadNumber }}</p>
        </GeneralCard>

        <LinkButton
            class="mt--3 p--3 px--4 ms--4"
            routeName="folder"
            title="Mappen"
            color="dark"
        />

        <ItemList class="mt--4 me--0 buildin"
         :items="buildingStepStore.currentBuildingSteps" v-slot="{item}" 
        :columns="2" :gap="3">
            <LinkButton routeName="managerBuildingSteps"
    :routeParams="{ priority: item.priority }"
             class="p--3 px--4" color="light" :title="item.title" variant="dense"
             :class="[item.status ? 'dark' : 'light']"> 
            </LinkButton>
            
        </ItemList>




    </div>
</template>

<style scoped></style>