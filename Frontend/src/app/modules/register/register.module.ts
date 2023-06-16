import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { MaterialModule } from 'src/app/modules/shared/material.module';

import { RegisterComponent } from './components/register/register.component';
import { VerifyCodeComponent } from './components/verify-code/verify-code.component';

@NgModule({
  declarations: [
    RegisterComponent,
    VerifyCodeComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    MaterialModule
  ]
})
export class RegisterModule { }
