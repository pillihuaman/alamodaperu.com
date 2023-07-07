import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbPopoverModule,
  NbSelectModule,
  NbThemeModule,
  NbMenuModule,
  NbContextMenuModule,
  NbDialogModule,
  NbTreeGridModule,
} from '@nebular/theme';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { ServPillihuamanHeaderHomeComponent } from './serv-pillihuaman-header-home/serv-pillihuaman-header-home.component';
import { ServPillihuamanSidebarHomeComponent } from './serv-pillihuaman-sidebar-home/serv-pillihuaman-sidebar-home.component';
import { ServPillihuamanLeftMenuComponent } from './serv-pillihuaman-left-menu/serv-pillihuaman-left-menu.component';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './modal/modal.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ServPillihuamanFooterHomeComponent } from './serv-pillihuaman-footer-home/serv-pillihuaman-footer-home.component';
import { ImagenVisorComponent } from './imagen-visor/imagen-visor.component';
import { ImagenCatchInformationComponent } from './imagen-catch-information/imagen-catch-information.component';
import { RouterButtonComponent } from './router-button/router-button.component';
import { ProductDescriptionComponent } from './product-description/product-description.component';
import { LabelComponent } from './label/label.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TableDatasourceComponent } from './table-datasource/table-datasource.component';;
import { DynamicComponent } from './dynamic/dynamic.component';
import { SelectAndInputControlComponent } from './select-and-input-control/select-and-input-control.component';
const COMPONENTS = [
  ServPillihuamanHeaderHomeComponent,
  ServPillihuamanSidebarHomeComponent,
  ServPillihuamanLeftMenuComponent,
  ServPillihuamanFooterHomeComponent,
  ImagenVisorComponent,
  ModalComponent,
  ImagenCatchInformationComponent,
  RouterButtonComponent,
  ProductDescriptionComponent,
  LabelComponent,DatePickerComponent,TableDatasourceComponent, DynamicComponent,SelectAndInputControlComponent
];
/*const DIRECTIVES = [

];
const PIPES = [

];
*/
const materialModules = [MatIconModule];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    NbFormFieldModule,
    NbInputModule,
    NbThemeModule.forRoot({ name: 'default' }),
    MatRippleModule,
    MatAutocompleteModule,
    NbSelectModule,
    NbActionsModule,
    NbListModule,
    NbPopoverModule,
    FormsModule,
    ReactiveFormsModule,
    NbMenuModule,
    MatMenuModule,
    ...materialModules,
    NbContextMenuModule,
    MatIconModule,
    RouterModule,
    NbCardModule,
    MatProgressSpinnerModule, MatNativeDateModule,MatDatepickerModule,NbTreeGridModule,

  ],
  exports: [...COMPONENTS, ...materialModules],
  entryComponents: [...COMPONENTS],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: MatPaginatorIntl }],
})
export class CommonComponentModule {}
