export function toDanishTime(date: Date): string {
    return date.toLocaleString('da-DK', {
        timeZone: 'Europe/Copenhagen',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}