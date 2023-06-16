import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {

  @Output() sendHideSidebar = new EventEmitter<boolean>();
  public hideSidebar: any = false;

  constructor(public router: Router) {

  }

  HideSidebar() {
    this.hideSidebar = !this.hideSidebar;

    this.sendHideSidebar.emit(this.hideSidebar);
  }

  Account() {
    this.router.navigateByUrl('/admin/account');
  }

}
