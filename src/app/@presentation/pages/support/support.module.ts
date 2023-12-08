import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportRoutingModule } from './support-routing.module';
import { RegisterProductComponent } from './register-product/register-product.component';
import { RegisterImageByProductComponent } from './register-image-by-product/register-image-by-product.component';
import { CommonComponentModule } from '../../@common-components/common-component.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbAutocompleteModule,
  NbCardModule,
  NbCheckboxComponent,
  NbCheckboxModule,
  NbInputModule,
  NbListModule,
  NbSelectModule,
  NbThemeModule,
} from '@nebular/theme';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { RegisterStockComponent } from './register-stock/register-stock.component';
import { RegisterControlComponent } from './register-control/register-control.component';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatPseudoCheckboxModule } from '@angular/material/core';
import { ParametersComponent } from './parameters/parameters.component';
import { RegisterSystemComponent } from './register-system/register-system.component';
import { RegisterPageComponent } from './register-page/register-page.component';
@NgModule({
  declarations: [
    RegisterProductComponent,
    RegisterImageByProductComponent,
    RegisterStockComponent,
    RegisterControlComponent,
    ParametersComponent,
    RegisterSystemComponent,
    RegisterPageComponent,
    
  ],
  imports: [
    BrowserModule,
    NbThemeModule.forRoot(),
    CommonModule,
    SupportRoutingModule,
    CommonModule,
    CommonComponentModule,
    FormsModule,
    ReactiveFormsModule,
    NbListModule,
    NbCardModule,
    NbSelectModule,
    MatSelectModule,
    MatInputModule,MatNativeDateModule,MatDatepickerModule,NbAutocompleteModule,NbCheckboxModule,NbInputModule
  ],
})
export class SupportModule {}
