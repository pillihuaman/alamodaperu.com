import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportRoutingModule } from './support-routing.module';
import { RegisterProductComponent } from './register-product/register-product.component';
import { RegisterImageByProductComponent } from './register-image-by-product/register-image-by-product.component';
import { CommonComponentModule } from '../../@common-components/common-component.module';

@NgModule({
  declarations: [RegisterProductComponent, RegisterImageByProductComponent],
  imports: [
    CommonModule,
    SupportRoutingModule,
    CommonModule,
    CommonComponentModule,
  ],
})
export class SupportModule {}
