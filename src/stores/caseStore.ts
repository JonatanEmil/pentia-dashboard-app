import { defineStore } from 'pinia';
import { ref } from 'vue';
import { db } from '@/config/firebase';
import { collection, getDocs, doc, getDoc, query, where, type DocumentReference } from 'firebase/firestore';
import { useAuthStore } from './authStore.ts';

/**
 * Repræsenterer en renoveringssag (ejendom) gemt i Firestore.
 */
export interface Case {
    /** Firestore dokument-ID for sagen. */
    caseId: string
    /** Vejnavn for ejendommen. */
    roadName: string
    /** Husnummer for ejendommen. */
    roadNumber: string
    /** By for ejendommen. */
    city: string
    /** Postnummer for ejendommen. */
    zipcode: number
} 

/**
 * @function
 * Håndterer hentning og styring af renoveringssager fra Firestore.
 */
export const useCaseStore = defineStore('case', () => {
    // Tilstand
    /**
     * Liste over alle sager tilknyttet den aktuelle bruger.
     * @type {Case[]}
     */
    const caseList = ref<Case[]>([]);

    /**
     * Den aktuelt aktive sag, eller undefined hvis ingen er valgt.
     * @type {Case | undefined}
     */
    const currentCase = ref<Case>();

    // Handlinger

    /**
     * @function
     * Henter en enkelt sag via dens Firestore dokument-reference.
     *
     * @param caseRef - Firestore dokument-reference for sagen
     * @returns Det hentede {@link Case} objekt
     * @throws {FirebaseError} Hvis Firestore-forespørgslen fejler
     */
    async function getCase(caseRef: DocumentReference): Promise<Case> {
        const snapshot = await getDoc(caseRef);

        return { caseId: snapshot.id, ...snapshot.data() } as Case;
    }

    /**
     * @function
     * Henter alle sager tilknyttet den aktuelt indloggede bruger og udfylder {@link caseList}.
     *
     * @returns Løses når saglisten er udfyldt
     * @throws {FirebaseError} Hvis en Firestore-forespørgsel fejler
     */
    async function getCaseList(): Promise<void> {
        const authStore = useAuthStore();

        const userDoc = await getDoc(doc(db, 'users', authStore.currentUser!.id));
        const caseRefs: DocumentReference[] = userDoc.data()?.caseId ?? [];

        caseList.value = [];

        for (const caseRef of caseRefs) {
            const caseDoc = await getDoc(caseRef);

            if (caseDoc.exists()) {
                caseList.value.push({
                    caseId: caseDoc.id,
                    roadName: caseDoc.data().roadName,
                    roadNumber: caseDoc.data().roadNumber,
                    city: caseDoc.data().city,
                    zipcode: caseDoc.data().zipcode,
                });
            }
        }
    }

    /**
     * @function
     * Sætter den aktuelt aktive sag via dens Firestore dokument-ID eller reference.
     *
     * @param caseId - Sagens Firestore dokument-ID eller en {@link DocumentReference}
     * @returns Løses når {@link currentCase} er opdateret
     * @throws {FirebaseError} Hvis Firestore-forespørgslen fejler
     */
    async function setCurrentCase(caseId: string | DocumentReference): Promise<void> {
        caseId = typeof caseId === 'string' ? doc(db, 'cases', caseId) : caseId;

        const snapshot = await getDoc(caseId);

        currentCase.value = { caseId: snapshot.id, ...snapshot.data() } as Case;
    }

    /**
     * @function
     * Finder den manager der er tildelt en given sag.
     *
     * @param caseId - Sagens Firestore dokument-ID
     * @returns Firestore dokument-ID'et for den tildelte manager, eller en tom streng hvis ingen findes
     * @throws {FirebaseError} Hvis Firestore-forespørgslen fejler
     */
    async function getManagerForCase(caseId: string): Promise<string> {
        const q = query(
            collection(db, 'users'),
            where('role', '==', 'manager'),
            where('caseId', 'array-contains', doc(db, 'cases', caseId)),
        );

        const snapshot = await getDocs(q);

        return snapshot.docs[0]?.id ?? '';
    }

    return {
        caseList,
        currentCase,
        getCase,
        setCurrentCase,
        getCaseList,
        getManagerForCase,
    };
});
