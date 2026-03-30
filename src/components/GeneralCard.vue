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
const bgClass = ref('cardBG');

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
    <div :class="'card card-' + cardType + ' ' + bgClass">
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
    </div>
</template>
