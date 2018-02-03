import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleEvent = new EventEmitter();
  @Output() closeSideNavEvent = new EventEmitter();
  estado:boolean = false;

  constructor() { }

  ngOnInit() {

  }

  toggleMenu(){
    this.toggleEvent.emit(null);
  }

  closeSideNav(){
    this.closeSideNavEvent.emit(null);
  }
}
