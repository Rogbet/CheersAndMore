import { Component, OnInit } from '@angular/core';
import { Product} from '../../models/product';
import { ProductService } from '../../services/product.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { tap } from 'rxjs/operators';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent implements OnInit {
product: Product = {
 name:'',
 cost: null,
 path: '',
 createdDate: null
}

completeUpload = false;

  nameFormControl = new FormControl('', [
    Validators.required
  ]);
  costFormControl = new FormControl('', [
    Validators.required
  ]);
  // Main task 
  task: AngularFireUploadTask;
  // Progress monitoring
  percentage: Observable<number>;
  snapshot: Observable<any>;
  // Download URL
  downloadURL: Observable<string>;
  // State for dropzone CSS toggling
  isHovering: boolean;


  // matcher = new MyErrorStateMatcher();

  constructor(private storage: AngularFireStorage, private db: AngularFirestore, private productService: ProductService) { }

  ngOnInit() {
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }
  startUpload(event: FileList) {
    this.completeUpload = false;

    // The File object
    const file = event.item(0)
    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') { 
      console.error('unsupported file type :( ')
      return;
    }
    // The storage path
    this.product.path = `products/${new Date().getTime()}_${file.name}`;
    // Totally optional metadata
    const customMetadata = { app: 'My AngularFire-powered PWA!' };
    // The main task
    this.task = this.storage.upload(this.product.path, file, { customMetadata })
    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      tap(snap => {
        if (snap.bytesTransferred === snap.totalBytes) {
          // Update firestore on completion
          this.completeUpload = true;
        }
      })
    )
    // The file's download URL
    this.downloadURL = this.task.downloadURL(); 


    // this.downloadURL.subscribe(url => {
    //   this.product.path = url;
    // });
  }
  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

  save(){

    this.product.createdDate = new Date();
    this.productService.addProduct(this.product);

    this.nameFormControl.reset();
    this.costFormControl.reset();
    this.product.createdDate = null;
    this.product.path = '';

    this.percentage = null;
    this.snapshot = null;
  }
}
