import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection, AngularFirestoreDocument, } from 'angularfire2/firestore';
import { Product} from '../models/product';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable()
export class ProductService {
  productCollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;
  productDoc: AngularFirestoreDocument<Product>;

  constructor(private afs: AngularFirestore,private storage: AngularFireStorage) { 
    // this.getProducts(2, 1);
  }

  addProduct(product:Product) {
    return this.productCollection.add(product);
  }

  getProducts(pageSize:number,field, next) {

    this.productCollection = this.afs.collection<Product>('products', ref => {
      let query = ref;

      var queri;
      if (next === null) { // first page
        queri = query.orderBy('name', 'asc').limit(pageSize);
      } else if (next) { // next page
        queri = query.orderBy('name', 'asc').startAfter(field).limit(pageSize);
      } else { // previous page 
        queri = query.orderBy('name', 'desc').startAfter(field).limit(pageSize);
      }

      return queri;
    });

    // if(next === null){

    // }
    // else if(next){
    //   this.productCollection = this.afs.collection<Product>('products', ref => 
    //   ref.orderBy('name',"asc").startAfter(field).limit(pageSize));
    // } else{
    //   this.productCollection = this.afs.collection<Product>('products', ref => 
    //   ref.orderBy('name',"asc").endBefore(field).limit(2));
    // }

    
    this.products = this.productCollection.snapshotChanges().map(changes =>
      {
        return changes.map(a => {
            const data = a.payload.doc.data() as Product;
            data.id = a.payload.doc.id;
            return data;
        });
      });

    return this.products;
  }

  getTotalProducts(){
    let totalCount = 0;
    
    return this.afs.collection<Product>('products').valueChanges();

  }

  deleteProduct(product:Product){
    

    if(confirm("¿Desea eliminar el producto?")){
      this.productDoc = this.afs.doc<Product>(`products/${product.id}` );
      this.productDoc.delete().then(() =>{
          this.storage.ref(product.path).delete();
      });
    }
  }

  updateProduct(id:number, product:Product){
    const doc = this.afs.doc<Product>(`products/${id}`);

    return doc.update(product);
  }

}