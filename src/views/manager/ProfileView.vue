<script setup lang="ts">
import ItemList from '@/components/ItemList.vue';
import ProfilePictureWithName from '@/components/ProfilePictureWithName.vue';
import { useProfileView } from '@/composables/useProfileView';

const { user, profileImage, caseStore, imageStore } = useProfileView();
</script>

<template>
    <main class="profileView">
        <div class="manager-profile__hero">
            <ProfilePictureWithName
                :picturePath="profileImage"
                :pictureName="user?.firstName + ' ' + user?.lastName" 
            />
        </div>
        

        <ItemList class="manager-cases"
            :items="caseStore.caseList" title="Igangværende sager" :columns="1" :gap="2">
            <template #default="{ item }">
                <div class="case-card">
                    <img
                        :src="imageStore.imageList.find(
                            img => img.type === 'house' && img.caseId === item.caseId)?.path"
                        :alt="item.roadName"
                    />
                    <div>
                        <p>{{ item.roadName }} {{ item.roadNumber }},</p>
                        <p>{{ item.zipcode }} {{ item.city }}</p>
                    </div>
                </div>
            </template>
        </ItemList>
    </main>
</template>

<style scoped>

</style>