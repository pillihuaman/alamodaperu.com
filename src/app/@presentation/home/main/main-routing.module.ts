import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home.component';
import { ChatBootComponent } from './chatBoot/chat-boot/chat-boot.component';
import { DetailMainPageComponent } from './detail-main-page/detail-main-page.component';
import { MainPageComponent } from './main-page/main-page.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'home',
        component: MainPageComponent,
      },
      {
        path: 'homedetail',
        component: DetailMainPageComponent,
        data: { id: '1', name: 'Angular' },
      },
      {
        path: 'chat',
        component: ChatBootComponent,
        data: { id: '1', name: 'Angular' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
