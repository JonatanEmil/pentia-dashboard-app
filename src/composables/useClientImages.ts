import { ref, type Ref } from 'vue';
import { useImageStore } from '@/stores/imagesStore.ts';
import { type User } from '@/stores/userStore.ts';

interface UseClientImages {
    clientImages: Ref<{ [key: string]: string }>;
    fetchClientImages: (clients: User[]) => Promise<void>;
}

export function useClientImages(): UseClientImages {
    const imageStore = useImageStore();
    const clientImages = ref<{ [key: string]: string }>({});

    async function fetchClientImages(clients: User[]): Promise<void> {
        const imageEntries = await Promise.all(
            clients.map(async (client) => {
                const path = await imageStore.getUserImage(client.imageId);

                return [client.id.id, path];
            }),
        );

        clientImages.value = Object.fromEntries(imageEntries);
    }

    return {
        clientImages,
        fetchClientImages,
    };
}
