
import { Injectable } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { LocalRepository } from 'src/app/@domain/repository/repository/local.repository';
@Injectable({
  providedIn: 'root',
})
export class LocaleService extends LocalRepository {


  constructor(private dateAdapter: DateAdapter<any>) {
    super();
  }
  setLocale(localeId: string) {
    debugger;
    this.dateAdapter.setLocale(localeId || 'en-US');
  }
  getLanguageCode(): string {
    debugger;
    return navigator.language;
  }
  
}
