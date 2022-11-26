import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportRoutingModule } from './support-routing.module';
import { RegisterProductComponent } from './register-product/register-product.component';
import { RegisterImageByProductComponent } from './register-image-by-product/register-image-by-product.component';
import { CommonComponentModule } from '../../@common-components/common-component.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbCardModule, NbListModule, NbSelectModule } from '@nebular/theme';
import { MatSelect, MatSelectModule } from '@angular/material/select';
@NgModule({
  declarations: [RegisterProductComponent, RegisterImageByProductComponent],
  imports: [
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
  ],
})
export class SupportModule {}
