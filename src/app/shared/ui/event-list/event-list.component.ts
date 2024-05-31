import { Component, Signal, computed, input, output, signal } from '@angular/core';
import { CalendarEvent } from '../../interfaces/date.interface';
import { MatCardModule } from '@angular/material/card';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { DatePipe } from '@angular/common';
import { isSameHour } from '../../utils/date.utils';

interface TimeItem {
  time: string
  event?: CalendarEvent
}

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    MatCardModule,
    CdkDropList,
    CdkDrag,
    DatePipe
  ],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent {
  eventList = input<CalendarEvent[]>([])
  
  onDrop = output<CalendarEvent>()

  TIME_LIST: Date[] = Array.from({length: 12}, (_, i) => new Date(0, 0, 1, 8 + i, 0, 0));

  times = computed(() => this.TIME_LIST.map(time => {
      const event = this.eventList().find(event => isSameHour(event.date, time))
      return { time: time.getHours().toString(), event: event }
    })
  )

  drop(event: CdkDragDrop<TimeItem[]>): void {
    const newTime = this.TIME_LIST[event.currentIndex]
    const currentEvent = this.times()[event.previousIndex].event
    const oldDate = currentEvent?.date
    if (oldDate) {
      this.onDrop.emit({
        ...currentEvent,
        date: new Date(oldDate.getFullYear(), oldDate.getMonth(), oldDate.getDate(), newTime.getHours())
      })
    }
  }
}
