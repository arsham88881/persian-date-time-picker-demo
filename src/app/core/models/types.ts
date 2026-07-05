export type Placement = 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
export type RangePartType = 'start' | 'end' | '';
export type CalendarType = 'jalali' | 'gregorian';
export type DatePickerMode = 'day' | 'month' | 'year';
export type TimeValueType = 'date' | 'string';

export type TimeFormat = '12' | '24';
export type ScrollBehavior = 'smooth' | 'auto';
export type ValueFormat = 'jalali' | 'gregorian' | 'date';

/** Equivalent of `ClientRect` without some of the properties we don't care about. */
export type Dimensions = Omit<ClientRect, 'x' | 'y' | 'toJSON'>;
