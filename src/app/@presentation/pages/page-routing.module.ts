import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './page.component';
import { RegisterImageByProductComponent } from './support/register-image-by-product/register-image-by-product.component';
import { RegisterProductComponent } from './support/register-product/register-product.component';

const routes: Routes = [
  {
    path: 'support',
    component: PageComponent,
    children: [
      {
        path: 'register-product',
        component: RegisterProductComponent,
      },
      {
        path: 'register-imagen-product',
        component: RegisterImageByProductComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule {}
