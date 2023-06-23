import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import(`./modules/authentication/authentication.module`).then(m => m.AuthenticationModule)
  },
  {
    path: 'register',
    loadChildren: () => import(`./modules/register/register.module`).then(m => m.RegisterModule)
  },
  {
    path: 'admin',
    loadChildren: () => import(`./modules/admin-panel/admin-panel.module`).then(m => m.AdminPanelModule)
  },
  {
    path : '**', 
    pathMatch : 'full',
    redirectTo : 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
