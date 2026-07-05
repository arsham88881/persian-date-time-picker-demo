import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { PersianLocale } from './persian-locale.service';
import { LanguageLocale } from '../models/language-locale.model';
import { EnglishLocale } from './english-locale.service';

export interface ValidTimeResult {
  isValid: boolean;
  normalizedTime: string;
}

@Injectable({
  providedIn: 'root',
})
export class PersianDateTimePickerService {
  activeInput: BehaviorSubject<string> = new BehaviorSubject('');
  languageLocale?: LanguageLocale;

  constructor(
    public persianLocale: PersianLocale,
    public englishLocale: EnglishLocale,
  ) {}

  getActiveInputValue() {
    return this.activeInput.getValue();
  }
}

@Injectable({
  providedIn: 'root',
})
export class DestroyService extends Subject<void> implements OnDestroy {
  ngOnDestroy(): void {
    this.next();
    this.complete();
  }
}
