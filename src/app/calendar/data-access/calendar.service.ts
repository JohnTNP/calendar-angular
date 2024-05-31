import { Injectable, effect, signal } from "@angular/core";
import { CalendarEvent } from "../../shared/interfaces/date.interface";

@Injectable({
    providedIn: 'any'
})
export class CalendarService {
    dateValue = signal<Date>(new Date())

    eventList = signal<CalendarEvent[]>([
        { title: 'Holiday', date: new Date(2024, 4, 20) },
        { title: 'Holiday1', date: new Date(2024, 4, 2, 8) },
        { title: 'Holiday2', date: new Date(2024, 4, 2, 12) }
    ])

    constructor() {}
    
    addEvent(event: CalendarEvent) {
        this.eventList.set([...this.eventList(), event])
    }
    deleteEvent(event: CalendarEvent) {
        const updatedList = this.eventList().filter(e => e.title !== event.title)
        this.eventList.set(updatedList)
    }
    moveEvent(event: CalendarEvent, newDate: Date): void {
        const newEvent = {
            ...event,
            date: newDate
        }
        this.deleteEvent(event)
        this.addEvent(newEvent)
    }
}
