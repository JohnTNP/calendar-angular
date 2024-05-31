import { DatePipe } from '@angular/common';
import { Component, computed, effect, input, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon';
import { CalendarEvent } from '../../interfaces/date.interface';
import { isSameDay, isToday } from '../../utils/date.utils';

interface DateItem {
  date: Date
  inOtherMonths?: boolean
  hasEvent?: boolean
  hasMultipleEvent?: boolean
}

@Component({
  selector: 'app-datepicker-calendar',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    DatePipe,
    MatIconModule
  ],
  templateUrl: './datepicker-calendar.component.html',
  styleUrl: './datepicker-calendar.component.scss'
})
export class DatepickerCalendarComponent {
  value = input.required<Date>()
  valueChange = output<Date>()

  eventList = input<CalendarEvent[]>()

  weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  selected = signal<Date>(new Date())
  currentDate = signal<Date>(new Date())
  displayedDates = computed(() => {
    const thisYear = this.currentDate().getFullYear()
    const thisMonth = this.currentDate().getMonth()
    const daysInMonth = new Date(thisYear, thisMonth + 1, 0).getDate()
    const firstDayOfMonth = new Date(thisYear, thisMonth, 1).getDay()
    const daysList: DateItem[] = [...Array(daysInMonth)].map(
      (_, i) => ({ date: new Date(thisYear, thisMonth, i + 1) })
    )
    const daysInPreviousMonth = new Date(thisYear, thisMonth, 0).getDate()
    console.log(thisMonth)
    console.log(daysInPreviousMonth)
    const previosListLength = firstDayOfMonth
    const previosList: DateItem[] = [...Array(daysInPreviousMonth)].map(
      (_, i) => ({ date: new Date(thisYear, thisMonth - 1, i + 1) , inOtherMonths: true})
    ).slice(-previosListLength)
    const daysInNextMonth = new Date(thisYear, thisMonth + 1, 0).getDate()
    const nextListLength = 7 * 6 - previosList.length - daysList.length
    const nextList: DateItem[] = [...Array(daysInNextMonth)].map(
      (_, i) => ({ date: new Date(thisYear, thisMonth + 1, i + 1) , inOtherMonths: true})
    ).slice(0, nextListLength)

    const dates = [...previosList, ...daysList, ...nextList] 

    const datesWithEvents = dates.map((date, i) => {
      const eventCount = this.eventList()?.filter(event => isSameDay(event.date, date.date)).length || 0
      const hasEvent = eventCount === 1
      const hasMultipleEvent = eventCount > 1
      return { ...date, hasEvent, hasMultipleEvent }
    })

    return datesWithEvents
  })

  constructor() {
    effect(() => {
      this.valueChange.emit(this.selected())
    })
  }

  selectDate(date: Date): void {
    this.selected.set(date)
  }

  increaseMonth(): void {
    this.currentDate.set(new Date(this.currentDate().getFullYear(), this.currentDate().getMonth() + 1, 1))
  }

  decreaseMonth(): void {
    this.currentDate.set(new Date(this.currentDate().getFullYear(), this.currentDate().getMonth() - 1, 1))
  }

  checkSelected(date: Date): boolean {
    return isSameDay(this.selected(), date)
  }

  checkToday(date: Date): boolean {
    return isToday(date) 
  }
}
