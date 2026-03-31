<script setup lang="ts">
import { ref } from 'vue';
// TODO: add information from database with firestore
const props = defineProps<{
    picture: {
        // TODO: remember to doublecheck values when database is set up
        name: string
        filename: string
    }
    cardType: string
    cardAlternate?: string
}>();
const imageSource = ref('@/assets/');
const bgClass = ref('clientBG');

if (props.cardType === 'client') {
    imageSource.value += 'img/' + props.picture.filename;

    if (props.cardAlternate) {
        bgClass.value = '';
    }
}

else if (props.cardType === 'house') {
    imageSource.value += 'img/' + props.picture.filename;
}

else if (props.cardType === 'schedule') {
    imageSource.value += 'icons/' + props.picture.filename;
}

</script>

<template>
    <!--<div :class="'card card-' + cardType + ' ' + bgClass">
        <div class="card-img">
            <img :src="imageSource" :alt="'Et billede af ' + picture.name">
        </div>
        <div class="card-content">
            <template v-if="cardType === 'client'">
                <p>{{ user.caseNumber }}</p>
                <p>{{ user.firstName + ' ' + user.lastName }}</p>
                <p>{{ user.address }}</p>
                <p>{{ user.phone }}</p>
            </template>

            <template v-else-if="cardType === 'house'">
                <p v-if="cardAlternate" class="font--h3 font--medium">Adresse</p>
                <p>{{ project.address }}</p>
            </template>

            <template v-else-if="cardType === 'schedule'">
                <p>{{ meeting.timeDate }}</p>
            </template>
        </div>
    </div>-->
    <div class="card card-client flex flex--just-around flex--align-center">
        <div class="card-img">
            <img src="@/assets/img/aksel.png" >
        </div>
        <div class="card-content flex flex--column flex--gaprow-3">
                <p>2025-0013458</p>
                <p>Kenny Jordstrom</p>
                <p>Palmegade 3</p>
                <p>+45 8674 5960</p>
        </div>
    </div>
    <!--<br>
    <div class="card card-client">
        <div class="card-img">
            <img src="@/assets/img/aksel.png" >
        </div>
        <div class="card-content">
            <p>2025-0013458</p>
            <p>Kenny Jordstrom</p>
            <p>Palmegade 3</p>
            <p>+45 8674 5960</p>
        </div>
    </div>
    <br>
    <div class="card card-house">
        <div class="card-img">
            <img src="@/assets/img/munkebakken.png" >
        </div>
        <div class="card-content">
                <p class="font--h3 font--medium">Adresse</p>
                <p>Munkebakken 32, 8370 Hadsten</p>
        </div>
    </div>
    <br>
    <div class="card card-house">
        <div class="card-img">
            <img src="@/assets/img/munkebakken.png" >
        </div>
        <div class="card-content">
            <p>Munkebakken 32, 8370 Hadsten</p>
        </div>
    </div>
    <br>
    <div class="card card-schedule">
        <div class="card-img">
             TODO: change path correctly and style icon
            <img src="@/assets/icons/ikon_book.svg" >
        </div>
        <div class="card-content">
                <p>08/03-26 kl. 09:00</p>
        </div>
    </div>-->
</template>
