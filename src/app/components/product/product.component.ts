import { Component, OnInit, ViewChild, OnDestroy, Inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';

import { AngularFireAuth } from 'angularfire2/auth';

import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {MatPaginator, MatSort, MatTableDataSource,MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import { ProductService } from '../../services/product.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Product} from '../../models/product';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { SnackbarService } from '../../services/snackbar.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})



export class ProductComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<Product> = new Subject();
  products: Product[];
  constructor(private productService: ProductService,private storage: AngularFireStorage,public dialog: MatDialog,
    private snackbarService: SnackbarService) {
      
  }

  editMode = false;
  productEditedId = 0;
  snapshot: Observable<any>;
  productEdited;

  pageSize = 4;
  totalProducts = 0;
  currentIndex = 0;
  ngOnInit() {
    this.getProducts("",null);
    

    this.productService.getTotalProducts().subscribe(products => {
      this.totalProducts = products.length;
    });
  }

  getProducts(field, next)
  {
    this.productService.getProducts(this.pageSize,field,next)
    .takeUntil(this.ngUnsubscribe)
    .subscribe(products => {
        this.products = products;
        

        this.products.forEach(product => {
            const ref = this.storage.ref(product.path);

            ref.getDownloadURL().subscribe(url => {
              product.url = url;
            });

        });
    });
  }

  nextPage(event){
    let next = false;
    let back = false;

    this.pageSize = event.pageSize;

    if(this.currentIndex <= event.pageIndex){
      next = true;
    } else{
      back = true;
    }

    this.currentIndex = event.pageIndex
    let field:string;

    if(next)
      field = this.products[this.products.length-1].name;
    else if(back){
      field = this.products[0].name;
    }



    this.getProducts(field,next);
  }

  ngOnDestroy() {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
  }

  delete(product:Product) {
      this.productService.deleteProduct(product);
  }


  edit(product:Product){
    this.editMode = true;
    this.productEditedId = product.id;

    this.productEdited = {
      name : product.name,
      cost : product.cost
    };
  }

  cancel(product:Product){
    this.editMode = true;
    this.productEditedId = 0;


  }
  save(product:Product){
    this.editMode = true;
    this.productEditedId = 0;

    this.productService.updateProduct(product.id, this.productEdited);

    product.name = this.productEdited.name;
    product.cost = this.productEdited.cost;

    this.snackbarService.openSnackBar(`El producto ${product.name} ha sido editado!`, "Cerrar")
  }

  openDialog(product) {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '600px',
      data: { name: product.name, url: product.url }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  startUpload(event: FileList, product:Product) {
    
    const file = event.item(0)
    
    if (file.type.split('/')[0] !== 'image') { 
      console.error('unsupported file type :( ')
      return;
    }
    
    const oldPath = product.path;

    product.path = `products/${new Date().getTime()}_${file.name}`;
    
    const customMetadata = { app: 'My AngularFire-powered PWA!' };
    const task = this.storage.upload(product.path, file, { customMetadata });
    
    product.url = null;
    task.downloadURL().subscribe(url => {
      this.storage.ref(oldPath).delete();
      const ref = this.storage.ref(product.path);
      product.url ="";
      this.productService.updateProduct(product.id, product);

      product.url = url;
      this.snackbarService.openSnackBar(`La imagen ha sido actualizada!`, "Cerrar")
    });
  }
}

@Component({
  selector: 'dialog-product-img',
  templateUrl: 'dialog-product-img.html',
  styleUrls: ['./product.component.css']
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    onClose(): void {
    this.dialogRef.close();
  }

}
