import { Injectable } from '@angular/core';
import { DateAdapter } from '..';

import {
  addDays as addDaysGregorian,
  addHours as addHoursGregorian,
  addMinutes,
  addMonths as addMonthsGregorian,
  addYears as addYearsGregorian,
  endOfMonth as endOfMonthGregorian,
  format as formatGregorian,
  getDaysInMonth as getDaysInMonthGregorian,
  isAfter as isAfterGregorian,
  isBefore as isBeforeGregorian,
  isEqual,
  isSameDay as isSameDayGregorian,
  isSameMonth as isSameMonthGregorian,
  isSameYear as isSameYearGregorian,
  isValid as isValidGregorian,
  max as maxGregorian,
  parse as parseGregorian,
  parseISO,
  setYear as setYearGregorian,
  startOfDay,
  startOfMonth as startOfMonthGregorian,
  startOfWeek as startOfWeekGregorian,
} from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class GregorianDateAdapter implements DateAdapter<Date> {
  today(): Date {
    return new Date();
  }

  parse(value: any, formatString: string): Date | null {
    if (typeof value === 'string') {
      // Check if it's in ISO 8601 format
      if (value.includes('T')) {
        const parsedDate = parseISO(value);
        return isValidGregorian(parsedDate) ? parsedDate : null;
      }

      try {
        let parsedDate: Date;
        if (formatString === 'ISO') {
          parsedDate = parseISO(value);
        } else {
          parsedDate = parseGregorian(value, formatString, new Date());
        }
        return isValidGregorian(parsedDate) ? parsedDate : null;
      } catch (error) {
        console.error('Error parsing date:', error);
        return null;
      }
    } else if (value instanceof Date) {
      return isValidGregorian(value) ? value : null;
    }
    return null;
  }

  format(date: Date, formatString: string): string {
    return formatGregorian(date, formatString);
  }

  addDays(date: Date, amount: number): Date {
    return addDaysGregorian(date, amount);
  }

  addMonths(date: Date, amount: number): Date {
    return addMonthsGregorian(date, amount);
  }

  addYears(date: Date, amount: number): Date {
    return addYearsGregorian(date, amount);
  }

  addHours(date: Date, amount: number): Date {
    return addHoursGregorian(date, amount);
  }

  getYear(date: Date): number {
    return date.getFullYear();
  }

  getMonth(date: Date): number {
    return date.getMonth();
  }

  getDate(date: Date): number {
    return date.getDate();
  }

  getDayOfWeek(date: Date): number {
    return date.getDay();
  }

  getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    const formats = {
      long: 'MMMM',
      short: 'MMM',
      narrow: 'MMMMM',
    };
    return Array.from({ length: 12 }, (_, i) =>
      formatGregorian(new Date(2000, i, 1), formats[style]),
    );
  }

  getDateNames(): string[] {
    return Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  }

  getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    const formats = {
      long: 'EEEE',
      short: 'EEE',
      narrow: 'EEEEE',
    };
    return Array.from({ length: 7 }, (_, i) =>
      formatGregorian(
        addDaysGregorian(startOfWeekGregorian(new Date()), i),
        formats[style],
      ),
    );
  }

  getFirstDayOfWeek(): number {
    return 0; // Sunday is the first day of the week in the Gregorian calendar
  }

  getNumDaysInMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  clone(date: Date): Date {
    return new Date(date.getTime());
  }

  createDate(year: number, month: number, date: number): Date {
    return new Date(year, month, date);
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return isSameDayGregorian(date1, date2);
  }

  isSameMonth(date1: Date, date2: Date): boolean {
    return isSameMonthGregorian(date1, date2);
  }

  isSameYear(date1: Date, date2: Date): boolean {
    return isSameYearGregorian(date1, date2);
  }

  isAfter(date1: Date, date2: Date): boolean {
    return isAfterGregorian(date1, date2);
  }

  isBefore(date1: Date, date2: Date): boolean {
    return isBeforeGregorian(date1, date2);
  }

  isEqual(date1: Date, date2: Date): boolean {
    return isEqual(date1, date2);
  }

  startOfMonth(date: Date): Date {
    return startOfMonthGregorian(date);
  }

  endOfMonth(date: Date): Date {
    return endOfMonthGregorian(date);
  }

  startOfWeek(date: Date): Date {
    return startOfWeekGregorian(date, {
      weekStartsOn: this.getFirstDayOfWeek() as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    });
  }

  isValidFormat(dateString: string, formatString: string): boolean {
    try {
      const parsedDate = parseGregorian(dateString, formatString, new Date());
      if (!isValidGregorian(parsedDate)) {
        return false;
      }
      // Check if the formatted parsed date matches the original date string
      const formattedDate = formatGregorian(parsedDate, formatString);
      return formattedDate === dateString;
    } catch (error) {
      return false;
    }
  }

  max(dates: Date[]): Date {
    return maxGregorian(dates);
  }

  setYear(date: Date, year: number): Date {
    return setYearGregorian(date, year);
  }

  startOfDay(date: Date): Date {
    return startOfDay(date);
  }

  getHours(date: Date): number | null {
    return date ? date.getHours() : null;
  }

  getMinutes(date: Date): number | null {
    return date ? date.getMinutes() : null;
  }

  getSeconds(date: Date): number | null {
    return date ? date.getSeconds() : null;
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
    return getDaysInMonthGregorian(date);
  }

  addMinutes(date: Date, amount: number) {
    return addMinutes(date, amount);
  }
}
