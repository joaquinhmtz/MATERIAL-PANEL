import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PanelComponent } from './components/panel/panel.component';
import { AccountComponent } from './components/account/account.component';

const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
    children: [
      {
        path: 'account',
        component: AccountComponent,
      }
    ]
  },
  {
    path: 'users',
    component: PanelComponent,
    loadChildren : () => import('./modules/users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'supplies',
    component: PanelComponent,
    loadChildren : () => import('./modules/supplies/supplies.module').then(m => m.SuppliesModule)
  },
  {
    path: 'entries',
    component: PanelComponent,
    loadChildren : () => import('./modules/entries/entries.module').then(m => m.EntriesModule)
  },
  {
    path: 'outputs',
    component: PanelComponent,
    loadChildren : () => import('./modules/output/output.module').then(m => m.OutputModule)
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
