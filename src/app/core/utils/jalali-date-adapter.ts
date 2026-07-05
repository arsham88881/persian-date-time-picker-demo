import { Injectable } from '@angular/core';

import {
  addDays as addDaysJalali,
  addHours as addHoursJalali,
  addMinutes,
  addMonths as addMonthsJalali,
  addYears as addYearsJalali,
  endOfMonth as endOfMonthJalali,
  format as formatJalali,
  getDaysInMonth as getDaysInMonthJalali,
  isAfter as isAfterJalali,
  isBefore as isBeforeJalali,
  isEqual, //monuallly added
  isSameDay as isSameDayJalali,
  isSameMonth as isSameMonthJalali,
  isSameYear as isSameYearJalali,
  isValid as isValidJalali,
  max as maxJalali,
  parseISO, //monuallly added
  parse as parseJalali,
  setYear as setYearJalali,
  startOfDay, //monuallly added
  startOfMonth as startOfMonthJalali,
  startOfWeek as startOfWeekJalali,
} from 'date-fns-jalali';
import { DateAdapter } from '../models/date-adapter.contract';

@Injectable({
  providedIn: 'root',
})
export class JalaliDateAdapter implements DateAdapter<Date> {
  today(): Date {
    return new Date();
  }

  parse(value: any, formatString: string): Date | null {
    if (typeof value === 'string') {
      // Check if it's in ISO 8601 format
      if (value.includes('T')) {
        const parsedDate = parseISO(value);
        return isValidJalali(parsedDate) ? parsedDate : null;
      }

      try {
        const parsedDate = parseJalali(value, formatString, new Date());
        return isValidJalali(parsedDate) ? parsedDate : null;
      } catch (error) {
        console.error('Error parsing date:', error);
        return null;
      }
    } else if (value instanceof Date) {
      return isValidJalali(value) ? value : null;
    }
    return null;
  }

  format(date: Date, formatString: string): string {
    return formatJalali(date, formatString);
  }

  addDays(date: Date, amount: number): Date {
    return addDaysJalali(date, amount);
  }

  addMonths(date: Date, amount: number): Date {
    return addMonthsJalali(date, amount);
  }

  addYears(date: Date, amount: number): Date {
    return addYearsJalali(date, amount);
  }

  addHours(date: Date, amount: number): Date {
    return addHoursJalali(date, amount);
  }

  getYear(date: Date): number | null {
    return date ? parseInt(formatJalali(date, 'yyyy')) : null;
  }

  getMonth(date: Date): number | null {
    // Jalali months are 1-indexed in date-fns-jalali
    return date ? parseInt(formatJalali(date, 'M')) - 1 : null;
  }

  getDate(date: Date): number | null {
    return date ? parseInt(formatJalali(date, 'dd')) : null;
  }

  getDayOfWeek(date: Date): number {
    return parseInt(formatJalali(date, 'i')) - 1;
  }

  getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    const jalaliMonths = [
      'فروردین',
      'اردیبهشت',
      'خرداد',
      'تیر',
      'مرداد',
      'شهریور',
      'مهر',
      'آبان',
      'آذر',
      'دی',
      'بهمن',
      'اسفند',
    ];

    switch (style) {
      case 'long':
        return jalaliMonths;
      case 'short':
        return jalaliMonths.map((month) => month.substring(0, 3));
      case 'narrow':
        return jalaliMonths.map((month) => month.substring(0, 1));
      default:
        return jalaliMonths;
    }
  }

  getDateNames(): string[] {
    return Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  }

  getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    const formats = {
      long: 'EEEE',
      short: 'EEEEE',
      narrow: 'EEEEEE',
    };
    return Array.from({ length: 7 }, (_, i) =>
      formatJalali(
        addDaysJalali(startOfWeekJalali(new Date()), i),
        formats[style],
      ),
    );
  }

  getFirstDayOfWeek(): number {
    return 6; // Saturday is the first day of the week in the Jalali calendar
  }

  getNumDaysInMonth(date: Date): number {
    return parseInt(formatJalali(endOfMonthJalali(date), 'd'));
  }

  clone(date: Date): Date {
    return new Date(date.getTime());
  }

  createDate(year: number, month: number, date: number): Date {
    // Adjust for 0-indexed months in the interface vs 1-indexed months in date-fns-jalali
    return parseJalali(`${year}/${month + 1}/${date}`, 'yyyy/M/d', new Date());
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return isSameDayJalali(date1, date2);
  }

  isSameMonth(date1: Date, date2: Date): boolean {
    return isSameMonthJalali(date1, date2);
  }

  isSameYear(date1: Date, date2: Date): boolean {
    return isSameYearJalali(date1, date2);
  }

  isAfter(date1: Date, date2: Date): boolean {
    return isAfterJalali(date1, date2);
  }

  isBefore(date1: Date, date2: Date): boolean {
    return isBeforeJalali(date1, date2);
  }

  isEqual(date1: Date, date2: Date): boolean {
    return isEqual(date1, date2);
  }

  startOfMonth(date: Date): Date {
    return startOfMonthJalali(date);
  }

  endOfMonth(date: Date): Date {
    return endOfMonthJalali(date);
  }

  startOfWeek(date: Date): Date {
    return startOfWeekJalali(date, {
      weekStartsOn: this.getFirstDayOfWeek() as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    });
  }

  isValidFormat(dateString: string, formatString: string): boolean {
    try {
      const parsedDate = parseJalali(dateString, formatString, new Date());
      if (!isValidJalali(parsedDate)) {
        return false;
      }
      // Check if the formatted parsed date matches the original date string
      const formattedDate = formatJalali(parsedDate, formatString);
      return formattedDate === dateString;
    } catch (error) {
      return false;
    }
  }

  max(dates: Date[]): Date {
    return maxJalali(dates);
  }

  setYear(date: Date, year: number): Date {
    return setYearJalali(date, year);
  }

  startOfDay(date: Date): Date {
    return startOfDay(date);
  }

  getHours(date: Date): number | null {
    return date ? parseInt(formatJalali(date, 'HH')) : null;
  }

  getMinutes(date: Date): number | null {
    return date ? parseInt(formatJalali(date, 'mm')) : null;
  }

  getSeconds(date: Date): number | null {
    return date ? parseInt(formatJalali(date, 'ss')) : null;
  }

  setHours(date: Date, hours: number): Date {
    const newDate = this.clone(date);
    newDate.setHours(hours);
    return newDate;
  }

  setMinutes(date: Date, minutes: number): Date {
    const newDate = this.clone(date);
    newDate.setMinutes(minutes);
    return newDate;
  }

  setSeconds(date: Date, seconds: number): Date {
    const newDate = this.clone(date);
    newDate.setSeconds(seconds);
    return newDate;
  }

  getDaysInMonth(date: Date) {
    return getDaysInMonthJalali(date);
  }

  addMinutes(date: Date, amount: number) {
    return addMinutes(date, amount);
  }
}
