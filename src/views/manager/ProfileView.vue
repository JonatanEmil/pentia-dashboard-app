<script setup lang="ts">
import ItemList from '@/components/ItemList.vue';
import ProfilePictureWithName from '@/components/ProfilePictureWithName.vue';
import { useProfileView } from '@/composables/useProfileView';

const { user, authUser, profileImage, caseStore, imageStore, isManager } = useProfileView();
</script>

<template>
    <main>
        <ProfilePictureWithName 
        :picturePath="profileImage" :pictureName="user?.firstName + ' ' + user?.lastName">
            <div class="ps--3">
                <p>{{ user?.firstName }} {{ user?.lastName }}</p>
                
            </div>
        </ProfilePictureWithName>
        <ItemList v-if="isManager" :items="caseStore.caseList" title="Dine sager" :columns="2" :gap="2">
            <template #default="{ item }">
                <div class="case-card flex flex--column flex--gaprow-1">
                    <p class="font--h3 font--bold">{{ item.roadName }} {{ item.roadNumber }}</p>
                    <p class="font--light">{{ item.zipcode }} {{ item.city }}</p>
                </div>
            </template>
        </ItemList>


    </main>
</template>

<style scoped>

</style>