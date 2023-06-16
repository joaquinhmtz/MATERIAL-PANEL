import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './components/register/register.component';
import { VerifyCodeComponent } from './components/verify-code/verify-code.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterComponent
  },
  {
    path: 'verify-code',
    component: VerifyCodeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
