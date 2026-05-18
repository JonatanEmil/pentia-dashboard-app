import { describe, it, expect } from 'vitest';
import { toDanishTime } from '../toDanishTime';

describe('toDanishTime', () => {

    it('returns a string', () => {
        expect(typeof toDanishTime(new Date())).toBe('string');
    });

    it('formats date parts correctly (dd.mm.yyyy)', () => {
        const date = new Date('2024-03-05T10:00:00Z');
        const result = toDanishTime(date);
        
        expect(result).toContain('05.03.2024');
    });

    it('zero-pads day and month', () => {
        const date = new Date('2024-01-01T10:00:00Z');
        const result = toDanishTime(date);

        expect(result).toContain('01.01.2024');
    });

});