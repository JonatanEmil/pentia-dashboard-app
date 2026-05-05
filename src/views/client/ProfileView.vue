<script setup lang="ts">
import GeneralCard from '@/components/GeneralCard.vue';
import TitleWithText from '@/components/TitleWithText.vue';
import { useProfileView } from '@/composables/useProfileView';

const { user, authUser, profileImage, caseImage, manager, caseStore } = useProfileView();
</script>

<template>
    <main class="profileView">
        <div class="profileHero">
            <GeneralCard cardType="client" :profile="true" :card-background="false"
                :name="'Billede af ' + user?.firstName + ' ' + user?.lastName" 
                :filename="profileImage" class="px--4">
                <div class="ps--3">
                    <p>{{ user?.firstName }} {{ user?.lastName }}</p>
                    <p>{{ authUser?.email }}</p>
                    <p>{{ user?.phoneNumber }}</p>
                </div>
            </GeneralCard>
        </div>

        <div class="caseHouse">
            <GeneralCard cardType="case" :profile="true" :filename="caseImage"
                :name="'Billede af ' + caseStore.currentCase?.roadName" 
                :card-background="true" class="py--2 px--0">
                <div>
                    <p class="font--light">{{ caseStore.currentCase?.roadName }}
                        {{ caseStore.currentCase?.roadNumber }},</p>
                    <p class="font--light">{{ caseStore.currentCase?.zipcode }}
                        {{ caseStore.currentCase?.city }}</p>
                </div>
            </GeneralCard>
        </div>

        <TitleWithText title="Informationer på dit nye hus" class="profileCaseInfo">
            <ul class="font--light">
                <li>Forskudt længehus</li>
                <li>Sadeltag uden udhæng</li>
                <li>Boligareal: 186 kvm</li>
                <li>Grund: 890 kvm</li>
                <li>Garage: 58 kvm</li>
            </ul>
        </TitleWithText>

        <TitleWithText title="Tilknyttet byggeleder" class="profileManagerInfo font--h4 py--1">
            <p>{{ manager?.firstName }} {{ manager?.lastName }}</p>
        </TitleWithText>

    </main>
</template>

<style scoped></style>