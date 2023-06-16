import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.sass']
})
export class PanelComponent {

  @ViewChild('drawer', { static : false }) drawer: any;

  showFiller = false;

  constructor(public router: Router) {

  }

  ValidateHideSidebar(e: any) {
    this.drawer.toggle();
  }

  redirectto() {
    this.router.navigateByUrl('/admin/users');
  }

  redirectto2() {
    this.router.navigateByUrl('/admin/users/new');
  }
}
