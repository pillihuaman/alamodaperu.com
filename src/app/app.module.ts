import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MyHttpInterceptor } from './@data/interceptors/request.interceptor';
import { ApiService } from './@data/services/api.service';
import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  APP_INITIALIZER,
  LOCALE_ID,
} from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbLayoutModule,
  NbThemeModule,
  NbToastrModule,
  NbWindowModule,
  NbInputModule,
  NbButtonModule,
  NbSelectModule,
} from '@nebular/theme';
import { CommonComponentModule } from './@presentation/@common-components/common-component.module';
import { HomeModule } from './@presentation/home/home.module';
import { MatIconModule } from '@angular/material/icon';
import { PageModule } from './@presentation/pages/page.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DomainModule } from './@domain/repository/domain.module';
import { Const } from './utils/const';
import { AuthModule } from './@presentation/auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicAuthInterceptor, ErrorInterceptor } from './@data/interceptors';
import { MatDialogModule } from '@angular/material/dialog';
import { DataService } from './@data/services/data.service';
import { LocaleService } from './@data/services/localeService';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbMenuModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbToastrModule.forRoot(),
    NbWindowModule.forRoot(),
    DomainModule.forRoot(),
    NbButtonModule,
    NbInputModule,
    CommonComponentModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatFormFieldModule,
    HomeModule,
    MatIconModule,
    PageModule,
    HttpClientModule,
    AuthModule,
    ReactiveFormsModule,
    NbDialogModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatTableModule,
    MatDialogModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initCommonConfig,
      deps: [Const],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initEntidadConfig,
      deps: [Const],
      multi: true,
    },

    {
      provide: LOCALE_ID,
      useFactory: (localeService: LocaleService) => {
        console.log('locale ID', localeService.language);
        return localeService.language;
      },
      deps: [LocaleService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicAuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptor,
      multi: true,
    },

    ApiService,
    Title,
    DataService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
export function tokenGetter() {
  return sessionStorage.getItem('token');
}

export function initCommonConfig(c: Const) {
  return () => c.loadCommonConfig();
}

export function initEntidadConfig(c: Const) {
  return () => c.loadEntidadConfig();
}
