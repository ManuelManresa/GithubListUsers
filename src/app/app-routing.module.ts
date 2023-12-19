import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.DashboardModule),
  },
  //TODO Change for 404 error page
  {
    path: '**',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.DashboardModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
