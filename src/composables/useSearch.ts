import { computed, ref, type Ref, type ComputedRef } from 'vue';

export function useSearch<T>(
    items: () => T[],
    filterFn: (item: T, query: string) => boolean,
): {
    searchQuery: Ref<string>;
    searchResults: ComputedRef<T[]>;
    onSearchFetch: (query: string) => Promise<void>;
} {
    const searchQuery = ref('');

    const searchResults = computed(() => {
        if (!searchQuery.value) return items();
        const query = searchQuery.value.toLowerCase();

        return items().filter(item => filterFn(item, query));
    });

    async function onSearchFetch(query: string): Promise<void> {
        searchQuery.value = query;
    }

    return {
        searchQuery,
        searchResults,
        onSearchFetch,
    };
}
