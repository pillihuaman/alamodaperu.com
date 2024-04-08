import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { CommonComponentModule } from '../../@common-components/common-component.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailMainPageComponent } from './detail-main-page/detail-main-page.component';
import { RouterModule } from '@angular/router';
import { ChatBootComponent } from './chatBoot/chat-boot/chat-boot.component';
import {
  NbCardModule,
  NbFormFieldModule,
  NbListModule,
  NbSelectModule,
} from '@nebular/theme';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [MainPageComponent, DetailMainPageComponent, ChatBootComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    CommonComponentModule,
    RouterModule,
    NbFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    CommonComponentModule,
    FormsModule,
    ReactiveFormsModule,
    NbListModule,
    NbCardModule,
    NbSelectModule,
    MatSelectModule,
    MatInputModule,
  ],
})
export class MainModule {}
