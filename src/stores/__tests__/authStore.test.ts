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
    let authStore: ReturnType<typeof useAuthStore>;

    beforeEach(() => {
        setActivePinia(createPinia());
        authStore = useAuthStore();
    });

    it('login sets auth currentUser', async () => {
        await authStore.login('rikke.sandberg@byggmester.dk','manager2');
        expect(authStore.currentUser?.id).toBeDefined();
    });

    it('login with unknown email does not login', async () => {
        try {
            await authStore.login('kennwasdsad@gmdail.com', 'client1');
        } catch {
            // Firebase kaster auth/invalid-credential ved ukendt email
        }
        expect(authStore.currentUser?.id).not.toBeDefined();
    });

    it('currentUser is null when not logged in', () => {
        expect(authStore.currentUser).toBeNull();
    });

});