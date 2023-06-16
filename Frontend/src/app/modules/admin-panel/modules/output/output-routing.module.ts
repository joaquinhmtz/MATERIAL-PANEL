import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OutputFormComponent } from './components/output-form/output-form.component';
import { OutputHomeComponent } from './components/output-home/output-home.component';

const routes: Routes = [
  {
    path: '',
    component: OutputHomeComponent,
  },
  {
    path: 'new',
    component: OutputFormComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutputRoutingModule { }
