import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/modules/shared/material.module';

import { SidebarComponent } from 'src/app/modules/core/sidebar/sidebar.component';
import { HeaderComponent } from 'src/app/modules/core/header/header.component';
import { FooterComponent } from 'src/app/modules/core/footer/footer.component';

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedModule { }
