export interface DateAdapter<T> {
  today(): T;

  parse(value: any, formatString: string): T | null;

  format(date: T, formatString: string): string;

  addDays(date: T, amount: number): T;

  addMonths(date: T, amount: number): T;

  addYears(date: T, amount: number): T;

  addHours(date: T, amount: number): T;

  getYear(date: T): number | null;

  getMonth(date: T): number | null;

  getDate(date: T): number | null;

  getDayOfWeek(date: T): number;

  getMonthNames(style: 'long' | 'short' | 'narrow'): string[];

  getDateNames(): string[];

  getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[];

  getFirstDayOfWeek(): number;

  getNumDaysInMonth(date: T): number;

  clone(date: T): T;

  createDate(year: number, month: number, date: number): T;

  isSameDay(date1: T, date2: T): boolean;

  isSameMonth(date1: T, date2: T): boolean;

  isSameYear(date1: T, date2: T): boolean;

  isAfter(date1: T, date2: T): boolean;

  isBefore(date1: T, date2: T): boolean;

  isEqual(date1: T, date2: T): boolean;

  startOfMonth(date: T): T;

  endOfMonth(date: T): T;

  startOfWeek(date: T): T;

  isValidFormat(dateString: string, formatString: string): boolean;

  max(dates: T[]): T;

  setYear(date: T, year: number): T;

  startOfDay(date: T): T;

  getHours(date: T): number | null;

  getMinutes(date: T): number | null;

  getSeconds(date: T): number | null;

  setHours(date: T, hours: number): T;

  setMinutes(date: T, minutes: number): T;

  setSeconds(date: T, seconds: number): T;

  getDaysInMonth(date: T): number;

  addMinutes(date: T, amount: number): T;
}
