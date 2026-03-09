import { ref, computed } from 'vue';
import { defineStore } from 'pinia'

interface T { x: number }
const john: string = 'Cena';

export const useCounterStore = defineStore('counter', () => {
    const count = ref(0);
    const doubleCount = computed(() => count.value * 2);

    function increment(): void {
        count.value++;
    }
    const array: number[] = [
        1,
        2,
        3,
    ];
    const y: string[] = ['a', 'b'];

  interface RecordType { [key: string]: unknown }

  return { count, doubleCount, increment };
});
