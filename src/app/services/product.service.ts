import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Product} from '../models/product';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductService {
  productCollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;

  constructor(private afs: AngularFirestore) { 
    // this.products = this.afs.collection<Product>('products', ref => ref.orderBy('createdDate',"desc")).valueChanges();
    this.products = this.afs.collection<Product>('products', ref => ref.orderBy('createdDate',"desc")).snapshotChanges().map(changes =>
      {
        return changes.map(a => {
            const data = a.payload.doc.data() as Product;
            data.id = a.payload.doc.id;
            return data;
        });
      });
  }

  addProduct(productData) {
    this.afs.collection('products').add(productData).then(() => {
      console.log('Done');
    })
  }

  getProducts() {
    return this.products;
  }
}