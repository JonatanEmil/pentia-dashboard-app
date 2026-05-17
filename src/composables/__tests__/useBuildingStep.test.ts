import { describe, it, expect, beforeEach } from 'vitest';
import { useBuildingStepStore } from '@/stores/buildingStepStore';
import { setActivePinia, createPinia } from 'pinia';


describe('useBuildingStep', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('henter buildingStep korrekt', async () => {
        const store = useBuildingStepStore();

        const step = await store.getBuildingStep('2026-0078357', 3);

        expect(step).toBeDefined();
        expect(step.id).toBeDefined();
    });

    it('updateBuildingStep ændrer status', async () => {
        const store = useBuildingStepStore();
        const step = await store.getBuildingStep('2026-0078357', 3);
        const originalStatus = step.status;

        step.status = !originalStatus;
        await store.updateBuildingStep(step);

        const updated = await store.getBuildingStep('2026-0078357', 3);

        expect(updated.status).toBe(!originalStatus);

        // Gendan original status
        step.status = originalStatus;
        await store.updateBuildingStep(step);
    });
});
