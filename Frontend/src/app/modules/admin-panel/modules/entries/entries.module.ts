import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/modules/shared/material.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { EntrieHomeComponent } from './components/entrie-home/entrie-home.component';
import { EntrieHomeFiltersComponent } from './components/entrie-home-filters/entrie-home-filters.component';
import { EntrieFormComponent } from './components/entrie-form/entrie-form.component';

import { EntriesRoutingModule } from './entries-routing.module';

@NgModule({
  declarations: [
    EntrieHomeComponent,
    EntrieHomeFiltersComponent,
    EntrieFormComponent
  ],
  imports: [
    CommonModule,
    EntriesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule
  ]
})
export class EntriesModule { }
