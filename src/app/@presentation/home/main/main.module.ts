import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { CommonComponentModule } from '../../@common-components/common-component.module';
import { FormsModule } from '@angular/forms';
import { DetailMainPageComponent } from './detail-main-page/detail-main-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MainPageComponent, DetailMainPageComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    CommonComponentModule,
    RouterModule,
  ],
})
export class MainModule {}
