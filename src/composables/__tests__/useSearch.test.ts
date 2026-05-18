import { describe, it, expect } from 'vitest';
import { useSearch } from '../useSearch';

interface User { 
    firstName: string
    lastName: string 
}

const users: User[] = [
    { firstName: 'Anna', lastName: 'Jensen' },
    { firstName: 'Bo', lastName: 'Nielsen' },
    { firstName: 'Carl', lastName: 'Hansen' },
];

function filterByFirstName(user: User, query: string): boolean {
    return user.firstName.toLowerCase().startsWith(query);
}

describe('useSearch', () => {
    it('finder brugere baseret på forbogstav i query', async () => {
        const { searchResults, onSearchFetch } = useSearch(() => users, filterByFirstName);

        await onSearchFetch('an');

        expect(searchResults.value).toContainEqual({ firstName: 'Anna', lastName: 'Jensen' });
        expect(searchResults.value).not.toContainEqual({ firstName: 'Bo', lastName: 'Nielsen' });
    });

    it('returnerer tom liste når man søger i en tom liste', async () => {
        const { searchResults, onSearchFetch } = useSearch(() => [], filterByFirstName);

        await onSearchFetch('an');

        expect(searchResults.value).toHaveLength(0);
    });

    it('returnerer tom liste når query ikke matcher nogen bruger', async () => {
        const { searchResults, onSearchFetch } = useSearch(() => users, filterByFirstName);

        await onSearchFetch('xyz');

        expect(searchResults.value).toHaveLength(0);
    });

    it('returnerer fuld liste når query er tom', async () => {
        const { searchResults, onSearchFetch } = useSearch(() => users, filterByFirstName);

        await onSearchFetch('');

        expect(searchResults.value).toHaveLength(users.length);
    });
});
