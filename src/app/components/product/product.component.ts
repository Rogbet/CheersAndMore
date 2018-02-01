import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import { ProductService } from '../../services/product.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  user: Observable<firebase.User>;
  products: Observable<any[]>;

  displayedColumns = ['created', 'name', 'cost'];
  productDatabase = new productDatabase(this.product);
  dataSource;

  resultsLength = 0;

  // productDetails = {
  //   studentName: '',
  //   studentAge: '',
  //   studentGrade: ''
  // }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private product: ProductService,private afs: AngularFirestore) {
      
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  ngOnInit() {
    this.dataSource = new ProductsDataSource(this.productDatabase, this.sort);

    this.dataSource.paginator = this.paginator;
  }

  addProduct() {
    // this.product.addProduct(this.productDetails);
  }

}

export class productDatabase {
 
  productList = new BehaviorSubject([]);
  get data() { return this.productList.value };
 
  constructor(private product: ProductService) {
    this.product.getProducts().subscribe((product) => {
      this.productList.next(product);
    })
  }

}

export class ProductsDataSource extends DataSource<any> {
 

  constructor(private productDB: productDatabase, private sort: MatSort) {
    super()
    }
 
  // connect() {
  //   return this.product.getProducts();
  // }

  connect(): Observable<any> {
    const productData = [
      this.productDB.productList,
      this.sort.sortChange
    ];
 
    return Observable.merge(...productData).map(() => {
      return this.getSortedData();
    })
  }
 
  disconnect() {
 
  }

  getSortedData() {
    const data = this.productDB.data.slice();
    if (!this.sort.active || this.sort.direction == '') { return data; }
 
    return data.sort((a, b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';
 
      switch (this.sort.active) {
        case 'title': [propertyA, propertyB] = [a.name, b.name]; break;
        case 'cost': [propertyA, propertyB] = [a.cost, b.cost]; break;
        // case 'Grade': [propertyA, propertyB] = [a.studentGrade, b.studentGrade]; break;
      }
 
      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;
 
      return (valueA < valueB ? -1 : 1) * (this.sort.direction == 'asc' ? 1 : -1);
    });
  }
}
