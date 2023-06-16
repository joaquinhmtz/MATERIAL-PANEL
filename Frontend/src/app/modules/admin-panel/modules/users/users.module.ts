import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/modules/shared/material.module';

import { UserHomeComponent } from './components/user-home/user-home.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserHomeFiltersComponent } from './components/user-home-filters/user-home-filters.component';

import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [
    UserHomeComponent,
    UserFormComponent,
    UserHomeFiltersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule
  ]
})
export class UsersModule { }
