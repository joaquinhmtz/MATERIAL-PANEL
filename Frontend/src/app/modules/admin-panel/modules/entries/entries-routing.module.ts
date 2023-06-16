import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EntrieFormComponent } from './components/entrie-form/entrie-form.component';
import { EntrieHomeComponent } from './components/entrie-home/entrie-home.component';

const routes: Routes = [
  {
    path: '',
    component: EntrieHomeComponent,
  },
  {
    path: 'new',
    component: EntrieFormComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntriesRoutingModule { }
