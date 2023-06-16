import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserHomeComponent } from './components/user-home/user-home.component';
import { UserFormComponent } from './components/user-form/user-form.component';

const routes: Routes = [
  {
    path: '',
    component: UserHomeComponent,
  },
  {
    path: 'new',
    component: UserFormComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
