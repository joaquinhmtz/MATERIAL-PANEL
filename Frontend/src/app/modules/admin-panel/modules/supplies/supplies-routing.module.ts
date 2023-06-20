import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SupplieFormComponent } from './components/supplie-form/supplie-form.component';
import { SupplieHomeComponent } from './components/supplie-home/supplie-home.component';

const routes: Routes = [
  {
    path: '',
    component: SupplieHomeComponent,
  },
  {
    path: 'new',
    component: SupplieFormComponent,
  },
  {
    path: 'edit',
    component: SupplieFormComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliesRoutingModule { }
