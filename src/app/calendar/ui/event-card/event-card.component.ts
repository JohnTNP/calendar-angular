import { Component, computed, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { EventListComponent } from '../../../shared/ui/event-list/event-list.component';
import { CalendarService } from '../../data-access/calendar.service';
import { isSameDay } from '../../../shared/utils/date.utils';
import { CalendarEvent } from '../../../shared/interfaces/date.interface';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [MatCardModule, EventListComponent],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss'
})
export class EventCardComponent {
  service = inject(CalendarService)

  showedEventList = computed(() => {
    return this.service.eventList().filter(event => isSameDay(event.date, this.service.dateValue()))
  })

  addEventOnDrop(event: CalendarEvent) {
    this.service.deleteEvent(event)
    this.service.addEvent(event)
  }
}
