import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/modules/shared/material.module';

import { OutputFormComponent } from './components/output-form/output-form.component';
import { OutputHomeComponent } from './components/output-home/output-home.component';
import { OutputHomeFiltersComponent } from './components/output-home-filters/output-home-filters.component';

import { OutputRoutingModule } from './output-routing.module';


@NgModule({
  declarations: [
    OutputFormComponent,
    OutputHomeComponent,
    OutputHomeFiltersComponent
  ],
  imports: [
    CommonModule,
    OutputRoutingModule,
    MaterialModule
  ]
})
export class OutputModule { }
