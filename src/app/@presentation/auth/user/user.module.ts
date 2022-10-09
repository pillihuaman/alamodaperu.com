import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonComponentModule } from '../../@common-components/common-component.module';
import {
  NbCardModule,
  NbDialogModule,
  NbInputModule,
  NbSelectModule,
} from '@nebular/theme';
import { MatSelectModule } from '@angular/material/select';
@NgModule({
  declarations: [LoginComponent, UserRegisterComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonComponentModule,
    NbInputModule,
    NbSelectModule,
    NbDialogModule.forChild(),
    NbCardModule,
  ],
})
export class UserModule {}
