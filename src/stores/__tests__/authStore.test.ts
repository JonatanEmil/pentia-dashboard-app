import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAuthStore } from '../authStore';
import { setActivePinia, createPinia } from 'pinia';


// Replace vue-router with a stub so router.push() doesn't crash in tests
vi.mock('vue-router', () => ({
    useRouter: (): { push: () => void } => ({
        push: vi.fn(),
    }),
}));

describe('useAuthStore', () => {
    beforeEach(() => {
        //creates a pinia instance
        setActivePinia(createPinia());
    });

    it('login sets auth currentUser', async () => {
        const authStore = useAuthStore();
        
        await authStore.login('kenny.jordstrom@gmail.com','client1');
        expect(authStore.currentUser?.id).toBeDefined();
    });

    it('login with unknown email does not login', async () => {
        const authStore = useAuthStore();
        
        await authStore.login('kennwasdsad@gmdail.com','client1');
        expect(authStore.currentUser?.id).not.toBeDefined();
    });

});