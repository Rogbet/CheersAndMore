import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class ProductService {

  constructor(private afs: AngularFirestore) { }

  addProduct(productData) {
    this.afs.collection('products').add(productData).then(() => {
      console.log('Done');
    })
  }

  getProducts() {
    return this.afs.collection('products', ref => ref.orderBy('createdDate',"desc")).valueChanges();
  }
}