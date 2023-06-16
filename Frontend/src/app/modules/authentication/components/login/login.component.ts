import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  
  public flags: any = {
    hide: true,
    gridHide: false
  }
  hide = true;
  breakpoint = 0;

  ngOnInit() {
    if (window.innerWidth <= 800) {
      this.breakpoint = 1;
      this.flags.gridHide = true;
    } else {
      this.breakpoint = 2;
      this.flags.gridHide = false;
    }
  }

  onResize(event: any) {
    if (event.target.innerWidth <= 800) {
      this.breakpoint = 1;
      this.flags.gridHide = true;
    } else {
      this.breakpoint = 2;
      this.flags.gridHide = false;
    }
  }
}
