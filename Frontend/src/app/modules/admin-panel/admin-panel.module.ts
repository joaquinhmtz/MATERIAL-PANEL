import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { MaterialModule } from 'src/app/modules/shared/material.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { PanelComponent } from './components/panel/panel.component';
import { AccountComponent } from './components/account/account.component';


@NgModule({
  declarations: [
    PanelComponent,
    AccountComponent
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class AdminPanelModule { }
