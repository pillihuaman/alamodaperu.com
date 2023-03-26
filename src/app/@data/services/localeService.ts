import { Inject, Injectable } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  private static localeId: string;

  constructor() {
    LocaleService.localeId = this.getLocaleId();
  }

  private getLocaleId(): string {
    if (navigator.language) {
      return navigator.language.split('-')[0];
    }
    return 'en';
  }

  static getLocaleIdValue(): string {
    console.log(LocaleService.localeId);
    return LocaleService.localeId;
  }
}
