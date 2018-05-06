import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection, AngularFirestoreDocument, } from 'angularfire2/firestore';
import { Expense} from '../models/expense';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ExpensesService {
  expenseCollection: AngularFirestoreCollection<Expense>;
  expenses: Observable<Expense[]>;
  expenseDoc: AngularFirestoreDocument<Expense>;

  constructor(private afs: AngularFirestore) { 
    this.expenseCollection = afs.collection<Expense>('expenses');
  }

  getExpenses() {
  // getExpenses(pageSize:number,field, next) {
    // this.expenseCollection = this.afs.collection<Expense>('expenses', ref => {
    //   let query = ref;

    //   var queri;
    //   if (next === null) { // first page
    //     queri = query.orderBy('name', 'asc').limit(pageSize);
    //   } else if (next) { // next page
    //     queri = query.orderBy('name', 'asc').startAfter(field).limit(pageSize);
    //   } else { // previous page 
    //     queri = query.orderBy('name', 'desc').startAfter(field).limit(pageSize);
    //   }

    //   return queri;
    // });

    this.expenseCollection = this.afs.collection<Expense>('expenses', ref => {
        let query = ref;
        let data = query.orderBy('date', 'desc')

        return data;
    });

    this.expenses = this.expenseCollection.snapshotChanges().map(changes =>
      {
        return changes.map(a => {
            const data = a.payload.doc.data() as Expense;
            data.id = a.payload.doc.id;
            return data;
        });
      });

    return this.expenses;
  }

  getTotalExpenses(){
    let totalCount = 0;
    
    return this.afs.collection<Expense>('expenses').valueChanges();

  }

  addExpense(expense:Expense) {
    return this.expenseCollection.add(expense);
  }

  deleteExpense(expense:Expense){
    if(confirm("¿Desea eliminar el egreso?")){
      this.expenseDoc = this.afs.doc<Expense>(`expenses/${expense.id}` );
    }
  }

  updateExpense(id:number, expense:Expense){
    const doc = this.afs.doc<Expense>(`expenses/${id}`);

    return doc.update(expense);
  }
}
