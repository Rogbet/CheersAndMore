import { Component, OnInit, ViewChild } from '@angular/core';
import { Product} from '../../models/product';
import { ProductService } from '../../services/product.service';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { tap } from 'rxjs/operators';
import { MatExpansionPanel } from '@angular/material/expansion';
import { SnackbarService } from '../../services/snackbar.service';

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
  createdDate: null,
  url:''
  }

  completeUpload = false;
  loading = false;
  productForm: FormGroup;
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  isHovering: boolean;
  matcher = new MyErrorStateMatcher();

  @ViewChild('panel') panel: MatExpansionPanel;
  @ViewChild(FormGroupDirective)
  formGroupDirective: FormGroupDirective;
  @ViewChild('inputFile')
  myInputVariable: any;

  name = new FormControl('', [
    Validators.required
  ]);
  cost = new FormControl('', [
    Validators.required
  ]);

  constructor(private storage: AngularFireStorage, 
    private db: AngularFirestore, 
    private productService: ProductService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit() {
    this.productForm = new FormGroup ({
      name: this.name,
      cost: this.cost
    })
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
  }
  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

  save(){

    if(this.productForm.valid){
      this.product.createdDate = new Date();
      this.loading = true;
      this.productService.addProduct(this.product).then(() => {
        this.loading = false;
        this.snackbarService.openSnackBar("Un nuevo producto ha sido creado!", "Cerrar")
        this.cancel();
      }).catch(() => {
        this.loading = false;
      });
    }
  }

  cancel(){
    this.panel.close();
    
    this.productForm.reset();
    this.formGroupDirective.resetForm();

    this.product.createdDate = null;
    this.product.path = '';

    this.clearUploadingFile();
  }

  clearUploadingFile(){
    this.myInputVariable.nativeElement.value = "";
    this.completeUpload = false;
    this.percentage = null;
    this.snapshot = null;
  }
}
