import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/modules/shared/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from  '@angular/common/http';

import { SupplieFormComponent } from './components/supplie-form/supplie-form.component';
import { SupplieHomeComponent } from './components/supplie-home/supplie-home.component';
import { SupplieFiltersComponent } from './components/supplie-filters/supplie-filters.component';

import { SuppliesRoutingModule } from './supplies-routing.module';

@NgModule({
  declarations: [
    SupplieFormComponent,
    SupplieHomeComponent,
    SupplieFiltersComponent
  ],
  imports: [
    CommonModule,
    SuppliesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    /*{
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }*/
  ]
})
export class SuppliesModule { }
