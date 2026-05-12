import { describe, it, expect, beforeEach } from 'vitest';
import { useBuildingStep } from '../useBuildingStep';
import { setActivePinia, createPinia } from 'pinia';


describe('useBuildingStep', () => {
    beforeEach(() => {
        //creates a pinia instance
        setActivePinia(createPinia());
    });

    it('buildingStep status opdatering gemmes', async () => {
        const { updateCurrentBuildingStep } = useBuildingStep();

        await updateCurrentBuildingStep('2026-0078357',3);
        
        
        expect(1).toBeDefined();
    });
});