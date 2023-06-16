import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {

  @ViewChild('drawer', { static : false }) drawer: any;

  showFiller = false;

  constructor() {

  }

  ngOnInit() {
  }

  ValidateHideSidebar(e: any) {
    this.drawer.toggle();
  }
}
