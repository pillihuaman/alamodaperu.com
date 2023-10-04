import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './page.component';
import { RegisterControlComponent } from './support/register-control/register-control.component';
import { RegisterImageByProductComponent } from './support/register-image-by-product/register-image-by-product.component';
import { RegisterProductComponent } from './support/register-product/register-product.component';
import { RegisterStockComponent } from './support/register-stock/register-stock.component';
import { ParametersComponent } from './support/parameters/parameters.component';
import { RegisterSystemComponent } from './support/register-system/register-system.component';

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
      {
        path: 'register-product-stock',
        component: RegisterStockComponent,
      },
      {
        path: 'register-control',
        component: RegisterControlComponent,
      },
      {
        path: 'register-parameter',
        component: ParametersComponent,
      },
      {
        path: 'register-system',
        component: RegisterSystemComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule {}
