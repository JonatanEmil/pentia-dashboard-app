import { ref, computed, onMounted, type Ref, type ComputedRef  } from 'vue';
import { useAuthStore, type AuthUser } from '@/stores/authStore';
import { useUserStore, type User } from '@/stores/userStore';
import { useImageStore } from '@/stores/imagesStore';
import { useCaseStore } from '@/stores/caseStore';

interface ProfileView {
    user: Ref<User | undefined>
    authUser: Ref<AuthUser | null>
    profileImage: Ref<string>
    caseImage: Ref<string>
    manager: Ref<User | undefined>
    isManager: ComputedRef<boolean>
    caseStore: ReturnType<typeof useCaseStore>
    imageStore: ReturnType<typeof useImageStore>
}

export function useProfileView(): ProfileView {
    const authStore = useAuthStore();
    const userStore = useUserStore();
    const imageStore = useImageStore();
    const caseStore = useCaseStore();

    const user = ref<User>();
    const authUser = ref<AuthUser | null>(null);
    const profileImage = ref('');
    const caseImage = ref('');
    const manager = ref<User>();

    const isManager = computed(() => authStore.currentUser?.role === 'manager');

    onMounted(async () => {
        user.value = await userStore.getUser(authStore.currentUser?.id ?? '');
        authUser.value = authStore.currentUser;
        profileImage.value = await imageStore.getUserImage(user.value.imageId);

        await caseStore.getCaseList();
        await imageStore.getImageList();

        if (!isManager.value) {
            const caseId = caseStore.currentCase?.caseId ?? '';

            caseImage.value = imageStore.imageList.find(
                img => img.type === 'house' && img.caseId === caseId,
            )?.path ?? '';

            const managerId = await userStore.getManagerForCase(caseId);

            manager.value = await userStore.getUser(managerId);
        }
    });

    return { 
        user, 
        authUser, 
        profileImage, 
        caseImage, 
        manager, 
        isManager, 
        caseStore, 
        imageStore };
}