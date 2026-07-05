import { Injectable } from '@angular/core';
import { LanguageLocale } from '../models/language-locale.model';

@Injectable({
  providedIn: 'root',
})
export class PersianLocale implements LanguageLocale {
  today: string = 'امروز';
  lastDay: string = 'آخرین روز';
  lastWeek: string = 'آخرین هفته';
  lastMonth: string = 'آخرین ماه';
  custom: string = 'دلخواه';
  previousMonth: string = 'ماه قبل';
  nextMonth: string = 'ماه بعد';
  previousYear: string = 'سال قبل';
  nextYear: string = 'سال بعد';
  selectTime: string = 'انتخاب زمان';
  selectDate: string = 'انتخاب تاریخ';
  selectMonth: string = 'انتخاب ماه';
  selectYear: string = 'انتخاب سال';
  selectDateRange: string = 'انتخاب محدوده تاریخ';
  startDate: string = 'از تاریخ';
  endDate: string = 'تا تاریخ';
  pm: string = 'ب.ظ';
  am: string = 'ق.ظ';
  ok: string = 'تایید';
  cancel: string = 'لغو';
  now: string = 'اکنون';
}
