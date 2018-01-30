import { Component,ViewChild } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  user: Observable<firebase.User>;
  items: Observable<any[]>;
  reason = '';
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(public afAuth: AngularFireAuth,public db: AngularFirestore) {
      
    }

    ngOnInit() {
      this.afAuth.auth.signInAnonymously();
      this.user = this.afAuth.authState;
      this.items = this.db.collection('/items').valueChanges();
    }

    close(reason: string) {
      this.reason = reason;
      this.sidenav.close();
    }
}
