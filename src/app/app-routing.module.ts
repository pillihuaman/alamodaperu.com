import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './@data/interceptors';
import { NotauthGuard } from './@data/interceptors/notauth.guard';

//import { NotauthGuard } from './@data/interceptors/notauth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./@presentation/home/home.module').then((m) => m.HomeModule),
    // canActivate: [AuthGuard],
  },

  {
    path: 'pages',
    loadChildren: () =>
      import('./@presentation/pages/page.module').then((m) => m.PageModule),
    //canActivate: [AuthGuard],
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('./@presentation/auth/auth.module').then((m) => m.AuthModule),
    //canActivate: [NotauthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
