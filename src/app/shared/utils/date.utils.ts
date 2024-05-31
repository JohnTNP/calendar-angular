export function isSameDay(d1: Date, d2: Date): boolean {
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
}

export function isToday(date: Date): boolean {
    return isSameDay(date, new Date());
}

export function isSameHour(d1: Date, d2: Date): boolean {
    return d1.getHours() === d2.getHours();
}