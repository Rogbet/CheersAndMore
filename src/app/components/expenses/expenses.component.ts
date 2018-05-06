import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../../services/expenses.service';
import { Subject } from 'rxjs/Subject';
import { Expense } from '../../models/expense';
import { TableModule } from 'primeng/table';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  totalExpenses = 0;
  pageSize = 10;
  private ngUnsubscribe: Subject<Expense> = new Subject();
  expenses: Observable<Expense[]>;
  
  displayDialog: boolean;
  expense: Expense;

  constructor(private expenseService: ExpensesService) { }

  ngOnInit() {
    this.expenses = this.expenseService.getExpenses();
    // this.getExpenses("",null);
    
    // this.expenses.subscribe(expenses => {
    //     this.totalExpenses = expenses.length;
    //   });

    // this.expenseService.getTotalExpenses().subscribe(expenses => {
    //   this.totalExpenses = expenses.length;
    // });
  }

  // getExpenses(field, next)    
  // {
  //   this.expenseService.getExpenses(this.pageSize,field,next)
  //   .takeUntil(this.ngUnsubscribe)
  //   .subscribe(products => {
  //       this.expenses = products;
        
  //       this.datasource =products;
  //   });
  // }

  // nextPage(event){
  //   let next = false;
  //   let back = false;

  //   this.pageSize = event.pageSize;

  //   if(this.currentIndex <= event.pageIndex){
  //     next = true;
  //   } else{
  //     back = true;
  //   }

  //   this.currentIndex = event.pageIndex
  //   let field:string;

  //   if(next)
  //     field = this.products[this.products.length-1].name;
  //   else if(back){
  //     field = this.products[0].name;
  //   }



  //   this.getProducts(field,next);
  // }

  onRowSelect(event) {
    this.expense = this.cloneExpense(event.data);
    this.displayDialog = true;
}

delete(expense:Expense){
  alert(expense.id);
}

cloneExpense(c: Expense): Expense {
  let expense = <Expense>{};
  for (let prop in c) {
    expense[prop] = c[prop];
  }
  return expense;
}

onEditInit(event){
  // alert("Edit Init");
}

onEditComplete(event){
  // alert("Edit Complete");
}

onEditCancel(event,index){
  alert("Edit Cancel");
}

  ngOnDestroy() {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
  }

}
