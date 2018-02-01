import { Component,ViewChild, OnInit } from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  reason = '';
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor() { }

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }
}
