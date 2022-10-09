import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { CommonComponentModule } from '../../@common-components/common-component.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    CommonComponentModule,
  ],
})
export class MainModule {}
