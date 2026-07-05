import { Injectable } from '@angular/core';
import { LanguageLocale } from '../models/language-locale.model';

@Injectable({
  providedIn: 'root',
})
export class EnglishLocale implements LanguageLocale {
  today: string = 'Today';
  lastDay: string = 'Last Day';
  lastWeek: string = 'Last Week';
  lastMonth: string = 'Last Month';
  custom: string = 'Custom';
  previousMonth: string = 'Previous Month';
  nextMonth: string = 'Next Month';
  previousYear: string = 'Previous Year';
  nextYear: string = 'Next Year';
  selectTime: string = 'Select time';
  selectDate: string = 'Select date';
  selectMonth: string = 'Select month';
  selectYear: string = 'Select year';
  selectDateRange: string = 'Select date range';
  startDate: string = 'Start date';
  endDate: string = 'End date';
  pm: string = 'PM';
  am: string = 'AM';
  ok: string = 'Ok';
  cancel: string = 'Cancel';
  now: string = 'Now';
}
