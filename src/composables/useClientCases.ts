import { ref, type Ref } from 'vue';
import { useCaseStore, type Case } from '@/stores/caseStore.ts';
import { type User } from '@/stores/userStore.ts';
import { type DocumentReference } from 'firebase/firestore';

interface UseClientCases {
    clientCases: Ref<{ [key: string]: Case }>;
    fetchClientCases: (clients: User[]) => Promise<void>;
}

export function useClientCases(): UseClientCases {
    const caseStore = useCaseStore();
    const clientCases = ref<{ [key: string]: Case }>({});

    async function fetchClientCases(clients: User[]): Promise<void> {
        const caseEntries = await Promise.all(
            clients.map(async (client) => {
                const clientCase = await caseStore.getCase(client.caseId[0] as DocumentReference);

                return [client.id.id, clientCase];
            }),
        );

        clientCases.value = Object.fromEntries(caseEntries);
    }

    return {
        clientCases,
        fetchClientCases,
    };
}
