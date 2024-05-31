import { Component, computed, effect, inject } from '@angular/core';
import { DatepickerCalendarComponent } from '../shared/ui/datepicker-calendar/datepicker-calendar.component';
import { CalendarService } from './data-access/calendar.service';
import { EventCardComponent } from './ui/event-card/event-card.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    DatepickerCalendarComponent,
    EventCardComponent
  ],
  providers: [CalendarService],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
  service = inject(CalendarService)
  constructor() {
  }
}
